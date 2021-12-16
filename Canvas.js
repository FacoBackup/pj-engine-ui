import {useEffect, useRef, useState} from "react";
import Cube from "./Cube";

export default function Canvas() {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    let resizeObs
    const target = useRef()
    const callback = () => {
        setWidth(target.current.parentNode.offsetWidth / 2)
        setHeight(target.current.parentNode.offsetHeight / 2)
    }
    const [context, setContext] = useState()
    useEffect(() => {
        setContext(target.current.getContext('2d'))
        resizeObs = new ResizeObserver(callback)
        resizeObs.observe(target.current.parentNode)
    }, [])

    useEffect(() => {
        if (context) {
            const cube = new Cube(width / 2, height / 2, 0, height / 10)

            // cube.draw(context)
            const targetAngle = .03
            let current = 1
            const step = () => {

                cube.rotate('x', targetAngle, current, context)
                cube.rotate('y', targetAngle / 2, current, context)
                cube.rotate('z', targetAngle / 4, current, context)
                // current = current === 1 ? .5 : 1
                requestAnimationFrame(step);

            }

            requestAnimationFrame(step)

        }
    }, [width, height, context])

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