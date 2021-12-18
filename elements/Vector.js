export default class Vector {
    matrix = []
    normal = []

    constructor(x, y, z) {
        this.update(x, y, z)
    }

    update(x, y, z) {
        this.x = x
        this.y = y
        this.z = z

        this.matrix = [[x], [y], [z]]
    }
}