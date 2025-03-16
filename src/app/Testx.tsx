"use client";

import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

import Tes from "./Tes";
import Secondtexthero from "@/components/Secondtexthero";
import { LoadingSec } from "@/components/Loadingsec";

// Lazy load components that aren't needed immediately

// Glowing cube component with transmission material
const GlowingCube = ({ scale }: { scale: number }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Memoize geometry to prevent recreation on each render
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);

  useFrame((state, delta) => {
    if (!cubeRef.current || !groupRef.current) return;

    // Smooth rotation animation
    cubeRef.current.rotation.x += delta * 0.1;
    cubeRef.current.rotation.y += delta * 0.15;

    // Add subtle breathing animation to the entire group
    const time = state.clock.getElapsedTime();
    const breathFactor = 1 + Math.sin(time * 0.5) * 0.02;
    groupRef.current.scale.set(
      scale * breathFactor,
      scale * breathFactor,
      scale * breathFactor
    );
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Transparent cube */}
      <mesh ref={cubeRef}>
        <primitive object={geometry} />
        <MeshTransmissionMaterial
          backside
          samples={4} // Reduced samples for better performance
          thickness={0.5}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.06}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.3}
        />
      </mesh>
    </group>
  );
};

// Dynamic camera rig that responds to scroll position and pointer/touch input
function DynamicCameraRig() {
  const { camera, gl } = useThree();
  const [scrollSection, setScrollSection] = useState(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  // Create vectors once instead of on every frame
  const vec = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

  // Memoize camera positions to prevent recreating on each render
  const cameraPositions = useMemo(
    () => [
      { pos: [0, -0.45, 2.45], lookAt: [0, 0.2, 0], ease: 0.008 },
      { pos: [0.25, -0.2, 2.6], lookAt: [0, 0.1, 0], ease: 0.009 },
    ],
    []
  );

  useEffect(() => {
    // Throttle scroll and pointer events for better performance
    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = window.setTimeout(() => {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const maxScroll = windowHeight * 1;
        const clampedScrollPos = Math.min(scrollPos, maxScroll);
        const rawSection = (clampedScrollPos / windowHeight) * 2;
        const section = Math.min(
          Math.floor(rawSection),
          cameraPositions.length - 1
        );
        setScrollSection(section);
        scrollTimeout = 0;
      }, 16); // ~60fps
    };

    let pointerTimeout: number;
    const handlePointerMove = (event: PointerEvent | TouchEvent) => {
      if (pointerTimeout) return;
      pointerTimeout = window.setTimeout(() => {
        const x =
          "touches" in event
            ? event.touches[0].clientX
            : (event as PointerEvent).clientX;
        const y =
          "touches" in event
            ? event.touches[0].clientY
            : (event as PointerEvent).clientY;

        setPointerPosition({
          x: (x / window.innerWidth) * 2 - 1,
          y: -(y / window.innerHeight) * 2 + 1,
        });
        pointerTimeout = 0;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.clearTimeout(scrollTimeout);
      window.clearTimeout(pointerTimeout);
      gl.dispose();
    };
  }, [cameraPositions.length, gl]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentPos = cameraPositions[scrollSection];

    // Simplified animation calculations
    const animationSpeed = 0.4;
    const pointerInfluence = 0.3;
    const timeX = Math.sin(time * animationSpeed) * 0.2;
    const timeY = Math.cos(time * (animationSpeed * 0.6)) * 0.15;
    const timeZ = Math.sin(time * (animationSpeed * 0.4)) * 0.1;

    vec.set(
      currentPos.pos[0] + timeX + pointerPosition.x * pointerInfluence,
      currentPos.pos[1] + timeY + pointerPosition.y * pointerInfluence,
      currentPos.pos[2] + timeZ
    );

    targetLookAt.set(
      currentPos.lookAt[0] + pointerPosition.x * 0.2,
      currentPos.lookAt[1] + pointerPosition.y * 0.2,
      currentPos.lookAt[2]
    );

    const distanceToTarget = camera.position.distanceTo(vec);
    const dynamicEase = Math.max(
      currentPos.ease,
      distanceToTarget > 2 ? 0.02 : currentPos.ease
    );

    camera.position.lerp(vec, dynamicEase);

    camera.getWorldDirection(currentLookAt);
    const targetDirection = targetLookAt
      .clone()
      .sub(camera.position)
      .normalize();

    const rotationEase = Math.min(dynamicEase * 1.1, 0.03);
    currentLookAt.lerp(targetDirection, rotationEase);
    camera.lookAt(camera.position.clone().add(currentLookAt));
  });

  return null;
}

// Main scene component that renders 3D element with transparent background
const Scene: React.FC = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

  // Memoize styles to prevent object recreation on each render
  const containerStyle = useMemo(
    () => ({
      position: "relative" as const,
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }),
    []
  );

  const canvasContainerStyle = useMemo(() => {
    // Only calculate this once after client-side hydration
    if (!isClient) return {};
    return {
      position: "absolute" as const,
      top: window.innerWidth >= 768 ? -300 : 0,
      left: window.innerWidth >= 768 ? 700 : 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    };
  }, [isClient]);

  const bottomContainerStyle = useMemo(
    () => ({
      zIndex: 30,
      position: "absolute" as const,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    }),
    []
  );

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (glRef.current) {
        glRef.current.dispose();
      }
    };
  }, []);

  const handleContextCreationError = () => {
    setCanvasError(true);
    console.error("WebGL context creation failed");
  };

  if (!isClient) {
    return <LoadingSec isLoading={true} duration={750} />;
  }

  if (canvasError) {
    return (
      <div>
        Failed to create WebGL context. Please check your browser settings.
      </div>
    );
  }

  // Determine device-specific settings once
  const isMobile = window.innerWidth < 768;
  const deviceSettings = {
    cameraPosition: isMobile ? [0, -5, 5] : [3, 8, 6],
    fov: isMobile ? 90 : 85,
    lightIntensity: isMobile ? 0.8 : 0.6,
    directionalLightPosition: isMobile ? [1, 1, 1] : [2, 2, 2],
    directionalLightIntensity: isMobile ? 1.5 : 2,
    cubeScale: isMobile ? 0.6 : 0.69,
  };

  return (
    <div style={containerStyle} className="bg-gradient z-1">
      {/* Loading component */}
      {isLoading && (
        <LoadingSec
          isLoading={isLoading}
          onLoadingComplete={() => setIsLoading(false)}
          duration={750}
        />
      )}
      <div className="z-21">
        <Tes />
      </div>

      {/* Canvas container - responsive to different screen sizes */}
      <div className="gradient" style={canvasContainerStyle}>
        <Canvas
          style={{ background: "none" }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]} // Reduced max DPR for better performance
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            glRef.current = gl;
          }}
          onError={handleContextCreationError}
          eventSource={document.getElementById("root") || undefined}
          eventPrefix="client"
          camera={{
            position: [2, 0, 5],
            fov: isMobile ? 90 : 55,
          }}
        >
          {/* Responsive camera setup */}
          <PerspectiveCamera makeDefault fov={deviceSettings.fov} />
          <DynamicCameraRig />

          {/* Lighting */}
          <ambientLight intensity={deviceSettings.lightIntensity} />
          <pointLight position={[5, 5, 5]} />
          <directionalLight
            intensity={deviceSettings.directionalLightIntensity}
            castShadow
          />

          {/* Responsive cube size */}
          <GlowingCube scale={deviceSettings.cubeScale} />

          {/* Lazy load post-processing effects */}
          <Suspense fallback={null}></Suspense>
        </Canvas>
      </div>
      <div style={bottomContainerStyle}>
        <Secondtexthero />
      </div>
    </div>
  );
};

export default Scene;
