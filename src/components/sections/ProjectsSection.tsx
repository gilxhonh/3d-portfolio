import { useAtom } from "jotai/index";
import { currentProjectAtom, projects } from "../Projects.tsx";
import Section from "../core/Section.tsx";
import MainButton from "../core/MainButton.tsx";

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex flex-col w-full h-full items-center justify-between py-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Projects</h2>
        <div className="flex gap-8 md:gap-16 items-center">
          <MainButton title="← Previous" onClick={previousProject} />
          <MainButton title="Next →" onClick={nextProject} />
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;
