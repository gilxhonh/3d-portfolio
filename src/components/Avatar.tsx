import * as THREE from "three";
import { Group, Object3D } from "three";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Hair: THREE.MeshStandardMaterial;
  };
};

export function Avatar(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    "models/651ca36edab353c63566a851.glb"
  ) as GLTFResult;

  const { animation } = props;

  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });

  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: bored } = useFBX("animations/Bored.fbx");
  const { animations: fallingIdle } = useFBX("animations/FallingIdle.fbx");

  typingAnimation[0].name = "Typing";
  bored[0].name = "Bored";
  fallingIdle[0].name = "FallingIdle";

  const typingActions = useAnimations(typingAnimation, group);
  const boredActions = useAnimations(bored, group);
  const fallingIdleActions = useAnimations(fallingIdle, group);

  useEffect(() => {
    let currentActions = typingActions.actions;

    // Determine which actions to use based on the current animation
    switch (animation) {
      case "Typing":
        currentActions = typingActions.actions;
        break;
      case "Bored":
        currentActions = boredActions.actions;
        break;
      case "FallingIdle":
        currentActions = fallingIdleActions.actions;
        break;
      default:
        // Handle default  case or unknown animations
        console.warn("Unknown animation:", animation);
        return;
    }

    // Play the current animation
    if (currentActions && currentActions[animation]) {
      currentActions[animation]!.reset().fadeIn(0.5).play();
    }

    // Cleanup function to stop the animation when the component unmounts or animation changes
    return () => {
      if (currentActions && currentActions[animation]) {
        currentActions[animation]!.reset().fadeOut(0.5);
      }
    };
  }, [
    animation,
    typingActions.actions,
    boredActions.actions,
    fallingIdleActions.actions,
  ]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [materials, wireframe]);

  useFrame((state) => {
    const currentGroup: Object3D = group["current"]!;
    const head = currentGroup.getObjectByName("Head");
    const spine2 = currentGroup.getObjectByName("Spine2");
    if (headFollow) {
      const target = state.camera.position;
      head!.lookAt(target);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 1);
      spine2!.lookAt(target);
    }
  });

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/651ca36edab353c63566a851.glb");
