const Section = (props) => {
  const { children } = props;

  return (
    <section
      className={`
    w-screen 
    h-screen 
    p-8 
    max-w-screen-2xl
    mx-auto
    flex 
    flex-col
    items-start
    justify-center
    `}
    >
      {children}
    </section>
  );
};

export const Interface = () => {
  return (
    <div className={`flex flex-col items-center, w-screen`}>
      <AboutSection />
      <Section>
        <h1>About</h1>
      </Section>
      <Section>
        <h1>Skills</h1>
      </Section>
      <Section>
        <h1>Projects</h1>
      </Section>
      <Section>
        <h1>Contact</h1>
      </Section>
    </div>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Gilxhon Hima</span>
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        I make YouTube videos to help developers
        <br />
        learn how to build 3D apps
      </p>
      <a href="#_" className="relative inline-block text-lg group mt-16">
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Button Text</span>
        </span>
        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </a>
    </Section>
  );
};
