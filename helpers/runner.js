import PropTypes from "prop-types";
import styles from '../styles/Canvas.module.css'

export function debugRunner({
                                targetRef,
                                engine,
                                drawCallMilliseconds,
                                framerate,
                                wireframeMode,
                                noTexture,
                                rotation
                            }) {
    let times = [];
    let fps;

    const execDebug = (t) => {
        let start = performance.now(), stop
        if (rotation !== undefined) {
            engine.meshes.forEach(el => {
                switch (rotation.rotationAxis) {
                    case 'x':
                        el.rotate('x', rotation.radiansAngle)
                        break
                    case 'y':
                        el.rotate('y', rotation.radiansAngle)
                        break
                    case 'z':
                        el.rotate('z', rotation.radiansAngle)
                        break
                    default:
                        break

                }
            })
        }
        engine.draw(wireframeMode, noTexture)
        stop = performance.now()

        let toRender = '', milliseconds = (stop - start).toFixed(2)
        if (drawCallMilliseconds)
            toRender = `<div title="Drawcall processing time">${milliseconds} ms</div>`
        if (framerate)
            toRender += `<div title="${fps < 30 ? 'Poor' : fps >= 30 && fps < 60 ? 'Acceptable' : 'Ideal'}" data-poor="${fps < 30}" data-ok="${fps >= 30 && fps < 60}" data-ideal="${fps >= 60}"  class="${styles.fpsCounter}" >${fps} Frames per second</div>`

        if (toRender.length > 0)
            targetRef.innerHTML = toRender

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