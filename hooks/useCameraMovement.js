import {useEffect, useState} from "react";
import Camera from "../elements/Camera";

export default function useCameraMovement(target) {
    const [isFocused, setIsFocused] = useState(false)
    const camera = new Camera(0, 0, 0)

    const handleClick = (event) => {

        if (target && target.contains(event.target))
            setIsFocused(true)
        else
            setIsFocused(false)
    }

    const handleKeydown = (event) => {
        if (isFocused)
            switch (event.code) {
                case 'KeyW': {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward + 1)
                    break
                }
                case 'KeyS': {
                    camera.update(undefined, undefined, undefined, undefined, camera.forward - 1)
                    break
                }
                case 'KeyA': {
                    camera.update(undefined, undefined, undefined, camera.fYaw - .01)
                    break
                }
                case 'KeyD': {
                    camera.update(undefined, undefined, camera.vector.z, camera.fYaw + .01)
                    break
                }

                case 'ArrowUp': {
                    camera.update(undefined, camera.vector.y + 1, undefined)
                    break
                }
                case 'ArrowDown': {
                    camera.update(undefined, camera.vector.y - 1, undefined)
                    break
                }
                case 'ArrowLeft': {
                    camera.update(camera.vector.x - 1, undefined, undefined)
                    break
                }
                case 'ArrowRight': {
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