import {useEffect, useState} from "react";
import Camera from "../elements/Camera";
import keybindings from '../config.json'
export default function useCameraMovement(target) {
    const [isFocused, setIsFocused] = useState(false)
    const camera = new Camera(0, 0, 0)

    const handleClick = (event) => {

        if (target && target.contains(event.target)) {
            target.style.cursor = 'none'
            setIsFocused(true)
        }
        else {
            target.style.cursor = 'default'
            setIsFocused(false)
        }
    }

    const handleKeydown = (event) => {
        if (isFocused)
            switch (event.code) {
                case keybindings.keybindings.forwards: {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward + 1)
                    break
                }
                case keybindings.keybindings.backwards: {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward - 1)
                    break
                }
                case keybindings.keybindings.rotateLeft: {
                    camera.update(undefined, undefined, undefined, camera.fYaw - .05)
                    break
                }
                case keybindings.keybindings.rotateRight: {
                    camera.update(undefined, undefined, camera.vector.z, camera.fYaw + .05)
                    break
                }
                case keybindings.keybindings.up: {
                    camera.update(undefined, camera.vector.y + 1, undefined)
                    break
                }
                case keybindings.keybindings.down: {
                    camera.update(undefined, camera.vector.y - 1, undefined)
                    break
                }
                case keybindings.keybindings.left: {
                    camera.update(camera.vector.x - 1, undefined, undefined)
                    break
                }
                case keybindings.keybindings.right: {
                    camera.update(camera.vector.x + 1, undefined, undefined)
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