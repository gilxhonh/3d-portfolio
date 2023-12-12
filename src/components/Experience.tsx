import {OrbitControls} from "@react-three/drei";
import {Avatar} from "./Avatar";

const Experience = () => {
    return (
        <>
            <OrbitControls/>
            <group position-y={-1}>
                <Avatar/>
            </group>
            <ambientLight intensity={1}/>
            <directionalLight intensity={2} position={[10, 20, 10]} shadow-radius={5} castShadow/>
            <planeGeometry/>
        </>
    );
};

export default Experience;