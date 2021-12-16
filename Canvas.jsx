import {useEffect, useRef, useState} from "react";
import Mesh from "./elements/Mesh";
import Engine from "./elements/Engine";

export default function Canvas() {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    let resizeObs
    const target = useRef()
    const callback = () => {
        setWidth(target.current.parentNode.offsetWidth)
        setHeight(target.current.parentNode.offsetHeight)
    }

    const [engine, setEngine] = useState()
    useEffect(() => {
        setEngine(new Engine(target.current))
        resizeObs = new ResizeObserver(callback)
        resizeObs.observe(target.current.parentNode)
    }, [])

    useEffect(() => {
        if (engine) {
            engine.meshes.push( new Mesh(width / 2, height / 2, 0, width * .03))

            const targetAngle = .005
            let current = 1
            const step = () => {
                engine.meshes.forEach(el => {
                    el.rotate('x', targetAngle, current)
                    el.rotate('y', targetAngle * 2, current)
                    el.rotate('z', targetAngle / 16, current)
                })

                engine.draw()

                requestAnimationFrame(step);
            }

            requestAnimationFrame(step)

        }
    }, [width, height, engine])

    return (
        <div style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'hidden',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <canvas width={width} height={height} ref={target} style={{border: 'blue 2px solid'}}/>
        </div>
    )
}