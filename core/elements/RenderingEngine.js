import Vector from "./Vector";

export default class RenderingEngine {
    meshes = []
    fieldOfViewAngle = 1.5708 / 2 // 90 degrees
    camera = undefined
    currentFrame = 0

    constructor(target) {
        this.ctx = target.getContext('2d')
        this.aspectRatio = 1 // target.height / target.width

        this.fieldOfView = 1 / Math.tan(this.fieldOfViewAngle / 2)

        this.zNear = .001
        this.zFar = 10000

        this.lightSource = new Vector(0, 0, -1)

        this._updateZProjection()
    }

    _updateZProjection() {
        this.zScale = this.zFar / (this.zFar - this.zNear)
        this.zOffset = ((-this.zFar * this.zNear) / (this.zFar - this.zNear))
    }

    executeDebug(
        shading,
        wireframeMode,
        texturing,
        rotations,
        vertex
    ) {
        let times = [], fps, performanceMetrics = {}

        const execDebug = (t) => {
            let start = performance.now()
            if (rotations.x || rotations.y || rotations.z) {
                this.meshes.forEach(el => {
                    if (rotations.x)
                        el.rotate('x', rotations.angle)
                    if (rotations.y)
                        el.rotate('y', rotations.angle)
                    if (rotations.z)
                        el.rotate('z', rotations.angle)
                })
            }
            this.draw(wireframeMode, texturing, shading, vertex, perf => performanceMetrics = perf)

            while (times.length > 0 && times[0] <= start - 1000) {
                times.shift();
            }
            times.push(start);
            fps = times.length;
            this.currentFrame = requestAnimationFrame(execDebug);
        }

        this.currentFrame = requestAnimationFrame(execDebug);
    }

    executeProd() {
        const exec = (t) => {
            this.draw()
            this.currentFrame = requestAnimationFrame(exec);
        }
        this.currentFrame = requestAnimationFrame(exec);
    }

    draw(wireframe, texturing, shading, vertex, callback = () => null) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.meshes.forEach(el => {
            el.draw(this.ctx, {
                fieldOfView: this.fieldOfView,
                aspectRatio: this.aspectRatio,
                zScale: this.zScale,
                zOffset: this.zOffset,
                zNear: this.zNear,
                camera: this.camera,
                lightSource: this.lightSource.matrix
            }, wireframe, texturing, shading, vertex, callback)
        })
    }
}