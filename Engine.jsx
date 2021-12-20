import {useMemo, useState} from "react";
import PropTypes from "prop-types";
import styles from './styles/Canvas.module.css'
import Viewport from "./components/Viewport";

export default function Engine(props) {
    const [tab, setTab] = useState(0)
    const id = useMemo(() => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result
    }, [])


    return (
        <div className={styles.wrapper}>
            <Viewport {...props} id={id}/>
        </div>
    )
}

Engine.propTypes = {
    meshes: PropTypes.arrayOf(PropTypes.string).isRequired,
    rotation: PropTypes.shape({
        rotationAxis: PropTypes.arrayOf(PropTypes.oneOf(['y', 'x', 'z'])),
        radiansAngle: PropTypes.number
    }),
    enabledDebug: PropTypes.bool
}