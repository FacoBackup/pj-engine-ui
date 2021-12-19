import {useEffect, useState} from "react";
import Camera from "../core/elements/Camera";
import conf from '../config.json'
export default function useCameraMovement(target, debugEnabled) {
    const [isFocused, setIsFocused] = useState(false)
    const camera = new Camera(0, 0, 0)

    const handleClick = (event) => {

        if (target && target.contains(event.target)) {
            if(!debugEnabled)
                target.style.cursor = 'none'
            setIsFocused(true)
        }
        else {
            if(!debugEnabled)
                target.style.cursor = 'default'
            setIsFocused(false)
        }
    }

    const handleKeydown = (event) => {
        if (isFocused)
            switch (event.code) {
                case conf.keybindings.forwards: {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward + (conf.sensitivity.forwards ? conf.sensitivity.forwards : .1))
                    break
                }
                case conf.keybindings.backwards: {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward - (conf.sensitivity.backwards ? conf.sensitivity.backwards : .1))
                    break
                }
                case conf.keybindings.rotateLeft: {
                    camera.update(undefined, undefined, undefined, camera.fYaw - ( conf.sensitivity.rotationLeft ? conf.sensitivity.rotationLeft : .05))
                    break
                }
                case conf.keybindings.rotateRight: {
                    camera.update(undefined, undefined, undefined, camera.fYaw + (conf.sensitivity.rotationRight ? conf.sensitivity.rotationRight : .05))
                    break
                }
                case conf.keybindings.up: {
                    camera.update(undefined, camera.vector.y + (conf.sensitivity.up ? conf.sensitivity.up : 1), undefined)
                    break
                }
                case conf.keybindings.down: {
                    camera.update(undefined, camera.vector.y - (conf.sensitivity.down ? conf.sensitivity.down : 1), undefined)
                    break
                }
                case conf.keybindings.left: {
                    camera.update(camera.vector.x - (conf.sensitivity.left ? conf.sensitivity.left : 1), undefined, undefined)
                    break
                }
                case conf.keybindings.right: {
                    camera.update(camera.vector.x + (conf.sensitivity.right ? conf.sensitivity.right : 1), undefined, undefined)
                    break
                }
                default:
                    break
            }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [target])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.addEventListener('keydown', handleKeydown)
        }
    }, [isFocused, target])

    return camera
}