import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useMesh from "./hooks/useMesh";
import useCameraMovement from "./hooks/useCameraMovement";
import styles from './styles/Canvas.module.css'
import {debugRunner, runner} from "./helpers/runner";

export default function Canvas(props) {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    let resizeObs
    const target = useRef()
    const callback = () => {
        setWidth(target.current.parentNode.offsetWidth)
        setHeight(target.current.parentNode.offsetHeight)
    }
    const camera = useCameraMovement(target.current?.parentNode)
    const engine = useMesh(props.modelFile, target.current)

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
            if (props.debug !== undefined)
                debugRunner({
                    ...props.debug,
                    targetRef: ref.current,
                    engine: engine,
                })
            else
                runner(engine)
        }
    }, [engine, camera])

    return (
        <div className={styles.wrapper}>
            <div ref={ref} className={styles.perfMetric}/>
            <canvas width={width} height={height} ref={target}/>
        </div>
    )
}

Canvas.propTypes = {
    modelFile: PropTypes.string,
    debug: PropTypes.shape({
        wireframeMode: PropTypes.bool,
        noTexture: PropTypes.bool,
        rotation: PropTypes.shape({
            rotationAxis: PropTypes.arrayOf(PropTypes.oneOf(['y', 'x', 'z'])),
            radiansAngle: PropTypes.number
        }),

        profiling: PropTypes.shape({
            performanceMetrics: PropTypes.bool,

            triangleCount: PropTypes.bool,
            framerate: PropTypes.bool,
            verticesCount: PropTypes.bool,
        })
    })
}