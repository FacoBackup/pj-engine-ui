import styles from '../styles/Navigation.module.css'

import {ToolTip, Button} from "@f-ui/core";
import PropTypes from "prop-types";

export default function Navigation(props) {

    return (
        <div className={styles.wrapper}>


            <Button className={styles.button} styles={{color: props.rotations.x ? '#0095ff' : 'white'}}
                    onClick={() => props.setRotations(prevState => {
                        return {...prevState, x: !prevState.x}
                    })}>
                <span className="material-icons-round" style={{transform: 'rotate(270deg)'}}>360</span>
                <ToolTip content={'Rotate X'} align={"middle"} justify={"end"}/>
            </Button>
            <Button
                className={styles.button}
                styles={{color: props.rotations.y ? '#0095ff' : 'white'}}
                onClick={() => props.setRotations(prevState => {
                    return {...prevState, y: !prevState.y}
                })}>
                <span className="material-icons-round">360</span>
                <ToolTip content={'Rotate Y'} align={"middle"} justify={"end"}/>
            </Button>
            <Button className={styles.button} styles={{color: props.rotations.z ? '#0095ff' : 'white'}}
                    onClick={() => props.setRotations(prevState => {
                        return {...prevState, z: !prevState.z}
                    })}>
                <span className="material-icons-round">sync</span>
                <ToolTip content={'Rotate Z'} align={"middle"} justify={"end"}/>
            </Button>
        </div>
    )
}

Navigation.propTypes = {
    rotations: PropTypes.array,
    setRotations: PropTypes.func
}