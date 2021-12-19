import styles from "../../styles/Canvas.module.css";

export default function profiler({
                                     milliseconds,
                                     engine,
                                     fps,
                                     performanceData
                                 }) {


    const triangles = engine.meshes.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.triangles.length
    }, 0)
    const vertices = engine.meshes.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.triangles.reduce((acc, curr) => {
            return acc += curr.vectors.length
        }, 0)
    }, 0)

    let toRender = ''

    toRender += `<div title="${fps < 30 ? 'Poor' : fps >= 30 && fps < 60 ? 'Acceptable' : 'Ideal'}" data-poor="${fps < 30}" data-ok="${fps >= 30 && fps < 60}" data-ideal="${fps >= 60}"  class="${styles.fpsCounter}" >${fps} Frames per second</div>`

    toRender += `<div class="${styles.dataIndicator}"  title="Triangles">${triangles} Triangles</div>`

    toRender += `<div  class="${styles.dataIndicator}" title="Vertices">${vertices} Vertices</div>`


    toRender += `<div  class="${styles.dataIndicator}" title="Drawcall processing time">${milliseconds?.toFixed(2)} ms</div>`

    toRender += `<div class="${styles.dataIndicator}" title="Mapping">${performanceData.mapping?.toFixed(2)} Triangle mapping</div>`

    toRender += `<div  class="${styles.dataIndicator}" title="Triangles sort">${performanceData.sort?.toFixed(2)} Triangle sorting</div>`

    toRender += `<div class="${styles.dataIndicator}"  title="Mesh clipping">${performanceData.clipping?.toFixed(2)} Mesh clipping</div>`

    toRender += `<div  class="${styles.dataIndicator}" title="Mesh drawing">${performanceData.drawing?.toFixed(2)} Mesh drawing</div>`

    return toRender
}