import Vector from "./Vector";
import {projectToPlane, projectVector, scaleIntoView} from "../utils/projection";
import multiplyByMatrix, {multiplyByScalar, sum} from "../utils/matrixOperations";
import rotationMatrix from "../utils/rotationMatrix";
import {adjustToCamera, crossProduct, dotProduct, normalize} from "../utils/vectorOperations";

export default class Triangle {
    vectors = []

    constructor(vecA, vecB, vecC) {
        this.vectors.push(new Vector(...vecA))
        this.vectors.push(new Vector(...vecB))
        this.vectors.push(new Vector(...vecC))
    }

    draw(ctx, fillColor = [0, 0, 0], strokeColor, engineAttrs, debug) {
        let vecA = sum(this.vectors[1].matrix, multiplyByScalar(this.vectors[0].matrix, -1)),
            vecB = sum(this.vectors[2].matrix, multiplyByScalar(this.vectors[0].matrix, -1))

        vecA = normalize(vecA[0][0], vecA[1][0], vecA[2][0])
        vecB = normalize(vecB[0][0], vecB[1][0], vecB[2][0])

        const crossP = crossProduct(vecA, vecB)
        const adjusted = adjustToCamera(this.vectors[0].matrix, engineAttrs.camera)
        const dotProd = dotProduct(crossP, adjusted)
        const normalizedLightVec = normalize(engineAttrs.lightSource[0][0], engineAttrs.lightSource[1][0], engineAttrs.lightSource[2][0])
        const dotProdLightVec = dotProduct(crossP, normalizedLightVec)

        if (dotProd < 0) {
            ctx.beginPath()
            let projected
            this.vectors.forEach((vec, i) => {
                projected = [...vec.matrix]
                projected = projectVector(projected, engineAttrs)

                projected = scaleIntoView(projected[0][0], projected[1][0], projected[2][0], ctx.canvas.width, ctx.canvas.height)

                projected = multiplyByMatrix(projectToPlane(1), projected)

                // projected = vec.matrix
                if (i === 0)
                    ctx.moveTo(projected[0][0], projected[1][0])
                else
                    ctx.lineTo(projected[0][0], projected[1][0])
            })
            if (fillColor !== null) {
                ctx.fillStyle = `rgba(${fillColor[0]},${fillColor[1]},${fillColor[2]},${dotProdLightVec})`
                ctx.fill()
            }


            ctx.closePath()
            if (debug) {
                ctx.strokeStyle = strokeColor
                ctx.stroke()
            }
        }
    }

    rotate(axis, angle) {
        const rotationM = rotationMatrix(axis, angle)
        this.vectors.forEach((vec) => {
            let newMatrix = multiplyByMatrix(rotationM, vec.matrix)

            vec.update(newMatrix[0][0], newMatrix[1][0], newMatrix[2][0])
        })
    }
}