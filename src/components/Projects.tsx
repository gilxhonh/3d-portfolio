import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { atom } from "jotai/index";
import { Material, Mesh } from "three";

interface Project {
  title: string;
  url: string;
  image: string;
  description: string;
}

export const projects: Project[] = [
  {
    title: "AI Post Generator",
    url: "https://ai-blog-post-generator-nine.vercel.app/",
    image: "projects/wawatmos.jpg",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "3D Portfolio",
    url: "https://gilxhon.com",
    image: "projects/baking.jpg",
    description: "Build a 3D portfolio using Three js",
  },
  {
    title: "NFT Marketplace",
    url: "https://github.com/Gilxhon001/NFT-Marketplace",
    image: "projects/avatar.jpg",
    description: "Build a NFT Marketplace ICP Blockchain",
  },
  {
    title: "Kanagame",
    url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
    image: "projects/kanagame.jpg",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Loader",
    url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
    image: "projects/loader.jpg",
    description: "Create a loading screen for your r3f projects",
  },
];

interface ProjectProps {
  project: Project;
  highlighted: boolean;
}

const Project: React.FC<ProjectProps> = (props) => {
  const { project, highlighted } = props;

  const background = useRef<Mesh>(null);
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [bgOpacity, highlighted]);

  useFrame(() => {
    if (background.current) {
      if (background.current.material instanceof Material) {
        background.current.material.opacity = bgOpacity.get();
      }
    }
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
