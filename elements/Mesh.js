
import projectionMatrix from "../utils/projectionMatrix";
import rotationMatrix from "../utils/rotationMatrix";
import multiply from "../utils/matrixMultiply";

export default class Mesh {
    vertices = []

    constructor(originX, originY, originZ, size) {
        this.vertices = [
            [originX - size, originY - size, originZ - size],
            [originX + size, originY - size, originZ - size],
            [originX + size, originY + size, originZ - size],
            [originX - size, originY + size, originZ - size],
            [originX - size, originY - size, originZ + size],
            [originX + size, originY - size, originZ + size],
            [originX + size, originY + size, originZ + size],
            [originX - size, originY + size, originZ + size],
        ]
    }


    rotate(axis, angle, scale) {
        const rotationM = rotationMatrix(axis, angle)
        this.vertices = this.vertices.map(v => {
            return multiply(rotationM, [[v[0]], [v[1]], [v[2]]])
        })
    }

    _connect(indexA, indexB, projected, ctx) {

        ctx.beginPath()
            ctx.moveTo(projected[indexA][0], projected[indexA][1])
        ctx.lineTo(projected[indexB][0], projected[indexB][1])
        ctx.fillStyle = 'red'
        ctx.stroke()
        ctx.fill()
        ctx.closePath()

    }

    draw(ctx, scale = 1) {
        let projectedVertices = []
        this.vertices.forEach(v => {
            const projected = multiply(projectionMatrix(scale), [[v[0]], [v[1]], [v[2]]])
            ctx.fillStyle = 'red'
            ctx.beginPath()
            ctx.moveTo(projected[0], projected[1])
            ctx.arc(projected[0], projected[1], 4, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
            projectedVertices.push(projected)
        })
        ctx.fillStyle = 'rgba(255, 0, 0, .3)'

        for (let i = 0; i < 4; i++) {
            this._connect(i, (i + 1) % 4, projectedVertices, ctx, i === 0)
            this._connect(i, i + 4, projectedVertices, ctx, true)
            this._connect(i + 4, (i + 1) % 4 + 4, projectedVertices, ctx, i === 0)
        }



    }
}