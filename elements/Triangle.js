import Vector from "./Vector";
import {projectToPlane, projectVector, scaleIntoView} from "../utils/projection";
import multiply from "../utils/matrixMultiply";
import rotationMatrix from "../utils/rotationMatrix";

export default class Triangle {
    vectors = []

    constructor(vecA, vecB, vecC) {
        this.vectors.push(new Vector(...vecA))
        this.vectors.push(new Vector(...vecB))
        this.vectors.push(new Vector(...vecC))
    }

    draw(ctx, fillColor = null, strokeColor, engineAttrs) {
        let projected
        ctx.beginPath()

        this.vectors.forEach((vec, i) => {
            projected = [...vec.matrix]
            projected = projectVector(projected, engineAttrs)

            projected = scaleIntoView(projected[0][0], projected[1][0], projected[2][0], ctx.canvas.width, ctx.canvas.height)

            projected = multiply(projectToPlane(1), projected)

            // projected = vec.matrix
            if (i === 0)
                ctx.moveTo(projected[0][0], projected[1][0])
            else
                ctx.lineTo(projected[0][0], projected[1][0])
        })
        if (fillColor !== null) {
            ctx.fillStyle = fillColor
            ctx.fill()
        }
        ctx.strokeStyle = strokeColor

        ctx.closePath()
        ctx.stroke()
    }

    rotate(axis, angle) {
        const rotationM = rotationMatrix(axis, angle)
        this.vectors.forEach((vec) => {
            let newMatrix = multiply(rotationM, vec.matrix)

            vec.update(newMatrix[0][0], newMatrix[1][0], newMatrix[2][0])
        })
    }
}