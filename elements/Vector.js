export default class Vector {
    matrix = []

    constructor(x, y, z) {
        this.update(x, y, z, 1)
    }

    update(x=this.x, y=this.y, z=this.z, w=this.w) {

        this.x = x
        this.y = y
        this.z = z
        this.w = w
        this.matrix = [[this.x], [this.y], [this.z], [this.w]]
    }
}