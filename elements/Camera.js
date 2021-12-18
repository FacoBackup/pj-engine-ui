import Vector from "./Vector";
import multiplyByMatrix, {constructMatrix, matrixInverse, matrixPointAt, sum} from "../utils/matrixOperations";
import rotationMatrix from "../utils/rotationMatrix";

export default class Camera {
    vector = new Vector(0, 0, 0) // vCamera
    vectorLookDir = new Vector(0, 1, 0) // lookDir

    matrixCamera = constructMatrix(4, 4, 0)
    vecUp = new Vector(0, 1, -1)
    viewMatrix =  constructMatrix(4, 4, 0)
    fYaw = 0
    constructor(originX, originY, originZ) {
        this.update(originX, originY, originZ)
    }

    update(x, y, z, yaw=this.fYaw) {

        this.vector.update(x, y, z)
        // this.lookAt.update(x, y, z)
        // const s = sum(this.vector.matrix, this.lookAt.matrix)
        // this.pointAt.update(s[0][0], s[1][0], s[2][0])

        this.fYaw = yaw
        const rotationM = rotationMatrix('y', yaw)
        // console.log(this.pointAt, rotationM)
        let vectorTarget =  new Vector(0, 0, 1)

        const rotatedC = multiplyByMatrix(rotationM, vectorTarget.matrix)

        this.vectorLookDir.update(rotatedC[0][0],rotatedC[1][0],rotatedC[2][0])
        const addedRotation = sum(rotatedC, this.vector.matrix)
        vectorTarget.update(addedRotation[0][0],addedRotation[1][0],addedRotation[2][0])

        this.matrixCamera = matrixPointAt(this.vector.matrix, vectorTarget.matrix, this.vecUp.matrix)

        this.viewMatrix = matrixInverse(this.matrixCamera)
        console.log(...this.viewMatrix)

    }

    // update(originX, originY, originZ){
    //     this.vector.update(originX, originY, originZ)
    // }


}