import {useEffect, useState} from "react";
import Camera from "../core/elements/Camera";
import conf from '../config.json'

export default function useCameraMovement(target, debugEnabled, engine) {
    const [isFocused, setIsFocused] = useState(false)
    const camera = new Camera(0, 0, 0)
    let lastMousePosition = {x: 0, y: 0}

    const handleMouseDown = (event) => {

        if (target && target.contains(event.target)) {
            if (!debugEnabled)
                target.style.cursor = 'none'
            setIsFocused(true)
        } else {
            if (!debugEnabled)
                target.style.cursor = 'default'
            setIsFocused(false)
        }
    }

    const handleMouseUp = () => {
        setIsFocused(false)
    }

    const handleMouseMove = (event) => {
        if (isFocused) {

            let pitch, yaw
            if (event.clientY - lastMousePosition.y < 0)
                pitch = engine.camera.fPitch - (conf.sensitivity.pitch ? conf.sensitivity.pitch : .005)
            else if (event.clientY - lastMousePosition.y > 0)
                pitch = engine.camera.fPitch + (conf.sensitivity.pitch ? conf.sensitivity.pitch : .005)

            if (event.clientX - lastMousePosition.x < 0)
                yaw = engine.camera.fYaw - (conf.sensitivity.yaw ? conf.sensitivity.yaw : .005)
            else if (event.clientX - lastMousePosition.x > 0)
                yaw = engine.camera.fYaw + (conf.sensitivity.yaw ? conf.sensitivity.yaw : .005)


            engine.camera.update(
                undefined,
                undefined,
                undefined,
                undefined,
                pitch
            )


            engine.camera.update(
                undefined,
                undefined,
                undefined,
                yaw)

            lastMousePosition = {x: event.clientX, y: event.clientY}
        }

    }
    const handleKeydown = (event) => {
        if (isFocused)
            switch (event.code) {
                case conf.keybindings.forwards: {
                    engine.camera.update(undefined, undefined, engine.camera.vector.z + (conf.sensitivity.forwards ? conf.sensitivity.forwards : .1))
                    break
                }
                case conf.keybindings.backwards: {
                    engine.camera.update(undefined, undefined, engine.camera.vector.z - (conf.sensitivity.backwards ? conf.sensitivity.backwards : .1))
                    break
                }

                case conf.keybindings.up: {
                    engine.camera.update(undefined, engine.camera.vector.y + (conf.sensitivity.up ? conf.sensitivity.up : 1), undefined)
                    break
                }
                case conf.keybindings.down: {
                    engine.camera.update(undefined, engine.camera.vector.y - (conf.sensitivity.down ? conf.sensitivity.down : 1), undefined)
                    break
                }
                case conf.keybindings.left: {
                    engine.camera.update(engine.camera.vector.x + (conf.sensitivity.left ? conf.sensitivity.left : 1), undefined, undefined)
                    break
                }
                case conf.keybindings.right: {
                    engine.camera.update(engine.camera.vector.x - (conf.sensitivity.right ? conf.sensitivity.right : 1), undefined, undefined)
                    break
                }
                default:
                    break
            }
    }

    useEffect(() => {
        if (engine && engine.camera === undefined) {
            console.log('HERE')
            engine.camera = camera
        }
    }, [engine])

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [target])

    useEffect(() => {

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isFocused, target])

    return camera
}