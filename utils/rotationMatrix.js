export default function rotationMatrix(axis, angle) {
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
