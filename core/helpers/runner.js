import PropTypes from "prop-types";
import styles from '../../styles/Canvas.module.css'
import profiler from "./profiler";

export function debugRunner({
                                targetRef,
                                engine,
                                shading,
                                wireframeMode,
                                texturing,
                                rotation,
                                vertex
                            }) {
    let times = [], fps, performanceMetrics = {}

    const execDebug = (t) => {
        let start = performance.now(), stop
        if (rotation !== undefined) {
            engine.meshes.forEach(el => {
                if (rotation.rotationAxis.includes('x'))
                    el.rotate('x', rotation.radiansAngle)
                if (rotation.rotationAxis.includes('y'))
                    el.rotate('y', rotation.radiansAngle)
                if (rotation.rotationAxis.includes('z'))
                    el.rotate('z', rotation.radiansAngle)
            })
        }
        engine.draw(wireframeMode, texturing, shading, vertex, perf => performanceMetrics = perf)
        stop = performance.now()

        targetRef.innerHTML = profiler({engine, fps, milliseconds: stop - start, performanceData: performanceMetrics})
        while (times.length > 0 && times[0] <= start - 1000) {
            times.shift();
        }

        times.push(start);
        fps = times.length;
        requestAnimationFrame(execDebug);
    }

    requestAnimationFrame(execDebug);

}

export function runner(engine) {
    const exec = (t) => {
        engine.draw()
        requestAnimationFrame(exec);
    }
    requestAnimationFrame(exec);
}