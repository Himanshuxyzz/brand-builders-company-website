import * as Scrollytelling from "@bsmnt/scrollytelling";
import React, { useMemo } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { Euler, Vector3, MeshStandardMaterial } from "three";
import { useThree } from "@react-three/fiber";

const allCameraProps: { position: Vector3; rotation: Euler; progress: number }[] = [
  {
    position: new Vector3(-0.08, -0.1, 0.1),
    rotation: new Euler(0.4, -0.6, 0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.5, -0.1, 0.55),
    rotation: new Euler(0, -0.3, -0.5, "ZYX"),
    progress: 0,
  },
  {
    position: new Vector3(0.22, 0.15, 0.4),
    rotation: new Euler(0.55, -0.6, 0.8, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.05, 0.12, 1.1),
    rotation: new Euler(0.1, -0.6, -0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.3, -0.13, 1.1),
    rotation: new Euler(0.1, -0.7, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.48, 0.22, 0.8),
    rotation: new Euler(0.5, 0, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.48, 0.26, 0.8),
    rotation: new Euler(0.5, 0.9, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.12, -0.26, 1),
    rotation: new Euler(0.2, 0.65, 0.5, "XZY"),
    progress: 0,
  },
];

// Mobile-friendly positions: fewer cameras, more spread out, avoiding text area
const mobileCameraProps: { position: Vector3; rotation: Euler; progress: number }[] = [
  {
    position: new Vector3(-0.35, 0.35, 0.3),
    rotation: new Euler(0.4, -0.6, 0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.35, 0.35, 0.4),
    rotation: new Euler(0.55, -0.6, 0.8, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.25, -0.4, 0.5),
    rotation: new Euler(0.1, -0.6, -0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.3, -0.35, 0.6),
    rotation: new Euler(0.2, 0.65, 0.5, "XZY"),
    progress: 0,
  },
];

export const CapsModel = () => {
  const innerRef = React.useRef<THREE.Group>(null);
  const { width } = useThree((state) => state.viewport);
  const gltf = useGLTF("/models/Camera.glb");

  // Determine if we're on mobile based on Three.js viewport width
  const isMobile = width < 5;
  const cameraProps = isMobile ? mobileCameraProps : allCameraProps;

  // Create cloned scenes for each instance
  const clonedScenes = useMemo(() => {
    // Always create max number of clones (desktop count)
    return allCameraProps.map(() => {
      const clone = gltf.scene.clone(true);
      clone.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((m: any) => {
              const cloned = m.clone();
              cloned.transparent = true;
              cloned.opacity = 0;
              return cloned;
            });
          } else {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        }
      });
      return clone;
    });
  }, [gltf]);

  // Also create mobile-specific clones
  const mobileClonedScenes = useMemo(() => {
    return mobileCameraProps.map(() => {
      const clone = gltf.scene.clone(true);
      clone.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((m: any) => {
              const cloned = m.clone();
              cloned.transparent = true;
              cloned.opacity = 0;
              return cloned;
            });
          } else {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        }
      });
      return clone;
    });
  }, [gltf]);

  const activeScenes = isMobile ? mobileClonedScenes : clonedScenes;

  const responsiveVPWidth = Math.max(width, 4);
  const halfViewportWidth = responsiveVPWidth / 2;
  const fadeInYoffset = 0.1;

  // Scale: smaller on mobile to avoid overwhelming the text
  const scaleDivisor = isMobile ? 55 : 35;

  // Pre-cache materials for each scene to avoid traversal in handleUpdate loop
  const cachedMaterials = useMemo(() => {
    return activeScenes.map((scene) => {
      const mats: THREE.Material[] = [];
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            mats.push(...child.material);
          } else {
            mats.push(child.material);
          }
        }
      });
      return mats;
    });
  }, [activeScenes]);

  const handleUpdate = React.useCallback(
    (idx: number) => {
      const scene = activeScenes[idx];
      const materials = cachedMaterials[idx];
      if (!scene || !materials) return;

      const props = cameraProps[idx];
      const currObj = innerRef.current?.children[idx] as THREE.Object3D;

      if (!currObj || !props) return;

      const isEven = idx % 2 === 0;
      const currObjPosition = props.position
        .clone()
        .multiplyScalar(halfViewportWidth);
      const invProgress = 1 - props.progress;

      // Update opacity directly from cached materials array instead of traversing
      materials.forEach((m: any) => {
        m.opacity = props.progress;
      });

      currObj.rotation.y =
        props.rotation.y +
        (isEven ? 1 : -1) * (props.progress * Math.PI * 2);
      currObj.position.y = currObjPosition.y - invProgress * fadeInYoffset;
    },
    [activeScenes, cachedMaterials, halfViewportWidth, cameraProps]
  );

  return (
    <>
      <Scrollytelling.Stagger
        overlap={0.65}
        tween={
          {
            start: 48,
            end: 100,
            target: cameraProps,
            to: {
              progress: 1,
              ease: "power2.inOut",
              onUpdate: (idx) => {
                handleUpdate(idx);
              },
            },
          }
        }
      />

      <Scrollytelling.Waypoint
        at={0}
        onReverseCall={() => {
          cameraProps.forEach((cameraProp, idx) => {
            cameraProp.progress = 0;
            handleUpdate(idx);
          });
        }}
      />

      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} />

      <group ref={innerRef}>
        {cameraProps.map(({ position, rotation }, idx) => {
          return (
            <group
              scale={responsiveVPWidth / scaleDivisor}
              position={position.clone().multiplyScalar(halfViewportWidth)}
              rotation={rotation.clone()}
              key={idx}
            >
              <Float>
                <primitive object={activeScenes[idx]!} />
              </Float>
            </group>
          );
        })}
      </group>
    </>
  );
};
