// Contact Section Component
import React from "react";
import Section from "../core/Section.tsx";
import MainButton from "../core/MainButton.tsx";
import LinkedInLogo from "../../assets/linkedin.svg";
import { motion } from "framer-motion";

import { useForm, ValidationError } from "@formspree/react";

const ContactSection: React.FC = () => {
  const [state, handleSubmit] = useForm("mnqeaedn");

  return (
    <Section>
      <h2 className="text-5xl font-bold">Contact me</h2>
      <div className="mt-8 rounded-md w-96 max-w-full">
        <div className="p-8 h-full w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100">
          {state.succeeded ? (
            <p className="text-gray-900 text-center">
              Thanks for your message !
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="font-medium text-gray-900 block mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <label
                htmlFor="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <ValidationError
                className="mt-1 text-red-500"
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <label
                htmlFor="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <ValidationError
                className="mt-1 text-red-500"
                errors={state.errors}
              />
              <div className="mt-10 flex justify-between items-center w-full">
                <button type="submit" disabled={state.submitting}>
                  <MainButton title="Submit" />
                </button>

                <motion.a
                  href="https://www.linkedin.com/in/gilxhon-hima/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 1,
                  }}
                >
                  Or reach me on
                  <img
                    src={LinkedInLogo}
                    alt="LinkedIn"
                    className="inline-block ml-2"
                  />
                </motion.a>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
