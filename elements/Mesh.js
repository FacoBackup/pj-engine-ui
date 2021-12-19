import {MatrixMultiplyVector} from "../math/matrixOperations";
import {
    clipAgainstPlane,
    crossProduct,
    dotProduct,
    normalise,
    projectVector,
    scaleIntoView,
    subtractVectors
} from "../math/vectorOperations";
import Triangle from "./Triangle";

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

    _adjustTriangle(worldMatrix, viewMatrix, tri, dotProdLightVec, fieldOfView, aspectRatio, zScale, zOffset, canvasWidth, canvasHeight) {
        let updatedA = scaleIntoView(projectVector(MatrixMultiplyVector(viewMatrix, MatrixMultiplyVector(worldMatrix, tri.vectors[0].matrix)), fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight),
            updatedB = scaleIntoView(projectVector(MatrixMultiplyVector(viewMatrix, MatrixMultiplyVector(worldMatrix,  tri.vectors[1].matrix)), fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight),
            updatedC = scaleIntoView(projectVector(MatrixMultiplyVector(viewMatrix,  MatrixMultiplyVector(worldMatrix, tri.vectors[2].matrix)), fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight)
        let currentTriangle = new Triangle([updatedA[0][0], updatedA[1][0], updatedA[2][0]], [updatedB[0][0], updatedB[1][0], updatedB[2][0]], [updatedC[0][0], updatedC[1][0], updatedC[2][0]])

        currentTriangle.color = `hsl(0, 10%, ${dotProdLightVec <= 0 ? '10' : (dotProdLightVec * 50)}%)`

        return currentTriangle
    }

    _getTrianglesToRaster({
                              camera,
                              lightSource,
                              zNear,
                              fieldOfView,
                              aspectRatio,
                              zScale,
                              zOffset
                          }, canvasWidth, canvasHeight) {
        let response = []
        for (let current = 0; current < this.triangles.length; current++) {

            let vecInit = MatrixMultiplyVector(camera.worldMatrix, this.triangles[current].vectors[0].matrix),
                vecA = MatrixMultiplyVector(camera.worldMatrix, this.triangles[current].vectors[1].matrix),
                vecB = MatrixMultiplyVector(camera.worldMatrix, this.triangles[current].vectors[2].matrix)

            let normalA, normalB
            normalA = subtractVectors(vecA, vecInit)
            normalB = subtractVectors(vecB, vecInit)

            let crossP = crossProduct(normalA, normalB)
            crossP = normalise(crossP[0][0], crossP[1][0], crossP[2][0])

            const vCameraRay = subtractVectors(vecA, camera.vector.matrix)
            const dotProd = dotProduct(crossP, vCameraRay)

            if (dotProd < 0) {
                const normalisedLightVec = normalise(lightSource[0][0], lightSource[1][0], lightSource[2][0])
                const dotProdLightVec = dotProduct(crossP, normalisedLightVec)
                response.push(this._adjustTriangle(camera.worldMatrix, camera.viewMatrix, this.triangles[current], dotProdLightVec, fieldOfView, aspectRatio, zScale, zOffset, canvasWidth, canvasHeight))
                // const clipped = clipAgainstPlane([[0], [0], [zNear], [1]], [[0], [0], [1], [1]], this.triangles[current])
                // for (let currentClipped = 0; currentClipped < clipped.quantity; currentClipped++) {
                //     response.push(this._adjustTriangle(camera.worldMatrix, camera.viewMatrix, clipped.triangles[currentClipped], dotProdLightVec, fieldOfView, aspectRatio, zScale, zOffset, canvasWidth, canvasHeight))
                // }
            }
        }

        return response
    }

    draw(ctx, engineAttrs, debug) {
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

        let toRaster = this._getTrianglesToRaster(engineAttrs, ctx.canvas.width, ctx.canvas.height)

        toRaster = toRaster.sort(sortTriangles)
        let pInt = 0
        for (let current = 0; current < toRaster.length; current++) {
            let listTriangles = []

            listTriangles.push(toRaster[current])
            let nNewTriangles = 1;

            // for(pInt = 0; pInt < 4; pInt++){
            //
            //     let nTrisToAdd = {quantity: 0, triangles: []}
            //     if(listTriangles.length > 0)
            //     while (nNewTriangles > 0) {
            //         let test = listTriangles[listTriangles.length - 1];
            //
            //         listTriangles.pop();
            //         nNewTriangles--;
            //         switch (pInt) {
            //             case 0: {
            //                 nTrisToAdd = clipAgainstPlane(
            //                     [[0], [0], [0]],
            //                     [[0], [1], [0]],
            //                     test)
            //                 break
            //             }
            //             case 1: {
            //                 nTrisToAdd = clipAgainstPlane(
            //                     [[1], [ctx.canvas.height - 1], [0]],
            //                     [[0], [-1], [0]],
            //                     test)
            //
            //                 break
            //             }
            //             case 2: {
            //                 nTrisToAdd = clipAgainstPlane(
            //                     [[0], [0], [0]],
            //                     [[1], [0], [0]],
            //                     test)
            //                 break
            //             }
            //             case 3: {
            //                 nTrisToAdd = clipAgainstPlane(
            //                     [[ctx.canvas.width - 1], [0], [0]],
            //                     [[-1],[ 0], [0]],
            //                     test
            //                 )
            //                 break
            //             }
            //             default:
            //                 break
            //         }
            //
            //         for (let w = 0; w < nTrisToAdd.quantity; w++)
            //             listTriangles.push(nTrisToAdd.triangles[w]);
            //     }
            //
            //     nNewTriangles = listTriangles.length;
            // }

            listTriangles.forEach(tri => {
                tri.draw(ctx, debug)
            })
        }
    }
}