import Vector from "./Vector";

export default class Engine {
    meshes = []
    aspectRatio = 0
    origin = new Vector(0, 0, 0)
    fieldOfView = 0
    fieldOfViewAngle = 1.5708 // 90 degrees
    zNear = 0
    zFar = 0
    zScale = 0
    zOffset = 0

    constructor(target) {
        this.ctx = target.getContext('2d')
        this.aspectRatio = target.height / target.width
        this.origin.x = target.width / 2
        this.origin.y = target.height / 2

        this.fieldOfView = 1 / Math.tan(this.fieldOfViewAngle / 2)

        this.zNear = .01
        this.zFar = 100000

        this._updateZProjection()
    }

    _updateZProjection() {
        this.zScale = this.zFar / (this.zFar - this.zNear)
        this.zOffset =(( -this.zFar * this.zNear) / (this.zFar - this.zNear))
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.meshes.forEach(el => {
            el.draw(this.ctx, {
                fieldOfView: this.fieldOfView,
                aspectRatio: this.aspectRatio,
                zScale: this.zScale,
                zOffset: this.zOffset
            })
        })
    }
}