import Vector from "./Vector";
import multiplyByMatrix, {
    constructMatrix,
    matrixInverse, MatrixMakeTranslation,
    MatrixMultiplyVector,
    matrixPointAt,
    multiplyByScalar
} from "../utils/matrixOperations";
import rotationMatrix from "../utils/rotationMatrix";
import {subtractVectors, sumVectors} from "../utils/vectorOperations";

export default class Camera {
    vector = new Vector(0, 0, 0) // vCamera
    matrixCamera = constructMatrix(4, 4, 0)
    viewMatrix = constructMatrix(4, 4, 0)
    fYaw = 0
    forward = 0
    worldMatrix = constructMatrix(4, 4, 0)
    translatedMatrix = MatrixMakeTranslation(0, 0, 5)


    constructor(originX, originY, originZ) {
        this.worldMatrix[0][0] = 1
        this.worldMatrix[1][1] = 1
        this.worldMatrix[2][2] = 1
        this.worldMatrix[3][3] = 1
        this.worldMatrix = multiplyByMatrix(this.worldMatrix, this.translatedMatrix)

        this.update(originX, originY, originZ)
    }

    update(x = this.vector.x, y = this.vector.y, z = this.vector.z, yaw = this.fYaw, forward = this.forward) {
        this.vector.update(x, y, forward)

        this.forward = forward
        this.fYaw = yaw
        const matrixCameraRotation = rotationMatrix('y', yaw)
        const vectorLookDir = MatrixMultiplyVector(matrixCameraRotation, [[0], [0], [1], [1]])
        const vecUp = new Vector(0, 1, 1)
        let vectorTarget = sumVectors(this.vector.matrix, vectorLookDir)

        this.matrixCamera = matrixPointAt(this.vector.matrix, vectorTarget, vecUp.matrix)
        this.viewMatrix = matrixInverse(this.matrixCamera)
    }
}