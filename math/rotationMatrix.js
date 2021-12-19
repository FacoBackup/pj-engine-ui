import {constructMatrix} from "./matrixOperations";

export default function rotationMatrix(axis, angle) {
    let rotationM = constructMatrix(4, 4)
    switch (axis) {
        case 'x': {
            rotationM[0][0] = 1;
            rotationM[1][1] = Math.cos(angle);
            rotationM[1][2] = Math.sin(angle);
            rotationM[2][1] = -Math.sin(angle);
            rotationM[2][2] = Math.cos(angle);
            rotationM[3][3] = 1;

            break
        }
        case 'y': {
            rotationM[0][0] = Math.cos(angle);
            rotationM[0][2] = Math.sin(angle);
            rotationM[2][0] = -Math.sin(angle);
            rotationM[1][1] = 1;
            rotationM[2][2] = Math.cos(angle);
            rotationM[3][3] = 1;
            break
        }
        case 'z': {
            rotationM[0][0] = Math.cos(angle);
            rotationM[0][1] = Math.sin(angle);
            rotationM[1][0] = -Math.sin(angle);
            rotationM[1][1] = Math.cos(angle);
            rotationM[2][2] = 1;
            rotationM[3][3] = 1;
            break
        }
        default:
            break
    }

    return rotationM
}
