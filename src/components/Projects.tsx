import { Image, RoundedBox, Text } from "@react-three/drei";
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
  tech: string[];
  linkType: "live" | "code";
}

export const projects: Project[] = [
  {
    title: "Blog Standard",
    url: "https://ai-blog-post-generator-nine.vercel.app/",
    image: "projects/blogpost.png",
    description: "AI blog post generator powered by OpenAI GPT",
    tech: ["Next.js", "OpenAI API"],
    linkType: "live",
  },
  {
    title: "3D Portfolio",
    url: "https://gilxhon.com",
    image: "projects/3dportfolio.png",
    description: "This interactive 3D portfolio",
    tech: ["Three.js", "R3F", "TypeScript"],
    linkType: "live",
  },
  {
    title: "XLMERGE",
    url: "https://excel-merger-client.vercel.app/",
    image: "projects/excel-merger.jpg",
    description: "Merges multiple Excel spreadsheets into one file",
    tech: ["React", "Node.js", "SheetJS"],
    linkType: "live",
  },
  {
    title: "Blingu.al",
    url: "https://blingu.al/",
    image: "projects/blingual.jpg",
    description:
      "E-commerce store serving Albania & Kosovo — electronics and more",
    tech: ["Shopify", "Liquid", "E-commerce"],
    linkType: "live",
  },
  {
    title: "ENGAGEathon",
    url: "https://www.engageathon.com/",
    image: "projects/cover.png",
    description:
      "Engagement platform for corporations, nonprofits and universities",
    tech: ["React", "TypeScript", "Node.js"],
    linkType: "live",
  },
  {
    title: "Wanderpin",
    url: "https://github.com/Gilxhon001/ReactNative-FavoritePlaces",
    image: "projects/favorite-places.jpg",
    description: "Mobile app to capture and revisit your favorite places",
    tech: ["React Native", "Expo", "SQLite"],
    linkType: "code",
  },
  {
    title: "NFT Marketplace",
    url: "https://github.com/Gilxhon001/NFT-Marketplace",
    image: "projects/web3.png",
    description: "NFT marketplace built on the ICP blockchain",
    tech: ["React", "ICP", "Web3"],
    linkType: "code",
  },
];

interface ProjectProps {
  project: Project;
  highlighted: boolean;
}

const Project: React.FC<ProjectProps> = (props) => {
  const { project, highlighted } = props;

  const background = useRef<Mesh>(null);
  const bgOpacity = useMotionValue(0.45);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.65 : 0.45);
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
      {/* Flat card, exactly like the contact form:
          bg-gray-100 bg-opacity-60 rounded-md border border-gray-100 */}
      <RoundedBox
        args={[2.34, 2.14, 0.01]}
        radius={0.05}
        smoothness={4}
        position-z={-0.03}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <meshBasicMaterial color="#f3f4f6" transparent opacity={0.6} />
      </RoundedBox>
      {/* border border-gray-100 */}
      <RoundedBox
        args={[2.36, 2.16, 0.005]}
        radius={0.055}
        smoothness={4}
        position-z={-0.04}
      >
        <meshBasicMaterial color="#f9fafb" transparent opacity={0.8} />
      </RoundedBox>
      <Image
        scale={[2, 1.2]}
        url={project.image}
        toneMapped={false}
        position-y={0.35}
      />
      <Text
        maxWidth={1.55}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.15}
        color="#111827"
        position={[-1, -0.35, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        anchorX="right"
        anchorY="top"
        fontSize={0.09}
        color="#4f46e5"
        position={[1, -0.38, 0]}
      >
        {project.linkType === "live" ? "LIVE ↗" : "CODE ↗"}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.095}
        color="#1f2937"
        position={[-1, -0.58, 0]}
      >
        {project.description}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.085}
        color="#4f46e5"
        position={[-1, -0.86, 0]}
      >
        {project.tech.join("  ·  ")}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  // Responsive card size: highlighted card covers most of the screen.
  // Card geometry is 2.2 x 2 units; highlighted card is scaled 1.25x more.
  // depthFactor compensates for cards sitting at z≈-2 while viewport is at z=0.
  const depthFactor = 1.2;
  const baseScale = Math.min(
    (viewport.height * 0.5 * depthFactor) / 2.5,
    (viewport.width * 0.75 * depthFactor) / 2.75
  );
  const spacing = 2.7 * baseScale;

  return (
    <group position-y={-viewport.height * 2}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * spacing, 0, -3]}
          animate={{
            x: (index - currentProject) * spacing,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
            scale: currentProject === index ? baseScale * 1.25 : baseScale,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
