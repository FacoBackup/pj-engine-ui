import Vector from "./Vector";
import multiplyByMatrix, {
    constructMatrix,
    matrixInverse,
    MatrixMakeTranslation,
    MatrixMultiplyVector,
    matrixPointAt
} from "../math/matrixOperations";
import rotationMatrix from "../math/rotationMatrix";
import {sumVectors} from "../math/vectorOperations";

export default class Camera {
    vector = new Vector(0, 0, 0) // vCamera
    matrixCamera = constructMatrix(4, 4, 0)
    viewMatrix = constructMatrix(4, 4, 0)
    fYaw = 0
    fPitch = -Math.PI/2

    worldMatrix = constructMatrix(4, 4, 0)
    translatedMatrix = MatrixMakeTranslation(0, 0, 50)


    constructor(originX, originY, originZ) {
        this.worldMatrix[0][0] = 1
        this.worldMatrix[1][1] = 1
        this.worldMatrix[2][2] = 1
        this.worldMatrix[3][3] = 1
        this.worldMatrix = multiplyByMatrix(this.worldMatrix, this.translatedMatrix)

        this.update(originX, originY, originZ)
    }

    update(x = this.vector.x, y = this.vector.y, z = this.vector.z, yaw = this.fYaw,  pitch = this.fPitch) {
        this.vector.update(x, y, z)

        this.fYaw = yaw
        this.fPitch = pitch

        let vectorPitch = MatrixMultiplyVector(rotationMatrix('z', this.fPitch), [[0], [1], [0], [1]])

        vectorPitch[0][0] = 0
        vectorPitch = sumVectors(this.vector.matrix, vectorPitch)

        let vectorYaw = MatrixMultiplyVector(rotationMatrix('y', this.fYaw), [[0], [0], [1], [1]])

        vectorYaw = sumVectors(this.vector.matrix, vectorYaw)


        this.matrixCamera = matrixPointAt(vectorPitch, vectorYaw, [[0], [1], [0], [1]])
        this.viewMatrix = matrixInverse(this.matrixCamera)
    }
}