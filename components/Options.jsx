import styles from '../styles/Options.module.css'

import {Button, ToolTip} from "@f-ui/core";
import PropTypes from "prop-types";
import {useState} from "react";

export default function Options(props) {
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
                        height: hidden ? '30px' : '35px',
                        color: 'white'
                    }}
                    onClick={() => setHidden(!hidden)}>
                <span className="material-icons-round">{hidden ? 'chevron_left' : 'chevron_right'}</span>
                <ToolTip content={'Show options'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button} styles={{color: props.wireframeMode ? '#0095ff' : 'white'}}
                    onClick={() => props.setWireframeMode(!props.wireframeMode)}>
                <span className="material-icons-round"
                      style={{transform: 'rotate(45deg)', fontSize: '1.2rem'}}>grid_4x4</span>
                <ToolTip content={'Wireframe'} align={"middle"} justify={"start"}/>
            </Button>

            <Button className={styles.button} styles={{color: props.texturing ? '#0095ff' : 'white'}}
                    onClick={() => props.setTexturing(!props.texturing)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>texture</span>
                <ToolTip content={'Textures'} align={"middle"} justify={"start"}/>
            </Button>

            <Button className={styles.button}
                    styles={{color: props.shading && props.texturing ? '#0095ff' : 'white'}}
                    onClick={() => props.setShading(!props.shading)}
                    disabled={!props.texturing}>
                <span className="material-icons-round">blur_on</span>
                <ToolTip content={'Shading'} align={"middle"} justify={"start"}/>
            </Button>
            <Button className={styles.button} styles={{color: props.visibleClipping ? '#0095ff' : 'white'}}
                    onClick={() => props.setVisibleClipping(!props.visibleClipping)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>details</span>
                <ToolTip content={'Visible clipping'} align={"middle"} justify={"start"}/>
            </Button>

            <Button className={styles.button}
                    styles={{color: props.vertexVisible ? '#0095ff' : 'white'}}
                    onClick={() => props.setVertexVisible(!props.vertexVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>grain</span>
                <ToolTip content={'Show vertices'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button} disabled={true}
                    onClick={() => props.setFpsVisible(!props.fpsVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>speed</span>
                <ToolTip content={'Show FPS'} align={"middle"} justify={"start"}/>
            </Button>
            <Button className={styles.button} disabled={true}
                    onClick={() => props.setTpfVisible(!props.tpfVisible)}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>timer</span>
                <ToolTip content={'Show time per frame'} align={"middle"} justify={"start"}/>
            </Button>
            <div className={styles.divider}/>
            <Button className={styles.button}
                    disabled={true}
                    onClick={() => null}>
                <span className="material-icons-round" style={{fontSize: '1.2rem'}}>center_focus_weak</span>
                <ToolTip content={'Center camera'} align={"middle"} justify={"start"}/>
            </Button>
        </div>
    )
}

Options.propTypes = {
    visibleClipping: PropTypes.bool,
    setVisibleClipping: PropTypes.func,
    wireframeMode: PropTypes.bool,
    setWireframeMode: PropTypes.func,
    vertexVisible: PropTypes.bool,
    setVertexVisible: PropTypes.func,
    shading: PropTypes.bool,
    setShading: PropTypes.func,
    texturing: PropTypes.bool,
    setTexturing: PropTypes.func,

    fpsVisible: PropTypes.bool,
    setFpsVisible: PropTypes.func,
    tpfVisible: PropTypes.bool,
    setTpfVisible: PropTypes.func
}