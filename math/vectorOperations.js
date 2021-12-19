import multiplyByMatrix from "./matrixOperations";
import Vector from "../elements/Vector";
import Triangle from "../elements/Triangle";

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


export function clipAgainstPlane(plane_p, plane_n, in_tri) {

    let planeN = normalise(plane_n[0][0], plane_n[1][0], plane_n[2][0]);

    let vectors = []
    in_tri.vectors.forEach(vec => {
        vectors.push([vec.x, vec.y, vec.z])
    })
    let out_tri1 = new Triangle(vectors[0], vectors[1], vectors[2]),
        out_tri2 = new Triangle(vectors[0], vectors[1], vectors[2])

    const dist = (p) => {
        return (planeN[0][0] * p.x + planeN[1][0] * p.y + planeN[2][0] * p.z - dotProduct(planeN, plane_p))
    }

    let nInsidePointCount = 0,
        nOutsidePointCount = 0,
        outsidePoints = new Array(3),
        insidePoints = new Array(3)

    let d0 = dist(in_tri.vectors[0]);
    let d1 = dist(in_tri.vectors[1]);
    let d2 = dist(in_tri.vectors[2]);

    if (d0 >= 0)
        insidePoints[nInsidePointCount++] = in_tri.vectors[0].matrix
    else
        outsidePoints[nOutsidePointCount++] = in_tri.vectors[0].matrix

    if (d1 >= 0)
        insidePoints[nInsidePointCount++] = in_tri.vectors[1].matrix
    else
        outsidePoints[nOutsidePointCount++] = in_tri.vectors[1].matrix

    if (d2 >= 0)
        insidePoints[nInsidePointCount++] = in_tri.vectors[2].matrix
    else
        outsidePoints[nOutsidePointCount++] = in_tri.vectors[2].matrix

    if (nInsidePointCount === 0) {

        return {quantity: 0, triangles: []}
    }

    if (nInsidePointCount === 3) {
        // in_tri.color = 'blue'

        return {quantity: 1, triangles: [in_tri]}
    }

    if (nInsidePointCount === 1 && nOutsidePointCount === 2) {
        out_tri1.color = in_tri.color //'red'

        out_tri1.vectors[0] = new Vector(insidePoints[0][0][0], insidePoints[0][1][0], insidePoints[0][2][0])

        const vectorTwo = vectorIntersectPlane(plane_p, planeN, insidePoints[0], outsidePoints[0])
        const vectorThree = vectorIntersectPlane(plane_p, planeN, insidePoints[0], outsidePoints[1])
        out_tri1.vectors[1] = new Vector(vectorTwo[0][0], vectorTwo[1][0], vectorTwo[2][0])
        out_tri1.vectors[2] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])

        return {quantity: 1, triangles: [out_tri1]}
    }

    if (nInsidePointCount === 2 && nOutsidePointCount === 1) {

        out_tri1.color = in_tri.color //'red'
        out_tri2.color = in_tri.color // 'green'

        out_tri1.vectors[0] = new Vector(insidePoints[0][0][0], insidePoints[0][1][0], insidePoints[0][2][0])
        out_tri1.vectors[1] = new Vector(insidePoints[1][0][0], insidePoints[1][1][0], insidePoints[1][2][0])
        const vectorThree = vectorIntersectPlane(plane_p, planeN, insidePoints[0], outsidePoints[0])
        out_tri1.vectors[2] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])

        out_tri2.vectors[0] = new Vector(insidePoints[1][0][0], insidePoints[1][1][0], insidePoints[1][2][0])
        out_tri2.vectors[1] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])
        const outTwoVectorThree = vectorIntersectPlane(plane_p, planeN, insidePoints[1], outsidePoints[0])
        out_tri2.vectors[2] = new Vector(outTwoVectorThree[0][0], outTwoVectorThree[1][0], outTwoVectorThree[2][0])

        return {quantity: 2, triangles: [out_tri1, out_tri2]}
    }
}

export function vectorMultiply(vecA, scalar) {
    let aX = vecA[0][0],
        aY = vecA[1][0],
        aZ = vecA[2][0]


    return [[aX * scalar], [aY * scalar], [aZ * scalar], [1]]
}