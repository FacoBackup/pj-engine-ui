import styles from '../styles/Navigation.module.css'

import {ToolTip, Button} from "@f-ui/core";
import PropTypes from "prop-types";
import {useState} from "react";

export default function Navigation(props) {
    const [hidden, setHidden] = useState(false)
    return (
        <div className={styles.wrapper} style={{right: hidden ? '-35px' : undefined}}>
            <Button className={styles.button}
                    styles={{
                        position: hidden ? 'absolute' : undefined,
                        left: hidden ? '-100%' : undefined,
                        background: hidden ? 'rgba(0,0,0,.5)' : undefined,
                        borderRadius: hidden ? '50%' : undefined,
                        width: hidden ? '30px' : '35px',
                        height: hidden ? '30px' : '35px'
                    }}
                    onClick={() => setHidden(!hidden)}>
                <span className="material-icons-round">{hidden ? 'chevron_left' : 'chevron_right'}</span>
                <ToolTip content={'Show options'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button} styles={{color: props.wireframeMode ? '#0095ff' : undefined}}
                    onClick={() => props.setWireframeMode(!props.wireframeMode)}>
                <span className="material-icons-round"
                      style={{transform: 'rotate(45deg)', fontSize: '1.2rem'}}>grid_4x4</span>
                <ToolTip content={'Wireframe'} align={"middle"} justify={"start"}/>
            </Button>

            <Button className={styles.button} styles={{color: props.texturing ? '#0095ff' : undefined}}
                    onClick={() => props.setTexturing(!props.texturing)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>texture</span>
                <ToolTip content={'Textures'} align={"middle"} justify={"start"}/>
            </Button>

            <Button className={styles.button}
                    styles={{color: props.shading && props.texturing ? '#0095ff' : undefined}}
                    onClick={() => props.setShading(!props.shading)}
                    disabled={!props.texturing}>
                <span className="material-icons-round">blur_on</span>
                <ToolTip content={'Shading'} align={"middle"} justify={"start"}/>
            </Button>
            <Button className={styles.button}
                    styles={{color: props.vertexVisible ? '#0095ff' : undefined}}
                    onClick={() => props.setVertexVisible(!props.vertexVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>grain</span>
                <ToolTip content={'Show vertexes'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button}
                    onClick={() => props.setFpsVisible(!props.fpsVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>speed</span>
                <ToolTip content={'Show FPS'} align={"middle"} justify={"start"}/>
            </Button>
            <Button className={styles.button}
                    onClick={() => props.setTpfVisible(!props.tpfVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>timer</span>
                <ToolTip content={'Show time per frame'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button}
                    onClick={() => props.setVertexVisible(!props.vertexVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>center_focus_weak</span>
                <ToolTip content={'Center camera'} align={"middle"} justify={"start"}/>
            </Button>
        </div>
    )
}

Navigation.propTypes = {
    wireframeMode: PropTypes.func,
    setWireframeMode: PropTypes.func,
    vertexVisible: PropTypes.func,
    setVertexVisible: PropTypes.func,
    shading: PropTypes.func,
    setShading: PropTypes.func,
    texturing: PropTypes.func,
    setTexturing: PropTypes.func,

    fpsVisible: PropTypes.bool,
    setFpsVisible: PropTypes.func,
    tpfVisible: PropTypes.bool,
    setTpfVisible: PropTypes.func
}