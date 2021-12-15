export function multiply(matrixA, matrixB) {
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

export function rotationMatrix(axis, angle) {
    let rotationM = []
    switch (axis) {
        case 'x': {
            rotationM.push([1, 0, 0])
            rotationM.push([0, Math.cos(angle), -Math.sin(angle)])
            rotationM.push([0, Math.sin(angle), Math.cos(angle)])
            break
        }
        case 'y': {
            rotationM.push([Math.cos(angle), 0, Math.sin(angle)])
            rotationM.push([0, 1, 0])
            rotationM.push([-Math.sin(angle), 0, Math.cos(angle)])
            break
        }
        case 'z': {
            rotationM.push([Math.cos(angle), -Math.sin(angle), 0])
            rotationM.push([Math.sin(angle), Math.cos(angle), 0])
            rotationM.push([0, 0, 1])
            break
        }
        default:
            break
    }
    return rotationM
}

export const PROJECTION_MATRIX = [[1, 0, 0],[0, 1, 0]]