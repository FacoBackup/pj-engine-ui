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
                    // camera.update(camera.vector.x, camera.vector.y , camera.vector.z +1)
                    break
                }
                case 'KeyS': {
                    // camera.update(camera.vector.x, camera.vector.y , camera.vector.z -1)
                    break
                }
                case 'KeyA': {
                    camera.update(camera.vector.x, camera.vector.y , camera.vector.z, camera.fYaw - .01)
                    break
                }
                case 'KeyD': {
                    camera.update(camera.vector.x, camera.vector.y , camera.vector.z, camera.fYaw + .01)
                    break
                }

                case 'ArrowUp': {
                    camera.update(camera.vector.x, camera.vector.y + 1, camera.vector.z)
                    break
                }
                case 'ArrowDown': {
                    camera.update(camera.vector.x, camera.vector.y - 1, camera.vector.z)
                    break
                }
                case 'ArrowLeft': {
                    camera.update(camera.vector.x - 1, camera.vector.y, camera.vector.z)
                    break
                }
                case 'ArrowRight': {
                    camera.update(camera.vector.x + 1, camera.vector.y, camera.vector.z)
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