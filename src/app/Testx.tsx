"use client";

import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

import Tes from "./Tes";
import Secondtexthero from "@/components/Secondtexthero";
import { LoadingSec } from "@/components/Loadingsec";
import { ArrowRight } from "lucide-react";

// Utility function for throttling
const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};
// Utility function for debouncing
const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Glowing cube component with transmission material
const GlowingCube = ({ scale }: { scale: number }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Memoize geometry to prevent recreation on each render
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);

  // Optimize animation calculations with memoized values
  const animationConfig = useMemo(
    () => ({
      rotationX: 0.1,
      rotationY: 0.15,
      breathFrequency: 0.5,
      breathAmplitude: 0.02,
    }),
    []
  );

  useFrame((state, delta) => {
    if (!cubeRef.current || !groupRef.current) return;

    // Smooth rotation animation
    cubeRef.current.rotation.x += delta * animationConfig.rotationX;
    cubeRef.current.rotation.y += delta * animationConfig.rotationY;

    // Add subtle breathing animation to the entire group
    const time = state.clock.getElapsedTime();
    const breathFactor =
      1 +
      Math.sin(time * animationConfig.breathFrequency) *
        animationConfig.breathAmplitude;
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

  // Create worker for heavy computations if supported
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker for heavy computations if supported
    if (typeof window !== "undefined" && window.Worker) {
      try {
        // Create a worker blob that handles camera position calculations
        const workerCode = `
          self.onmessage = function(e) {
            const { time, pointerX, pointerY, currentPos, pointerInfluence } = e.data;
            
            // Animation calculations
            const animationSpeed = 0.4;
            const timeX = Math.sin(time * animationSpeed) * 0.2;
            const timeY = Math.cos(time * (animationSpeed * 0.6)) * 0.15;
            const timeZ = Math.sin(time * (animationSpeed * 0.4)) * 0.1;
            
            const vecX = currentPos.pos[0] + timeX + pointerX * pointerInfluence;
            const vecY = currentPos.pos[1] + timeY + pointerY * pointerInfluence;
            const vecZ = currentPos.pos[2] + timeZ;
            
            const targetLookAtX = currentPos.lookAt[0] + pointerX * 0.2;
            const targetLookAtY = currentPos.lookAt[1] + pointerY * 0.2;
            const targetLookAtZ = currentPos.lookAt[2];
            
            self.postMessage({ 
              vec: [vecX, vecY, vecZ], 
              targetLookAt: [targetLookAtX, targetLookAtY, targetLookAtZ] 
            });
          };
        `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const workerInstance = new Worker(URL.createObjectURL(blob));
        setWorker(workerInstance);

        return () => {
          workerInstance.terminate();
          URL.revokeObjectURL(blob.toString());
        };
      } catch (error) {
        console.warn("Web Worker initialization failed:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Throttled scroll handler - runs at most every 100ms
    const handleScroll = throttle(() => {
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
    }, 100);
    // Debounced pointer move handler - runs after 50ms of inactivity
    const handlePointerMove = debounce((e: unknown) => {
      // Properly type the event to handle both pointer and touch events
      const event = e as PointerEvent | TouchEvent;
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
    }, 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      gl.dispose();
    };
  }, [cameraPositions.length, gl]);

  // Animation frame calculations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentPos = cameraPositions[scrollSection];
    const pointerInfluence = 0.3;

    // Use Web Worker for calculations if available
    if (worker) {
      worker.onmessage = (e) => {
        const { vec: vecArray, targetLookAt: targetLookAtArray } = e.data;
        vec.set(vecArray[0], vecArray[1], vecArray[2]);
        targetLookAt.set(
          targetLookAtArray[0],
          targetLookAtArray[1],
          targetLookAtArray[2]
        );

        // Apply camera transformations
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
      };

      // Send data to worker for processing
      worker.postMessage({
        time,
        pointerX: pointerPosition.x,
        pointerY: pointerPosition.y,
        currentPos,
        pointerInfluence,
      });
    } else {
      // Fallback calculations if worker is not available
      const animationSpeed = 0.4;
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
    }
  });

  return null;
}
// Define the DeviceSettings interface to fix the TypeScript error
interface DeviceSettings {
  cameraPosition: number[];
  fov: number;
  lightIntensity: number;
  directionalLightPosition: number[];
  directionalLightIntensity: number;
  cubeScale: number;
}

// Main scene component that renders 3D element with transparent background
const Scene: React.FC = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const [deviceSettings, setDeviceSettings] = useState<DeviceSettings | null>(
    null
  );

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

  const buttonStyle = useMemo(
    () => ({
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative" as const,
      overflow: "hidden",
      transform: "translateY(-30%)",
      opacity: 1,
      backdropFilter: "blur(10px)",
    }),
    []
  );

  const buttonGradientStyle = useMemo(
    () => ({
      backgroundImage:
        "radial-gradient(circle, rgba(255, 128, 0, 0.8) 0%, rgba(255, 128, 0, 0.6) 50%, rgba(255, 128, 0, 0.4) 100%)",
    }),
    []
  );

  // Calculate device settings once on client-side
  useEffect(() => {
    setIsClient(true);

    // Debounced resize handler to update device settings
    const handleResize = debounce(() => {
      const isMobile = window.innerWidth < 768;
      setDeviceSettings({
        cameraPosition: isMobile ? [0, -5, 5] : [3, 8, 6],
        fov: isMobile ? 90 : 85,
        lightIntensity: isMobile ? 0.8 : 0.6,
        directionalLightPosition: isMobile ? [1, 1, 1] : [2, 2, 2],
        directionalLightIntensity: isMobile ? 1.5 : 2,
        cubeScale: isMobile ? 0.6 : 0.69,
      });
    }, 250);

    // Initial calculation
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (glRef.current) {
        glRef.current.dispose();
      }
    };
  }, []);

  const handleContextCreationError = () => {
    setCanvasError(true);
    console.error("WebGL context creation failed");
  };

  if (!isClient || !deviceSettings) {
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
            fov: deviceSettings.fov,
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
        <button
          className="group relative px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          style={buttonStyle}
        >
          <span className="flex items-center gap-2 relative z-10">
            Portofolio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>

          {/* Button gradient background */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={buttonGradientStyle}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Scene;
