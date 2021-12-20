import {useState} from "react";

export default function useOptions() {
    const [wireframeMode, setWireframeMode] = useState(false)
    const [shading, setShading] = useState(true)
    const [vertexVisible, setVertexVisible] = useState(false)
    const [texturing, setTexturing] = useState(true)
    const [fpsVisible, setFpsVisible] = useState(true)
    const [tpfVisible, setTpfVisible] = useState(true)


    return {
        wireframeMode,
        setWireframeMode,
        texturing,
        setTexturing,
        shading,
        setShading,
        vertexVisible,
        setVertexVisible,
        fpsVisible,
        setFpsVisible,
        tpfVisible, setTpfVisible
    }
}