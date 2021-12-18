export default class Mesh {
    triangles = []
    constructor(triangles) {
        if (Array.isArray(triangles))
            this.triangles = triangles
    }
    rotate(axis, angle) {
        this.triangles.forEach(tri => {
            tri.rotate(axis, angle)
        })
    }
    draw(ctx, engineAttrs, debug) {
        this.triangles.forEach((tri, i) => {
            tri.draw(ctx, [255, 0, 0], '#333333', engineAttrs, debug)
        })
    }
}