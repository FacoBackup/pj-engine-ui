export default function multiply(matrixA, matrixB) {
    let aRows = matrixA.length,
        aCols = matrixA[0].length,
        bRows = matrixB.length,
        bCols = matrixB[0].length,
        newMatrix = new Array(aRows)

    if(aCols === bRows)
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