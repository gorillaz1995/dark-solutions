"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import Tes from "./Tes";
import Secondtexthero from "@/components/Secondtexthero";
import { LoadingSec } from "@/components/Loadingsec"; // Import the named export instead of default
import { ArrowRight } from "lucide-react";

// Function to detect low performance devices
const isLowPerformanceDevice = () => {
  const ua = navigator.userAgent;
  const isOldAndroid = /Android [1-6]/.test(ua);
  const isOldiOS = /iPhone OS [1-9]_[0-9]/.test(ua);
  const isOldWindows = /Windows NT [5-6]/.test(ua);
  const isLowMemory =
    "deviceMemory" in navigator && (navigator.deviceMemory as number) <= 2;
  const isLowCPU =
    "hardwareConcurrency" in navigator &&
    (navigator.hardwareConcurrency as number) <= 2;

  return isOldAndroid || isOldiOS || isOldWindows || isLowMemory || isLowCPU;
};

// Glowing cube component with transmission material or simple material based on device performance
const GlowingCube = ({ scale }: { scale: number }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lowPerformance = isLowPerformanceDevice();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      // Smooth rotation animation
      cubeRef.current.rotation.x += delta * 0.1;
      cubeRef.current.rotation.y += delta * 0.15;
    }

    if (lightRef.current) {
      // Pulsating light intensity
      lightRef.current.intensity =
        20 + Math.sin(state.clock.elapsedTime * 2) * 5;
    }

    if (groupRef.current) {
      // Add subtle breathing animation to the entire group
      const time = state.clock.getElapsedTime();
      groupRef.current.scale.x = scale * (1 + Math.sin(time * 0.5) * 0.02);
      groupRef.current.scale.y = scale * (1 + Math.sin(time * 0.5) * 0.02);
      groupRef.current.scale.z = scale * (1 + Math.sin(time * 0.5) * 0.02);

      // Subtle rotation for the entire group
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      groupRef.current.rotation.x = Math.cos(time * 0.15) * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Transparent cube */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        {lowPerformance ? (
          // Simple material for low performance devices
          <meshBasicMaterial color="orange" />
        ) : (
          // Advanced material for high performance devices
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            roughness={0.05}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.06}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.3}
          />
        )}
      </mesh>
    </group>
  );
};

// Dynamic camera rig that responds to scroll position and pointer/touch input
function DynamicCameraRig() {
  const { camera, gl } = useThree();
  const [scrollSection, setScrollSection] = useState(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const vec = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();
  const frameIdRef = useRef<number | null>(null);

  // Enhanced camera positions with smoother transitions
  const cameraPositions = [
    { pos: [0, -0.45, 2.45], lookAt: [0, 0.2, 0], ease: 0.008 },
    { pos: [0.25, -0.2, 2.6], lookAt: [0, 0.1, 0], ease: 0.009 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      // Only animate for first 20% of next section
      const maxScroll = windowHeight * 1; // 120% of first section
      const clampedScrollPos = Math.min(scrollPos, maxScroll);
      const rawSection = (clampedScrollPos / windowHeight) * 2;
      const section = Math.min(
        Math.floor(rawSection),
        cameraPositions.length - 1
      );
      setScrollSection(section);
    };

    const handlePointerMove = (event: PointerEvent | TouchEvent) => {
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
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    // Store frameIdRef.current in a variable to avoid the React Hook warning
    const currentFrameId = frameIdRef.current;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      if (currentFrameId) {
        cancelAnimationFrame(currentFrameId);
      }
      gl.dispose();
    };
  }, [cameraPositions.length, gl]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentPos = cameraPositions[scrollSection];

    // Smoother animation with pointer/touch influence
    const animationSpeed = 0.4 + Math.sin(time * 0.1) * 0.05;
    const pointerInfluence = 0.3;

    vec.set(
      currentPos.pos[0] +
        Math.sin(time * animationSpeed) * 0.2 +
        pointerPosition.x * pointerInfluence,
      currentPos.pos[1] +
        Math.cos(time * (animationSpeed * 0.6)) * 0.15 +
        pointerPosition.y * pointerInfluence,
      currentPos.pos[2] + Math.sin(time * (animationSpeed * 0.4)) * 0.1
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

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const targetDirection = targetLookAt
      .clone()
      .sub(camera.position)
      .normalize();

    const rotationEase = Math.min(dynamicEase * 1.1, 0.03);
    const lerpedDirection = currentLookAt.lerp(targetDirection, rotationEase);
    camera.lookAt(camera.position.clone().add(lerpedDirection));
  });

  return null;
}

// Main scene component that renders 3D element with transparent background
const Scene: React.FC = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

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
    // Use the LoadingSec component with controlled loading state
    return <LoadingSec isLoading={true} duration={750} />;
  }

  if (canvasError) {
    return (
      <div>
        Failed to create WebGL context. Please check your browser settings.
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      className="bg-gradient z-1"
    >
      {/* Use the LoadingSec component with controlled loading state */}
      {isLoading && (
        <LoadingSec
          isLoading={isLoading}
          onLoadingComplete={() => setIsLoading(false)}
          duration={750}
        />
      )}
      {/* Add event handler in parent component to control loading state */}
      <div className="z-21">
        <Tes />
      </div>

      {/* Canvas container - responsive to different screen sizes */}
      <div
        className="gradient"
        style={{
          position: "absolute",
          top: window.innerWidth >= 768 ? -300 : 0,
          left: window.innerWidth >= 768 ? 700 : 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Canvas
          style={{ background: "none" }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]} // Responsive pixel ratio for different devices
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            glRef.current = gl;
          }}
          onError={handleContextCreationError}
          eventSource={document.getElementById("root") || undefined}
          eventPrefix="client"
          camera={{
            position: [2, 0, 5],
            fov: window.innerWidth < 768 ? 90 : 55,
          }} // Adjust FOV based on screen size
        >
          {/* Responsive camera setup */}
          <PerspectiveCamera
            makeDefault
            position={window.innerWidth < 768 ? [0, -5, 5] : [3, 8, 6]}
            fov={window.innerWidth < 768 ? 90 : 85}
          />
          <DynamicCameraRig />

          {/* Lighting adjusted for different screen sizes */}
          <ambientLight intensity={window.innerWidth < 768 ? 0.8 : 0.6} />
          <pointLight position={[5, 5, 5]} />
          <directionalLight
            position={window.innerWidth < 768 ? [1, 1, 1] : [2, 2, 2]}
            intensity={window.innerWidth < 768 ? 1.5 : 2}
            castShadow
          />
          <Environment preset="sunset" />

          {/* Responsive cube size based on screen width */}
          <GlowingCube scale={window.innerWidth < 768 ? 0.6 : 0.69} />

          {/* Post-processing effects optimized for different devices */}
          <EffectComposer>
            <Vignette darkness={0.05} offset={0.1} />
          </EffectComposer>
        </Canvas>
      </div>
      <div
        style={{
          zIndex: 30,
          position: "absolute",

          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Secondtexthero />
        <button
          className="group relative px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          style={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            position: "relative",
            overflow: "hidden",
            transform: "translateY(-30%)", // Moving the button 20% up
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="flex items-center gap-2 relative z-10">
            Portofolio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>

          {/* Button gradient background */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255, 128, 0, 0.8) 0%, rgba(255, 128, 0, 0.6) 50%, rgba(255, 128, 0, 0.4) 100%)",
            }}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Scene;
