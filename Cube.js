import {multiply, projectionMatrix, rotationMatrix} from "./matrix";

export default class Cube {
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


    rotate(axis, angle, scale, ctx) {
        const rotationM = rotationMatrix(axis, angle)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        this.vertices = this.vertices.map(v => {
            return multiply(rotationM, [[v[0]], [v[1]], [v[2]]])
        })

        this.draw(ctx)
    }

    _connect(indexA, indexB, projected, ctx, move) {

        if (move)
            ctx.moveTo(projected[indexA][0], projected[indexA][1])
        ctx.lineTo(projected[indexB][0], projected[indexB][1])


    }

    draw(ctx, scale = 1) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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
        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
            this._connect(i, (i + 1) % 4, projectedVertices, ctx, i === 0)

        }
        ctx.stroke()
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
            this._connect(i, i + 4, projectedVertices, ctx, true)
        }
        ctx.stroke()
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
            this._connect(i + 4, (i + 1) % 4 + 4, projectedVertices, ctx, i === 0)
        }
        ctx.stroke()
        ctx.fill()
        ctx.closePath()

    }
}