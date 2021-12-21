import Vector from "./Vector";
import {MatrixMultiplyVector} from "../math/matrixOperations";
import rotationMatrix from "../math/rotationMatrix";
import conf from '../../config.json'

export default class Triangle {
    vectors = []
    color = 'rgba(0,0,0,0)'

    constructor(vecA, vecB, vecC, noColor=false) {
        this.noColor = noColor
        this.vectors.push(new Vector(...vecA))
        this.vectors.push(new Vector(...vecB))
        this.vectors.push(new Vector(...vecC))
    }

    draw(ctx, wireframe, texturing, vertex) {
        if (vertex) {
            this.vectors.forEach((vec, index) => {
                ctx.beginPath()

                ctx.moveTo(vec.x, vec.y)

                ctx.arc(vec.x, vec.y, conf.vertexRadius ? conf.vertexRadius : 2, 0, Math.PI * 2)
                ctx.fillStyle = conf.vertexColor ? conf.vertexColor : 'blue'
                ctx.fill()
            })
        }
        ctx.beginPath()
        this.vectors.forEach((vec, index) => {

            if (index === 0)
                ctx.moveTo(vec.x, vec.y)
            else
                ctx.lineTo(vec.x, vec.y)
        })
        if (texturing && !this.noColor) {
            ctx.fillStyle = this.color
            ctx.fill()
        }
        if (wireframe || this.noColor)
            ctx.strokeStyle = conf.wireframeColor ? conf.wireframeColor : 'green'
        else
            ctx.strokeStyle = this.color
        ctx.closePath()
        if (texturing || wireframe)
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