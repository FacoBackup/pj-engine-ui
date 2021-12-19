import {useEffect, useState} from "react";
import Engine from "../elements/Engine";
import Triangle from "../elements/Triangle";
import Mesh from "../elements/Mesh";

export default function useMesh(filePath, target, width, height) {
    const [engine, setEngine] = useState()
    const [data, setData] = useState()
    const [mesh, setMesh] = useState()
    useEffect(() => {
        if (target)
            setEngine(new Engine(target))
    }, [width, height, target])

    useEffect(() => {
        let m = mesh
        if (engine && data && !m) {
            const split = data.split('\n')
            let vertices = []
            let triangles = [], res = []

            split.forEach(line => {
                if (line.match(/^v\s(.+)/)) {
                    const v = line.split(/\s/)
                    vertices.push([parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])])
                } else if (line.match(/^f\s(.+)/)) {
                    const v = line.split(/\s/)
                    triangles.push({vecA: parseInt(v[1]) - 1, vecB: parseInt(v[2]) - 1, vecC: parseInt(v[3]) - 1})
                }
            })

            triangles.forEach(tri => {
                if (vertices[tri.vecA] && vertices[tri.vecB] && vertices[tri.vecC])
                    res.push(new Triangle(vertices[tri.vecA], vertices[tri.vecB], vertices[tri.vecC]))
            })

            m = new Mesh(res)
            setMesh(m)
            engine.meshes.push(m)
            engine.draw()
        }
        if (engine && m && engine.meshes.length === 0) {
            engine.meshes.push(m)
            engine.draw()
        }
    }, [data, engine, mesh])
    useEffect(() => {
        fetch(filePath).then(res => res.text().then(text => setData(text)).catch()).catch()
    }, [])

    return engine
}