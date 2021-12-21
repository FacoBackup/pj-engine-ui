import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useEngine from "../hooks/useEngine";
import useCameraMovement from "../hooks/useCameraMovement";
import styles from '../styles/Canvas.module.css'

import Options from "./Options";
import useOptions from "../hooks/useOptions";
import Navigation from "./Navigation";
import Triangle from "../core/elements/Triangle";
import Grid from "../core/elements/Grid";
import Mesh from "../core/elements/Mesh";
import Controls from "./Controls";

export default function Viewport(props) {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    let resizeObs
    const target = useRef()
    const callback = () => {
        setWidth(target.current.parentNode.offsetWidth)
        setHeight(target.current.parentNode.offsetHeight)
    }

    const engine = useEngine(props.meshes, target.current)
    useCameraMovement(target.current?.parentNode, props.enabledDebug, engine)

    const profiler = useOptions()
    useEffect(() => {

        resizeObs = new ResizeObserver(callback)
        resizeObs.observe(target.current.parentNode)
    }, [])

    let executing = false
    const [rotations, setRotations] = useState({
        x: false,
        y: false,
        z: false,
        angle: 0.01
    })
    // const grid = (new Grid())

    useEffect(() => {
        if (engine && !executing) {
            // if (grid.triangles.length === 0) {
            //     grid.computeVertexes()
            //     engine.meshes.push(new Mesh(grid.triangles))
            // }

            executing = true
            if (props.enabledDebug)
                engine.executeDebug(
                    profiler.shading,
                    profiler.wireframeMode,
                    profiler.texturing,
                    rotations,
                    profiler.vertexVisible
                )
            else
                engine.executeProd()
        }

        return () => {
            if (engine)
                cancelAnimationFrame(engine.currentFrame)
            executing = false
        }
    }, [engine, rotations, profiler])

    return (
        <>

            {props.enabledDebug ? <Options {...profiler}/> : null}
            {props.enabledDebug ? <Navigation rotations={rotations} setRotations={setRotations}/> : null}
            <canvas
                width={width}
                height={height}
                ref={target}
                className={styles.viewport}
            />
        </>
    )
}

Viewport.propTypes = {
    meshes: PropTypes.arrayOf(PropTypes.string),

    enabledDebug: PropTypes.bool
}