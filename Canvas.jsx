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

    // const [engine, setEngine] = useState()
    useEffect(() => {

        resizeObs = new ResizeObserver(callback)
        resizeObs.observe(target.current.parentNode)
    }, [])

    useEffect(() => {
        // if (engine) {
        const size = 100
        // setEngine()
        const engine = new Engine(target.current)
        engine.meshes.push(new Mesh(0, 0, 0, size))
        // engine.meshes.push(new Mesh(0, size * 2.2, -100, size))
        // engine.meshes.push(new Mesh(0+ size * 2.3, 0 + size * 2.3, , size))

        let targetAngle = 0.02
        let current = 1
        engine.draw()
        const step = (t) => {

            engine.meshes.forEach(el => {
                el.rotate('x', targetAngle, current)
                // el.rotate('y', targetAngle / 2, current)
                el.rotate('z', targetAngle, current)
            })

            engine.draw()
            requestAnimationFrame(step);
        }

        requestAnimationFrame(step)

        // }
    }, [width, height])

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