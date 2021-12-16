export default class Engine {
    meshes = []
    constructor(target) {
        this.ctx = target.getContext('2d')
    }

    draw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.meshes.forEach(el => {
            el.draw(this.ctx)
        })
    }
}