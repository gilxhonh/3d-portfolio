// Label and Input Pair Component
import React from "react";

type LabelInputPairProps = {
  label: string;
  type: string;
  name: string;
  id: string;
};

const LabelInputPair: React.FC<LabelInputPairProps> = ({
  label,
  type,
  name,
  id,
}) => (
  <>
    <label htmlFor={id} className="font-medium text-gray-900 block mb-1 mt-8">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={id}
      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
    />
  </>
);

export default LabelInputPair;
