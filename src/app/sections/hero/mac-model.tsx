"use client";
import { gsap } from "gsap";
import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useScrollytelling } from "~/lib/scrollytelling-client";

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.Mesh;
    Rotor_FL: THREE.Mesh;
    Rotor_FR: THREE.Mesh;
    Rotor_BL: THREE.Mesh;
    Rotor_BR: THREE.Mesh;
    Cube002: THREE.Mesh;
  };
  materials: {
    ColourPalette: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/models/Drone.glb");

const DroneModel = () => {
  const { timeline } = useScrollytelling();
  const { nodes, materials } = useGLTF(
    "/models/Drone.glb"
  ) as GLTFResult;
  const innerRef = useRef<THREE.Group>(null);
  const rotorFLRef = useRef<THREE.Mesh>(null);
  const rotorFRRef = useRef<THREE.Mesh>(null);
  const rotorBLRef = useRef<THREE.Mesh>(null);
  const rotorBRRef = useRef<THREE.Mesh>(null);
  const width = useThree((state) => state.viewport.width);

  useFrame((_, delta) => {
    if (!innerRef.current || !timeline?.scrollTrigger) return;

    // Same scroll-driven Y rotation as before
    innerRef.current.rotation.y = Math.PI * 2 * timeline.scrollTrigger.progress;

    // Spin the rotors continuously for a realistic drone effect
    const rotorSpeed = 25;
    if (rotorFLRef.current) rotorFLRef.current.rotation.y += rotorSpeed * delta;
    if (rotorFRRef.current) rotorFRRef.current.rotation.y += rotorSpeed * delta;
    if (rotorBLRef.current) rotorBLRef.current.rotation.y += rotorSpeed * delta;
    if (rotorBRRef.current) rotorBRRef.current.rotation.y += rotorSpeed * delta;
  });

  return (
    <Float>
      <group dispose={null} scale={width * 0.6} ref={innerRef}>
        <group position={[0, 0, 0]} rotation={[0.45, -0.51, -0.03]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body.geometry}
            material={materials.ColourPalette}
          />
          <mesh
            ref={rotorFLRef}
            castShadow
            receiveShadow
            geometry={nodes.Rotor_FL.geometry}
            material={materials.ColourPalette}
          />
          <mesh
            ref={rotorFRRef}
            castShadow
            receiveShadow
            geometry={nodes.Rotor_FR.geometry}
            material={materials.ColourPalette}
          />
          <mesh
            ref={rotorBLRef}
            castShadow
            receiveShadow
            geometry={nodes.Rotor_BL.geometry}
            material={materials.ColourPalette}
          />
          <mesh
            ref={rotorBRRef}
            castShadow
            receiveShadow
            geometry={nodes.Rotor_BR.geometry}
            material={materials.ColourPalette}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.ColourPalette}
          />
        </group>
      </group>
    </Float>
  );
};

export const CanvasWithMacModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 35 }}
      dpr={[1, 1.5]} // Cap resolution on mobile for better performance
      shadows={false} // Disable expensive shadows
      onCreated={() => {
        gsap.set(canvasRef.current, {
          width: "100%",
          height: "100%",
        });
        gsap.to(
          canvasRef.current?.closest('[data-mac-canvas-container="true"]') ||
            null,
          { opacity: 1, scale: 1, duration: 0.15 }
        );
      }}
      gl={{ 
        alpha: true, 
        antialias: false, // Disable expensive antialiasing on mobile
        powerPreference: "high-performance" 
      }}
      style={{ opacity: 0, scale: 0.9 }}
      ref={canvasRef}
      data-mac-canvas-container
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <DroneModel />
    </Canvas>
  );
};
