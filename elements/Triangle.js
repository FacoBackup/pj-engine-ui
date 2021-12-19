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

    draw(ctx, debug) {

        ctx.beginPath()
        this.vectors.forEach((vec, index) => {

            if (index === 0)
                ctx.moveTo(vec.x, vec.y)
            else
                ctx.lineTo(vec.x, vec.y)
        })
        if (!debug) {
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.strokeStyle = this.color
        } else
            ctx.strokeStyle = 'green'
        ctx.closePath()
        ctx.stroke()
    }


    rotate(axis, angle) {
        const rotationM = rotationMatrix(axis, angle)
        this.vectors.forEach((vec) => {
            let newMatrix = MatrixMultiplyVector(rotationM, vec.matrix)
            vec.update(newMatrix[0][0], newMatrix[1][0], newMatrix[2][0])
        })
    }
}