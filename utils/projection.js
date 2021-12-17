import multiplyByMatrix from "./matrixOperations";

export function projectToPlane(scale) {
    return [[scale, 0, 0], [0, scale, 0]]
}

export function projectVector(vector, engine) {
    const matrix = [
        [engine.fieldOfView * engine.aspectRatio, 0, 0, 0],
        [0, engine.fieldOfView, 0, 0],
        [0, 0, engine.zScale, 1],
        [0, 0, engine.zOffset, 0]
    ]
    let vec = [...vector]

    vec.push([1])
    vec = multiplyByMatrix(matrix, vec)

    if (vec[vec.length - 1][0] !== 0) {

        for (let i = 0; i < vec.length - 1; i++)
            vec[i][0] = vec[i][0] / (3 + vec[vec.length - 1][0])
    }
    vec.pop()

    return vec
}

export function scaleIntoView(x, y, z, screenWidth, screenHeight) {
    const scaledX = (x + screenWidth / 2),
        scaledY = (y + screenHeight / 2)
    // this.update((this.x + screenWidth / 2), )
    return [[scaledX], [scaledY], [z]]
}