import multiplyByMatrix from "./matrixOperations";

export function crossProduct(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]

    return [[aY * bZ - aZ * bY], [aZ * bX - aX * bZ], [aX * bY - aY * bX], [1]]
}

export function normalise(x, y, z) {
    const magnitude = Math.sqrt((x ** 2) + (y ** 2) + (z ** 2))

    return [[x / magnitude], [y / magnitude], [z / magnitude], [1]]
}

export function dotProduct(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],

        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]

    return (aX * bX) + (aY * bY) + (aZ * bZ)
}

export function sumVectors(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]


    return [[aX + bX], [aY + bY], [aZ + bZ]]
}

export function subtractVectors(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]


    return [[aX - bX], [aY - bY], [aZ - bZ]]
}

export function projectVector(vector, fieldOfView, aspectRatio, zScale, zOffset) {
    const matrix = [
        [fieldOfView * aspectRatio, 0, 0, 0],
        [0, fieldOfView, 0, 0],
        [0, 0, zScale, 1],
        [0, 0, zOffset, 0]
    ]
    let vec = [...vector]

    vec = multiplyByMatrix(matrix, vec)

    if (vec[vec.length - 1][0] !== 0) {
        for (let i = 0; i < vec.length - 1; i++)
            vec[i][0] = vec[i][0] / (vec[vec.length - 1][0])
    }


    return vec
}

export function scaleIntoView(vec, screenWidth, screenHeight) {
    let aX = vec[0][0] + screenWidth / 2,
        aY = vec[1][0] + screenHeight / 2,
        aZ = vec[2][0],
        aW = vec[3][0]

    return [[aX], [aY], [aZ], [aW]]
}

export function vectorIntersectPlane(planePoint, planeNormal, lineStart, lineEnd) {

    let planeN = normalise(planeNormal[0][0], planeNormal[1][0], planeNormal[2][0]),
        planeD = -dotProduct(planeN, planePoint),
        ad = dotProduct(lineStart, planeN),
        bd = dotProduct(lineEnd, planeN),
        t = (-planeD - ad) / (bd - ad),
        lineStartToEnd = subtractVectors(lineEnd, lineStart),
        lineToIntersect = vectorMultiply(lineStartToEnd, t)

    return sumVectors(lineStart, lineToIntersect)
}


export function vectorMultiply(vecA, scalar) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0]

    return [[aX * scalar], [aY * scalar], [aZ * scalar], [1]]
}