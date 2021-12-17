import Triangle from "./Triangle";

export default class Mesh {
    triangles = []

    constructor(originX, originY, originZ, size) {
        this.triangles = [
            // SOUTH OK
            new Triangle(
                [originX - size, originY - size, originZ - size], // 0.0f, 0.0f, 0.0f
                [originX - size, originY + size, originZ - size], // 1.0f, 0.0f, 0.0f
                [originX + size, originY + size, originZ - size] // 1.0f, 1.0f, 0.0f
            ),

            new Triangle(
                [originX - size, originY - size, originZ - size], // 1.0f, 0.0f, 0.0f
                [originX + size, originY + size, originZ - size], // 1.0f, 0.0f, 0.0f
                [originX + size, originY - size, originZ - size]// 1.0f, 0.0f, 0.0f
            ),
            // EAST OK
            new Triangle(
                [originX + size, originY - size, originZ - size],
                [originX + size, originY + size, originZ - size],
                [originX + size, originY + size, originZ + size]
            ),
            new Triangle(
                [originX + size, originY - size, originZ - size],
                [originX + size, originY + size, originZ + size],
                [originX + size, originY - size, originZ + size]
            ),
            // NORTH OK
            new Triangle(
                [originX + size, originY - size, originZ + size],
                [originX + size, originY + size, originZ + size],
                [originX - size, originY + size, originZ + size]
            ),

            new Triangle(
                [originX + size, originY - size, originZ + size],
                [originX - size, originY + size, originZ + size],
                [originX - size, originY - size, originZ + size]
            ),
            // WEST OK
            new Triangle(
                [originX - size, originY - size, originZ + size],
                [originX - size, originY + size, originZ + size],
                [originX - size, originY + size, originZ - size]
            ),
            new Triangle(
                [originX - size, originY - size, originZ + size],
                [originX - size, originY + size, originZ - size],
                [originX - size, originY - size, originZ - size]
            ),

            // TOP
            new Triangle(
                [originX - size, originY + size, originZ - size],
                [originX - size, originY + size, originZ + size],
                [originX + size, originY + size, originZ + size]
            ),
            new Triangle(
                [originX - size, originY + size, originZ - size],
                [originX + size, originY + size, originZ + size],
                [originX + size, originY + size, originZ - size]
            ),

            // BOTTOM
            new Triangle(
                [originX + size, originY - size, originZ + size],
                [originX - size, originY - size, originZ + size],
                [originX - size, originY - size, originZ - size]
            ),
            new Triangle(
                [originX + size, originY - size, originZ + size],
                [originX - size, originY - size, originZ - size],
                [originX + size, originY - size, originZ - size]
            )
        ]
    }


    rotate(axis, angle) {
        this.triangles.forEach(tri => {
            tri.rotate(axis, angle)
        })
    }


    draw(ctx, engineAttrs) {
        this.triangles.forEach((tri, i) => {
            tri.draw(ctx, 'rgba(255, 0, 0, .1)', '#333333', engineAttrs)
        })
    }
}