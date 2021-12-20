import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useMesh from "../hooks/useMesh";
import useCameraMovement from "../hooks/useCameraMovement";
import styles from '../styles/Canvas.module.css'
import {debugRunner, runner} from "../core/helpers/runner";
import Options from "./Options";
import useOptions from "../hooks/useOptions";
import Navigation from "./Navigation";

export default function Viewport(props) {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    let resizeObs
    const target = useRef()
    const callback = () => {
        setWidth(target.current.parentNode.offsetWidth)
        setHeight(target.current.parentNode.offsetHeight)
    }
    const camera = useCameraMovement(target.current?.parentNode, props.enabledDebug)
    const engine = useMesh(props.meshes, target.current)
    const profiler = useOptions()
    useEffect(() => {

        resizeObs = new ResizeObserver(callback)
        resizeObs.observe(target.current.parentNode)
    }, [])
    const ref = useRef()
    let executing = false

    useEffect(() => {
        if (engine && !executing) {
            engine.camera = camera
            executing = true
            if (props.enabledDebug)
                debugRunner({
                    shading: profiler.shading,
                    texturing: profiler.texturing,
                    targetRef: ref.current,
                    engine: engine,
                    wireframeMode: profiler.wireframeMode,
                    rotation: props.rotation,
                    vertex: profiler.vertexVisible
                })
            else
                runner(engine)
        }
    }, [engine, camera])

    return (
        <>
            <div ref={ref} className={styles.perfMetric}/>
            {props.enabledDebug ? <Options {...profiler}/> : null}
            {props.enabledDebug ? <Navigation {...profiler}/> : null}
            <canvas width={width} height={height} ref={target} className={styles.viewport}/>
        </>
    )
}

Viewport.propTypes = {
    meshes: PropTypes.arrayOf(PropTypes.string),
    rotation: PropTypes.shape({
        rotationAxis: PropTypes.arrayOf(PropTypes.oneOf(['y', 'x', 'z'])),
        radiansAngle: PropTypes.number
    }),
    enabledDebug: PropTypes.bool
}