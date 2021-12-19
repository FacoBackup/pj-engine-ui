import styles from "../styles/Canvas.module.css";

export default function profiler({
                                     milliseconds,
                                     framerate,
                                     triangleCount,
                                     verticesCount,
                                     engine,
                                     fps,
                                     performanceMetrics,
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

    if (framerate)
        toRender += `<div title="${fps < 30 ? 'Poor' : fps >= 30 && fps < 60 ? 'Acceptable' : 'Ideal'}" data-poor="${fps < 30}" data-ok="${fps >= 30 && fps < 60}" data-ideal="${fps >= 60}"  class="${styles.fpsCounter}" >${fps} Frames per second</div>`
    if (triangleCount)
        toRender += `<div class="${styles.dataIndicator}"  title="Triangles">${triangles} Triangles</div>`
    if (verticesCount)
        toRender += `<div  class="${styles.dataIndicator}" title="Vertices">${vertices} Vertices</div>`

    if (performanceMetrics) {
        toRender += `<div  class="${styles.dataIndicator}" title="Drawcall processing time">${milliseconds?.toFixed(2)} ms</div>`

        toRender += `<div class="${styles.dataIndicator}" title="Mapping">${performanceData.mapping?.toFixed(2)} Triangle mapping</div>`

        toRender += `<div  class="${styles.dataIndicator}" title="Triangles sort">${performanceData.sort?.toFixed(2)} Triangle sorting</div>`

        toRender += `<div class="${styles.dataIndicator}"  title="Mesh clipping">${performanceData.clipping?.toFixed(2)} Mesh clipping</div>`

        toRender += `<div  class="${styles.dataIndicator}" title="Mesh drawing">${performanceData.drawing?.toFixed(2)} Mesh drawing</div>`
    }
    return toRender
}