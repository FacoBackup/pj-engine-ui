import {crossProduct, dotProduct, normalise, subtractVectors, vectorMultiply} from "./vectorOperations";

export default function multiplyByMatrix(matrixA, matrixB) {
    let aRows = matrixA.length,
        aCols = matrixA[0].length,
        bCols = matrixB[0].length,
        newMatrix = new Array(aRows)

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


export function matrixPointAt(posVec, targetVec, upVec) {
    let newForward = subtractVectors(targetVec, posVec);

    newForward = normalise(newForward[0][0], newForward[1][0], newForward[2][0]);

    let a = vectorMultiply(newForward, dotProduct(upVec, newForward));

    let newUp = subtractVectors(upVec, a);
    newUp = normalise(newUp[0][0], newUp[1][0], newUp[2][0]);

    let newRight = crossProduct(newUp, newForward);

    let matrix = constructMatrix(4, 4);
    matrix[0][0] = newRight[0][0];
    matrix[0][1] = newRight[1][0];
    matrix[0][2] = newRight[2][0];
    matrix[0][3] = 0;
    matrix[1][0] = newUp[0][0];
    matrix[1][1] = newUp[1][0];
    matrix[1][2] = newUp[2][0];
    matrix[1][3] = 0;
    matrix[2][0] = newForward[0][0];
    matrix[2][1] = newForward[1][0];
    matrix[2][2] = newForward[2][0];
    matrix[2][3] = 0;
    matrix[3][0] = posVec[0][0];
    matrix[3][1] = posVec[1][0];
    matrix[3][2] = posVec[2][0];
    matrix[3][3] = 1;


    return matrix;
}

export function constructMatrix(rows, columns, fill = 0) {
    let newM = new Array(rows).fill(fill)
    for (let i = 0; i < rows; i++) {

        newM[i] = new Array(columns).fill(fill)
    }

    return newM
}

export function matrixInverse(m) {
    let matrix = constructMatrix(4, 4)

    matrix[0][0] = m[0][0];
    matrix[0][1] = m[1][0];
    matrix[0][2] = m[2][0];
    matrix[0][3] = 0;
    matrix[1][0] = m[0][1];
    matrix[1][1] = m[1][1];
    matrix[1][2] = m[2][1];
    matrix[1][3] = 0;
    matrix[2][0] = m[0][2];
    matrix[2][1] = m[1][2];
    matrix[2][2] = m[2][2];
    matrix[2][3] = 0;
    matrix[3][0] = -(m[3][0] * matrix[0][0] + m[3][1] * matrix[1][0] + m[3][2] * matrix[2][0]);
    matrix[3][1] = -(m[3][0] * matrix[0][1] + m[3][1] * matrix[1][1] + m[3][2] * matrix[2][1]);
    matrix[3][2] = -(m[3][0] * matrix[0][2] + m[3][1] * matrix[1][2] + m[3][2] * matrix[2][2]);
    matrix[3][3] = 1;
    return matrix
}

export function MatrixMultiplyVector(matrix, vec) {

    let newVec = constructMatrix(4, 1)
    newVec[0][0] = vec[0][0] * matrix[0][0] + vec[1][0] * matrix[1][0] + vec[2][0] * matrix[2][0] + vec[3][0] * matrix[3][0];
    newVec[1][0] = vec[0][0] * matrix[0][1] + vec[1][0] * matrix[1][1] + vec[2][0] * matrix[2][1] + vec[3][0] * matrix[3][1];
    newVec[2][0] = vec[0][0] * matrix[0][2] + vec[1][0] * matrix[1][2] + vec[2][0] * matrix[2][2] + vec[3][0] * matrix[3][2];
    newVec[3][0] = vec[0][0] * matrix[0][3] + vec[1][0] * matrix[1][3] + vec[2][0] * matrix[2][3] + vec[3][0] * matrix[3][3];

    return newVec;
}

export function MatrixMakeTranslation(x, y, z)
{
    let matrix = constructMatrix(4,4, 0)
    matrix[0][0] = 1
    matrix[1][1] = 1
    matrix[2][2] = 1
    matrix[3][3] = 1
    matrix[3][0] = x
    matrix[3][1] = y
    matrix[3][2] = z
    return matrix;
}