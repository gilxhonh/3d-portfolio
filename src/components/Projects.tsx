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
    title: "NFT Marketplace",
    url: "https://github.com/Gilxhon001/NFT-Marketplace",
    image: "projects/web3.png",
    description: "Build a NFT Marketplace with ICP Blockchain and React.Js",
  },
  {
    title: "Blog Standard",
    url: "https://ai-blog-post-generator-nine.vercel.app/",
    image: "projects/blogpost.png",
    description:
      "Build an AI Blog post generator using OpenAI's GPT, with Next.Js",
  },
  {
    title: "ENGAGEathon",
    url: "https://www.engageathon.com/",
    image: "projects/cover.png",
    description:
      "Software the measures engagement for corporations, government, nonprofits and universities",
  },
  {
    title: "3D Portfolio",
    url: "https://gilxhon.com",
    image: "projects/3dportfolio.png",
    description: "Build a 3D portfolio using Three js and React.Js",
  },
  {
    title: "Favorite Places",
    url: "https://github.com/Gilxhon001/ReactNative-FavoritePlaces",
    image: "projects/favorite-places.jpg",
    description:
      "Build a mobile App to save your favorite places with React Native",
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
