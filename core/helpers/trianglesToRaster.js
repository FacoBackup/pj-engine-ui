import {MatrixMultiplyVector} from "../math/matrixOperations";
import {
    crossProduct,
    dotProduct,
    normalise,
    projectVector,
    scaleIntoView,
    subtractVectors
} from "../math/vectorOperations";
import Triangle from "../elements/Triangle";
import Vector from "../elements/Vector";
import {clipAgainstPlane} from "./clippingHandler";

function adjustTriangle(worldMatrix, viewMatrix, tri, dotProdLightVec, fieldOfView, aspectRatio, zScale, zOffset, canvasWidth, canvasHeight) {
    let updatedA = scaleIntoView(projectVector(tri.vectors[0].matrix, fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight),
        updatedB = scaleIntoView(projectVector(tri.vectors[1].matrix, fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight),
        updatedC = scaleIntoView(projectVector(tri.vectors[2].matrix, fieldOfView, aspectRatio, zScale, zOffset), canvasWidth, canvasHeight)
    tri.vectors[0] = new Vector(updatedA[0][0], updatedA[1][0], updatedA[2][0])
    tri.vectors[1] = new Vector(updatedB[0][0], updatedB[1][0], updatedB[2][0])
    tri.vectors[2] = new Vector(updatedC[0][0], updatedC[1][0], updatedC[2][0])
    return tri
}

export default function trianglesToRaster({
                                              camera,
                                              lightSource,
                                              zNear,
                                              fieldOfView,
                                              aspectRatio,
                                              zScale,
                                              zOffset
                                          },
                                          canvasWidth,
                                          canvasHeight,
                                          shading,
                                          triangles) {
    let response = []
    for (let current = 0; current < triangles.length; current++) {

        let vecInit = MatrixMultiplyVector(camera.worldMatrix, triangles[current].vectors[0].matrix),
            vecA = MatrixMultiplyVector(camera.worldMatrix, triangles[current].vectors[1].matrix),
            vecB = MatrixMultiplyVector(camera.worldMatrix, triangles[current].vectors[2].matrix)

        let normalA, normalB
        normalA = subtractVectors(vecA, vecInit)
        normalB = subtractVectors(vecB, vecInit)

        let crossP = crossProduct(normalA, normalB)
        crossP = normalise(crossP[0][0], crossP[1][0], crossP[2][0])

        const vCameraRay = subtractVectors(vecInit, camera.vector.matrix)
        const dotProd = dotProduct(crossP, vCameraRay)

        if (dotProd < 0) {
            const normalisedLightVec = normalise(lightSource[0][0], lightSource[1][0], lightSource[2][0])
            const dotProdLightVec = Math.max(.1, dotProduct(crossP, normalisedLightVec))

            vecInit = MatrixMultiplyVector(camera.viewMatrix, vecInit)
            vecA = MatrixMultiplyVector(camera.viewMatrix, vecA)
            vecB = MatrixMultiplyVector(camera.viewMatrix, vecB)

            let newTri = new Triangle([vecInit[0][0], vecInit[1][0], vecInit[2][0]], [vecA[0][0], vecA[1][0], vecA[2][0]], [vecB[0][0], vecB[1][0], vecB[2][0]], triangles[current].noColor)
            newTri.color = `hsl(0, 10%, ${shading ? ((Math.abs(dotProdLightVec).toFixed(2) * 50)) : 50}%)`

            const clipped = clipAgainstPlane([[0], [0], [zNear], [0]], [[0], [0], [1], [0]], newTri)
            for (let currentClipped = 0; currentClipped < clipped.quantity; currentClipped++) {
                response.push(adjustTriangle(camera.worldMatrix, camera.viewMatrix, clipped.triangles[currentClipped], dotProdLightVec, fieldOfView, aspectRatio, zScale, zOffset, canvasWidth, canvasHeight))
            }
        }
    }

    return response
}