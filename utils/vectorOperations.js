export function crossProduct(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]

    return [[aY * bZ - aZ * bY], [aZ * bX - aX * bZ], [aX * bY - aY * bX]]
}

export function normalize(x, y, z) {
    const magnitude = Math.sqrt((x ** 2) + (y ** 2) + (z ** 2))

    return [[x / magnitude], [y / magnitude], [z / magnitude]]
}

export function dotProduct(vecA, vecB) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]

    return aX * bX + aY * bY + aZ * bZ
}

export function adjustToCamera(vec, cameraVec){
    let aX = vec[0][0],
        aY = vec[1][0],
        aZ = vec[2][0],
        cX = cameraVec[0][0],
        cY = cameraVec[1][0],
        cZ = cameraVec[2][0]


    return [[aX - cX], [aY - cY], [aZ - cZ]]
}
export function sumVectors(vecA, vecB){
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0],
        bX = vecB[0][0],
        bY = vecB[1][0],
        bZ = vecB[2][0]


    return [[aX + bX], [aY + bY], [aZ + bZ]]
}