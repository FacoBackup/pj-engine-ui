import Vector from "./Vector";
import Camera from "./Camera";

export default class Engine {
    meshes = []
    fieldOfViewAngle = 1.5708/2 // 90 degrees
    camera = new Camera(0, 0, 0)
    constructor(target) {
        this.ctx = target.getContext('2d')
        this.aspectRatio = 1 // target.height / target.width

        this.fieldOfView = 1 / Math.tan(this.fieldOfViewAngle / 2)

        this.zNear = .01
        this.zFar = 10000

        this.lightSource = new Vector(0, 0, -1)

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
                camera: this.camera,
                lightSource: this.lightSource.matrix,
            }, debug)
        })
    }
}