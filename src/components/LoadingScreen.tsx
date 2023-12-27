import { useProgress } from "@react-three/drei";
import React, { useEffect } from "react";

interface LoadingScreenProps {
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, total, loaded, item, setStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex items-center justify-center bg-black
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-4xl md:text-9xl font-bold text-gray-50 relative">
        <div
          className="absolute left-0 top-0  overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        >
          Gilxhon Hima
        </div>
        <div className="text-gray-800">Gilxhon Hima</div>
      </div>
    </div>
  );
};
