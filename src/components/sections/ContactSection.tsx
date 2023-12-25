// Contact Section Component
import React from "react";
import Section from "../core/Section.tsx";
import LabelInputPair from "../core/LabelInputPair.tsx";
import LabelTextAreaPair from "../core/LabelTextAreaPair.tsx";
import MainButton from "../core/MainButton.tsx";

const ContactSection: React.FC = () => (
  <Section>
    <h2 className="text-5xl font-bold">Contact me</h2>
    <div className="mt-8 rounded-md w-96 max-w-full">
      <div className="p-8 h-full w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100">
        <form>
          <LabelInputPair
            label="Name"
            type="text"
            name="name"
            id="name"
            autoComplete="name"
          />
          <LabelInputPair
            label="Email"
            type="email"
            name="email"
            id="email"
            autoComplete="email"
          />
          <LabelTextAreaPair label="Message" name="message" id="message" />
          <MainButton title="Submit" />
        </form>
      </div>
    </div>
  </Section>
);

export default ContactSection;
