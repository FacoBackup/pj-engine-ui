import {crossProduct, dotProduct, normalize} from "./vectorOperations";

export default function multiplyByMatrix(matrixA, matrixB) {

    let aRows = matrixA.length,
        aCols = matrixA[0].length,
        bRows = matrixB.length,
        bCols = matrixB[0].length,
        newMatrix = new Array(aRows)

    if (aCols === bRows)
        for (let rowA = 0; rowA < aRows; rowA++) {
            newMatrix[rowA] = new Array(bCols)
            for (let columnB = 0; columnB < bCols; columnB++) {
                newMatrix[rowA][columnB] = 0;
                for (let columnA = 0; columnA < aCols; columnA++) {
                    newMatrix[rowA][columnB] += matrixA[rowA][columnA] * matrixB[columnA][columnB]
                }
            }
        }

    return newMatrix
}

export function multiplyByScalar(matrixA, scalar) {

    let aRows = matrixA.length,
        aCols = matrixA[0].length,
        newMatrix = [...matrixA]

    for (let rowA = 0; rowA < aRows; rowA++) {
        for (let columnA = 0; columnA < aCols; columnA++) {
            newMatrix[rowA][columnA] *= scalar
        }
    }

    return newMatrix

}

export function sum(matrixA, matrixB) {
    let response = new Array(matrixA.length)
    for (let i = 0; i < matrixA.length; i++) {
        response[i] = new Array(matrixA[i].length)
        for (let j = 0; j < matrixA[i].length; j++) {
            response[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }

    return response
}

export function matrixPointAt(posVec, targetVec, upVec) {
    let forwardVec = sum([...targetVec], multiplyByScalar([...posVec], -1))

    forwardVec =normalize(forwardVec[0][0], forwardVec[1][0], forwardVec[2][0], true)

    const a = multiplyByScalar(forwardVec, dotProduct(upVec, forwardVec))
    let newUpVec = sum(upVec, multiplyByScalar(a, -1))

    newUpVec = normalize(newUpVec[0][0], newUpVec[1][0], newUpVec[2][0])

    let newRight = crossProduct(newUpVec, forwardVec)

    let pointAt = constructMatrix(4, 4, 0)

    pointAt[0][0] = newRight[0][0]
    pointAt[0][1] = newRight[1][0]
    pointAt[0][2] = newRight[2][0]

    pointAt[1][0] = newUpVec[0][0]
    pointAt[1][1] = newUpVec[1][0]
    pointAt[1][2] = newUpVec[2][0]

    pointAt[2][0] = forwardVec[0][0]
    pointAt[2][1] = forwardVec[1][0]
    pointAt[2][2] = forwardVec[2][0]

    pointAt[3][0] = posVec[0][0]
    pointAt[3][1] = posVec[1][0]
    pointAt[3][2] = posVec[2][0]

    pointAt[3][3] = 1

    return pointAt
}

export function constructMatrix(rows, columns, fill=0) {
    let newM = new Array(rows).fill(fill)
    for (let i = 0; i < rows; i++) {

        newM[i] = new Array(columns).fill(fill)
    }

    return newM
}

export function matrixInverse(m) {
    let matrix = constructMatrix(4, 4)

    matrix[0][0] = m[0][0]
    matrix[0][1] = m[1][0]
    matrix[0][2] = m[2][0]

    matrix[1][0] = m[0][1]
    matrix[1][1] = m[1][1]
    matrix[1][2] = m[2][1]

    matrix[2][0] = m[0][2]
    matrix[2][1] = m[1][2]
    matrix[2][2] = m[2][2]

    matrix[3][0] = -(m[3][0] * matrix[0][0] + m[3][1] * matrix[1][0] + m[3][2] * matrix[2][0])
    matrix[3][1] = -(m[3][0] * matrix[0][1] + m[3][1] * matrix[1][1] + m[3][2] * matrix[2][1])
    matrix[3][2] = -(m[3][0] * matrix[0][2] + m[3][1] * matrix[1][2] + m[3][2] * matrix[2][2])
    matrix[3][3] = 1

    return matrix
}