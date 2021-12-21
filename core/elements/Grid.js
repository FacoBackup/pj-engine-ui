import Triangle from "./Triangle";

export default class Grid {
    triangleBudget = 24
    triangles = []
    squareSize = 4

    constructor(ctx) {
        this.computeVertexes(ctx)
    }

    _square(x, z) {
        const initTri = new Triangle([x, 0, z], [x, 0 , z + this.squareSize], [x + this.squareSize, 0, z], true)
        const secTri = new Triangle([x + this.squareSize, 0, z], [x, 0, z + this.squareSize], [x + this.squareSize, 0, z + this.squareSize], true)
        return [initTri, secTri]
    }

    computeVertexes() {

        let offset = -(this.squareSize ** 2)
        for (let i = 0; i < this.triangleBudget / 2; i++) {
            for (let j = 0; j < this.triangleBudget / 2; j++) {
                const square = this._square(i + this.squareSize + offset, j + this.squareSize + offset)

                this.triangles.push(square[0])
                this.triangles.push(square[1])
            }
        }

    }
}