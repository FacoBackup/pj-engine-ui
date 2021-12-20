import {useEffect, useState} from "react";
import RenderingEngine from "../core/elements/RenderingEngine";
import Triangle from "../core/elements/Triangle";
import Mesh from "../core/elements/Mesh";

export default function useMesh(files, target, width, height) {
    const [engine, setEngine] = useState()
    const [data, setData] = useState([])
    const [meshes, setMeshes] = useState([])
    
    useEffect(() => {
        if (target)
            setEngine(new RenderingEngine(target))
    }, [width, height, target])


    useEffect(() => {
        if (engine && data && meshes.length === 0) {
            data.forEach(d => {
                const split = d.split('\n')
                let vertices = [], res = []

                split.forEach(line => {
                    if (line.match(/^v\s(.+)/)) {
                        const v = line.split(/\s/)
                        vertices.push([parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])])
                    } else if (line.match(/^f\s(.+)/)) {
                        const v = line.split(/\s/)
                        res.push(new Triangle(vertices[parseInt(v[1]) - 1],
                            vertices[parseInt(v[2]) - 1],
                            vertices[parseInt(v[3]) - 1]))
                    }
                })


                const newMesh = new Mesh(res)
                setMeshes(prevState => {
                    return [...prevState, newMesh]
                })
                engine.meshes.push(newMesh)
            })
        }
        if (engine && meshes.length > 0 && engine.meshes.length === 0) {
            engine.meshes = meshes

        }
    }, [data, engine, meshes])

    useEffect(() => {
        if (engine)
            engine.meshes = []
        setData([])
        setMeshes([])
        files.forEach(m => {
            fetch(m).then(res => res.text().then(text => setData(prevState => {
                return [...prevState, text]
            })).catch()).catch()
        })

    }, [files, engine])

    return engine
}