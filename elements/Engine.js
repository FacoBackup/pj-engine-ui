import Vector from "./Vector";

export default class Engine {
    meshes = []
    fieldOfViewAngle = 1.5708/2 // 90 degrees

    constructor(target) {
        this.ctx = target.getContext('2d')
        this.aspectRatio = 1
            // target.height / target.width

        this.fieldOfView = 1 / Math.tan(this.fieldOfViewAngle / 2)

        this.zNear = .01
        this.zFar = 10000

        this.camera = new Vector(target.width , target.height/5, 0)
        this.lightSource = new Vector(target.width / 2, target.height / 2, -1)

        this._updateZProjection()
    }

    _updateZProjection() {
        this.zScale = this.zFar / (this.zFar - this.zNear)
        this.zOffset = ((-this.zFar * this.zNear) / (this.zFar - this.zNear))
    }


    draw(debug) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.meshes.forEach(el => {
            el.draw(this.ctx, {

                fieldOfView: this.fieldOfView,
                aspectRatio: this.aspectRatio,
                zScale: this.zScale,
                zOffset: this.zOffset,
                camera: this.camera.matrix,
                lightSource: this.lightSource.matrix,
            }, debug)
        })
    }
}