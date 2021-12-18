import Vector from "./Vector";
import {projectToPlane} from "../utils/projection";
import multiplyByMatrix, {constructMatrix, MatrixMultiplyVector, multiplyByScalar} from "../utils/matrixOperations";
import rotationMatrix from "../utils/rotationMatrix";
import {
    crossProduct,
    dotProduct,
    normalise,
    projectVector,
    scaleIntoView,
    subtractVectors, sumVectors
} from "../utils/vectorOperations";

export default class Triangle {
    vectors = []
    color = 'rgba(0,0,0,0)'

    constructor(vecA, vecB, vecC) {
        this.vectors.push(new Vector(...vecA))
        this.vectors.push(new Vector(...vecB))
        this.vectors.push(new Vector(...vecC))
    }

    draw(ctx, fillColor = [0, 0, 0], strokeColor, engineAttrs, debug) {

        let vecInit = MatrixMultiplyVector(engineAttrs.camera.worldMatrix, this.vectors[0].matrix),
            vecA = MatrixMultiplyVector(engineAttrs.camera.worldMatrix, this.vectors[1].matrix),
            vecB = MatrixMultiplyVector(engineAttrs.camera.worldMatrix, this.vectors[2].matrix)

        let normalA, normalB
        normalA = subtractVectors(vecA, vecInit)
        normalB = subtractVectors(vecB, vecInit)

        let crossP = crossProduct(normalA, normalB)
        crossP = normalise(crossP[0][0], crossP[1][0], crossP[2][0])

        const vCameraRay = subtractVectors(vecA, engineAttrs.camera.vector.matrix)
        const dotProd = dotProduct(crossP, vCameraRay)

        if (dotProd < 0) {
            vecInit = MatrixMultiplyVector(engineAttrs.camera.viewMatrix, vecInit)
            vecA = MatrixMultiplyVector(engineAttrs.camera.viewMatrix, vecA)
            vecB = MatrixMultiplyVector(engineAttrs.camera.viewMatrix, vecB)

            const normalisedLightVec = normalise(engineAttrs.lightSource[0][0], engineAttrs.lightSource[1][0], engineAttrs.lightSource[2][0])
            const dotProdLightVec = dotProduct(crossP, normalisedLightVec)

            ctx.beginPath()
            this._drawVector(vecInit, ctx, 0, engineAttrs)
            this._drawVector(vecA, ctx, 1, engineAttrs)
            this._drawVector(vecB, ctx, 2, engineAttrs)

            if (fillColor !== null && !debug) {
                ctx.fillStyle = `hsl(0, 10%, ${(dotProdLightVec === 0 ? .2 : dotProdLightVec) * 50}%)`
                ctx.fill()
                ctx.strokeStyle = `hsl(0, 10%, ${(dotProdLightVec === 0 ? .2 : dotProdLightVec) * 50}%)`
                ctx.stroke()
            }
            ctx.closePath()
            if (debug) {
                ctx.strokeStyle = 'green'
                ctx.stroke()
            }
        }
    }


    _drawVector(vec, ctx, index, engineAttrs) {
        let scaled, projected = projectVector(vec, engineAttrs)
        scaled = scaleIntoView(projected, ctx.canvas.width, ctx.canvas.height)
        if (index === 0)
            ctx.moveTo(scaled[0][0], scaled[1][0])
        else
            ctx.lineTo(scaled[0][0], scaled[1][0])
    }


    rotate(axis, angle) {
        const rotationM = rotationMatrix(axis, angle)
        this.vectors.forEach((vec) => {
            let newMatrix = MatrixMultiplyVector(rotationM, vec.matrix)
            vec.update(newMatrix[0][0], newMatrix[1][0], newMatrix[2][0])
        })
    }
}