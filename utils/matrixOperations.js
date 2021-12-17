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

// export function subtract(matrixA, matrixB) {
//
//
// }