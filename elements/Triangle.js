import Vector from "./Vector";
import {projectToPlane, projectVector, scaleIntoView} from "../utils/projection";
import multiplyByMatrix, {multiplyByScalar, sum} from "../utils/matrixOperations";
import rotationMatrix from "../utils/rotationMatrix";
import {adjustToCamera, crossProduct, dotProduct, normalize, sumVectors} from "../utils/vectorOperations";

export default class Triangle {
    vectors = []

    constructor(vecA, vecB, vecC) {
        this.vectors.push(new Vector(...vecA))
        this.vectors.push(new Vector(...vecB))
        this.vectors.push(new Vector(...vecC))
    }

    draw(ctx, fillColor = [0, 0, 0], strokeColor, engineAttrs, debug) {

        let vecInit = [[this.vectors[0].x], [this.vectors[0].y], [this.vectors[0].z + 8]],
            vecA = [[this.vectors[1].x], [this.vectors[1].y], [this.vectors[1].z + 8]],
            vecB = [[this.vectors[2].x], [this.vectors[2].y], [this.vectors[2].z + 8]]
        //
        // vecInit = adjustToCamera(vecInit, engineAttrs.camera.vector.matrix)
        // vecA = adjustToCamera(vecA, engineAttrs.camera.vector.matrix)
        // vecB = adjustToCamera(vecB, engineAttrs.camera.vector.matrix)

        let normalA, normalB
        normalA = sum(vecA, multiplyByScalar(vecInit, -1))
        normalB = sum(vecB, multiplyByScalar(vecInit, -1))

        let crossP = crossProduct(normalA, normalB)

        crossP = normalize(crossP[0][0], crossP[1][0], crossP[2][0])


        const dotProd = dotProduct(crossP, vecInit)

        const normalizedLightVec = normalize(engineAttrs.lightSource[0][0], engineAttrs.lightSource[1][0], engineAttrs.lightSource[2][0])
        const dotProdLightVec = dotProduct(crossP, normalizedLightVec)

        if (dotProd < 0) {
            ctx.beginPath()
            this._draw_vector(vecInit, ctx, 0, engineAttrs)
            this._draw_vector(vecA, ctx, 1, engineAttrs)
            this._draw_vector(vecB, ctx, 2, engineAttrs)

            if (fillColor !== null) {
                ctx.fillStyle = `hsl(0, 100%, ${50 + (dotProdLightVec) * 50}%)`
                ctx.fill()
            }


            ctx.closePath()
            if (debug) {
                ctx.strokeStyle = 'green'
                ctx.stroke()
            }
        }
    }

    _draw_vector(vec, ctx, index, engineAttrs) {

        let viewed = vec,
                // multiplyByMatrix(engineAttrs.camera.viewMatrix, [...vec, [1]]),
            projected,
            scaled
        // viewed.pop()

        projected = projectVector(viewed, engineAttrs)
        scaled = scaleIntoView(projected[0][0], projected[1][0], projected[2][0], ctx.canvas.width, ctx.canvas.height)

        scaled = multiplyByMatrix(projectToPlane(1), scaled)

        if (index === 0)
            ctx.moveTo(scaled[0][0], scaled[1][0])
        else
            ctx.lineTo(scaled[0][0], scaled[1][0])
    }

    rotate(axis, angle) {
        const rotationM = rotationMatrix(axis, angle)
        this.vectors.forEach((vec) => {
            let newMatrix = multiplyByMatrix(rotationM, vec.matrix)

            vec.update(newMatrix[0][0], newMatrix[1][0], newMatrix[2][0])
        })
    }
}