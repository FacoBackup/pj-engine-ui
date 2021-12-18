import {MatrixMultiplyVector} from "../utils/matrixOperations";
import {
    clipAgainstPlane,
    crossProduct,
    dotProduct,
    normalise,
    projectVector, scaleIntoView,
    subtractVectors
} from "../utils/vectorOperations";

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

    _getTrianglesToRaster({camera, lightSource, zNear, fieldOfView, aspectRatio, zScale}, canvasWidth, canvasHeight) {
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
                vecInit = MatrixMultiplyVector(camera.viewMatrix, vecInit)
                vecA = MatrixMultiplyVector(camera.viewMatrix, vecA)
                vecB = MatrixMultiplyVector(camera.viewMatrix, vecB)

                const normalisedLightVec = normalise(lightSource[0][0], lightSource[1][0], lightSource[2][0])
                const dotProdLightVec = dotProduct(crossP, normalisedLightVec)


                this.triangles[current].color = `hsl(0, 10%, ${(dotProdLightVec === 0 ? .2 : dotProdLightVec) * 50}%)`

                const clipped = clipAgainstPlane([[0], [0], [zNear]], [[0], [0], [1]], this.triangles[current])

                for (let currentClipped = 0; currentClipped < clipped.quantity; currentClipped++) {
                    let currentTriangle = clipped.triangles[currentClipped]
                    currentTriangle.vector[0] = scaleIntoView(projectVector(currentTriangle.vector[0], fieldOfView, aspectRatio, zScale, zNear), canvasWidth, canvasHeight)
                    currentTriangle.vector[1] = scaleIntoView(projectVector(currentTriangle.vector[1], fieldOfView, aspectRatio, zScale, zNear), canvasWidth, canvasHeight)
                    currentTriangle.vector[2] = scaleIntoView(projectVector(currentTriangle.vector[2], fieldOfView, aspectRatio, zScale, zNear), canvasWidth, canvasHeight)

                    response.push(currentTriangle)
                }
            }
        }

        return response
    }
    _sortTriangles(triangles){

    }
    draw(ctx, engineAttrs, debug) {
        let toRaster = this._getTrianglesToRaster(engineAttrs, ctx.canvas.width, ctx.canvas.height)
        toRaster = this._sortTriangles(toRaster)
        // this.triangles.forEach((tri, i) => {
        //     tri.draw(ctx, [255, 0, 0], '#333333', engineAttrs, debug)
        // })
    }
}