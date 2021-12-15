import {multiply, PROJECTION_MATRIX, rotationMatrix} from "./matrix";

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


    rotate(axis, angle, ctx) {
        const rotationM = rotationMatrix(axis, angle)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        this.vertices = this.vertices.map(v => {
            return multiply(rotationM, [[v[0]], [v[1]], [v[2]]])
        })

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        let projectedVertices = []
        this.vertices.forEach(v => {
            const projected = multiply(PROJECTION_MATRIX, [[v[0]], [v[1]], [v[2]]])
            ctx.fillStyle = 'red'
            ctx.beginPath()
            ctx.moveTo(projected[0], projected[1])
            ctx.arc(projected[0], projected[1], 4, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
            projectedVertices.push(projected)
        })

        projectedVertices.forEach((p, i) => {
            ctx.beginPath()
            if (i > 0)
                ctx.moveTo(projectedVertices[i - 1][0], projectedVertices[i - 1][1])
            ctx.lineTo(p[0], p[1])

            ctx.stroke()
            ctx.closePath()

            projectedVertices.forEach(pe => {
                ctx.beginPath()

                ctx.moveTo(p[0], p[1])

                ctx.lineTo(pe[0], pe[1])

                ctx.stroke()
                ctx.closePath()

            })
        })
    }
}