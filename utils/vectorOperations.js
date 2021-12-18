import multiplyByMatrix, {multiplyByScalar} from "./matrixOperations";
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

    // vec.vectorsush([1])
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
    let planeN = normalise(planeNormal),
        planeD = -dotProduct(planeN, planePoint),
        ad = dotProduct(lineStart, planeN),
        bd = dotProduct(lineEnd, planeN),
        t = (-planeD - ad) / (bd - ad),
        lineStartToEnd = subtractVectors(lineEnd, lineStart),
        lineToIntersect = multiplyByScalar(lineStartToEnd, t)

    return sumVectors(lineStart, lineToIntersect)
}


export function clipAgainstPlane(plane_p, plane_n, in_tri) {
    plane_n = normalise(plane_n);
    let out_tri1 = new Triangle(),
        out_tri2 = new Triangle()

    const dist = (p) => {
        let n = normalise(p);
        return (dotProduct(plane_n, n) - dotProduct(plane_n, plane_p));
    }

    let nInsidePointCount = 0,
        nOutsidePointCount = 0,
        outside_points = new Array(3),
        inside_points = new Array(3)

    let d0 = dist(in_tri.vectors[0]);
    let d1 = dist(in_tri.vectors[1]);
    let d2 = dist(in_tri.vectors[2]);

    if (d0 >= 0)
        inside_points[nInsidePointCount++] = in_tri.vectors[0]
    else
        outside_points[nOutsidePointCount++] = in_tri.vectors[0]

    if (d1 >= 0)
        inside_points[nInsidePointCount++] = in_tri.vectors[1]
    else
        outside_points[nOutsidePointCount++] = in_tri.vectors[1]

    if (d2 >= 0)
        inside_points[nInsidePointCount++] = in_tri.vectors[2]
    else
        outside_points[nOutsidePointCount++] = in_tri.vectors[2]

    if (nInsidePointCount === 0)
        return 0

    if (nInsidePointCount === 3) {
        out_tri1.vectors = in_tri.vectors
        return {quantity: 1, triangles: [out_tri1]}
    }

    if (nInsidePointCount === 1 && nOutsidePointCount === 2) {
        out_tri1.vectors[0] = inside_points[0]
        out_tri1.vectors[1] = vectorIntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0])
        out_tri1.vectors[2] = vectorIntersectPlane(plane_p, plane_n, inside_points[0], outside_points[1])

        return {quantity: 1, triangles: [out_tri1]}
    }

    if (nInsidePointCount === 2 && nOutsidePointCount === 1) {
        out_tri1.vectors[0] = inside_points[0]
        out_tri1.vectors[1] = inside_points[1];
        out_tri1.vectors[2] = vectorIntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0])

        out_tri2.vectors[0] = inside_points[1];
        out_tri2.vectors[1] = out_tri1.vectors[2];
        out_tri2.vectors[2] = vectorIntersectPlane(plane_p, plane_n, inside_points[1], outside_points[0])

        return  {quantity: 2, triangles: [out_tri1, out_tri2]}
    }
}