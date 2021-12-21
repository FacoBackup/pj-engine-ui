import trianglesToRaster from "../helpers/trianglesToRaster";
import {clipAgainstPlane} from "../helpers/clippingHandler";

export default class Mesh {
    triangles = []

    constructor(triangles) {
        if (Array.isArray(triangles))
            this.triangles = triangles
    }

    rotate(axis, angle) {

        this.triangles.forEach(tri => {
            tri.rotate(axis, angle)
        })
    }

    draw(ctx, engineAttrs, wireframe, texturing, shading, vertex, callback) {
        const sortTriangles = (triangleA, triangleB) => {
            let z1 = Math.abs(triangleA.vectors[0].z + triangleA.vectors[1].z + triangleA.vectors[2].z) / 3
            let z2 = Math.abs((triangleB.vectors[0].z + triangleB.vectors[1].z + triangleB.vectors[2].z)) / 3

            if (z1 < z2) {
                return -1;
            }
            if (z2 > z1) {
                return 1;
            }
            return 0;
        }

        const startTriangleMapping = performance.now()
        let toRaster = trianglesToRaster(engineAttrs, ctx.canvas.width, ctx.canvas.height, shading, this.triangles)
        const endTriangleMapping = performance.now()

        const startSort = performance.now()
        toRaster = toRaster.sort(sortTriangles)
        const endSort = performance.now()

        let pInt = 0, startDrawing = 0, endDrawing = 0, startClipping = 0, endClipping = 0
        for (let current = 0; current < toRaster.length; current++) {
            let listTriangles = []

            listTriangles.push(toRaster[current])
            let nNewTriangles = 1;
            startClipping = performance.now()
            for (pInt = 0; pInt < 4; pInt++) {

                let nTrisToAdd = {quantity: 0, triangles: []}
                while (nNewTriangles > 0) {
                    let test = listTriangles[listTriangles.length - 1];

                    listTriangles.pop();
                    nNewTriangles--;
                    switch (pInt) {
                        case 0: {
                            nTrisToAdd = clipAgainstPlane(
                                [[0], [0], [0]],
                                [[0], [1], [0]],
                                test)

                            break
                        }
                        case 1: {
                            nTrisToAdd = clipAgainstPlane(
                                [[1], [ctx.canvas.height - 1], [0]],
                                [[0], [-1], [0]],
                                test)
                            break
                        }
                        case 2: {
                            nTrisToAdd = clipAgainstPlane(
                                [[0], [0], [0]],
                                [[1], [0], [0]],
                                test)
                            break
                        }
                        case 3: {
                            nTrisToAdd = clipAgainstPlane(
                                [[ctx.canvas.width - 1], [0], [0]],
                                [[-1], [0], [0]],
                                test
                            )
                            break
                        }
                        default:
                            break
                    }

                    for (let w = 0; w < nTrisToAdd.quantity; w++)
                        listTriangles.push(nTrisToAdd.triangles[w]);
                }

                nNewTriangles = listTriangles.length;
            }
            endClipping = performance.now()
            startDrawing = performance.now()
            listTriangles.forEach(tri => {
                tri.draw(ctx, wireframe, texturing, vertex)
            })
            endDrawing = performance.now()
        }

        callback({
            drawing: endDrawing - startDrawing,
            sort: endSort - startSort,
            mapping: endTriangleMapping - startTriangleMapping,
            clipping: endClipping - startClipping
        })
    }
}