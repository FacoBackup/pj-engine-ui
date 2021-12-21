import Triangle from "../elements/Triangle";
import Vector from "../elements/Vector";
import {dotProduct, normalise, vectorIntersectPlane} from "../math/vectorOperations";

export function clipAgainstPlane(planePoint, planeNormal, inputTriangle) {

    let planeN = normalise(planeNormal[0][0], planeNormal[1][0], planeNormal[2][0]);

    let vectors = []
    inputTriangle.vectors.forEach(vec => {
        vectors.push([vec.x, vec.y, vec.z])
    })
    let outputTriA = new Triangle(vectors[0], vectors[1], vectors[2], inputTriangle.noColor),
        outputTriB = new Triangle(vectors[0], vectors[1], vectors[2], inputTriangle.noColor)

    const dist = (p) => {
        return (planeN[0][0] * p.x + planeN[1][0] * p.y + planeN[2][0] * p.z - dotProduct(planeN, planePoint))
    }

    let nInsidePointCount = 0,
        nOutsidePointCount = 0,
        outsidePoints = new Array(3),
        insidePoints = new Array(3)

    let d0 = dist(inputTriangle.vectors[0]);
    let d1 = dist(inputTriangle.vectors[1]);
    let d2 = dist(inputTriangle.vectors[2]);

    if (d0 >= 0)
        insidePoints[nInsidePointCount++] = inputTriangle.vectors[0].matrix
    else
        outsidePoints[nOutsidePointCount++] = inputTriangle.vectors[0].matrix

    if (d1 >= 0)
        insidePoints[nInsidePointCount++] = inputTriangle.vectors[1].matrix
    else
        outsidePoints[nOutsidePointCount++] = inputTriangle.vectors[1].matrix

    if (d2 >= 0)
        insidePoints[nInsidePointCount++] = inputTriangle.vectors[2].matrix
    else
        outsidePoints[nOutsidePointCount++] = inputTriangle.vectors[2].matrix

    if (nInsidePointCount === 0) {

        return {quantity: 0, triangles: []}
    }

    if (nInsidePointCount === 3) {
        // inputTriangle.color = 'blue'

        return {quantity: 1, triangles: [inputTriangle]}
    }

    if (nInsidePointCount === 1 && nOutsidePointCount === 2) {
        outputTriA.color = inputTriangle.color //'red'

        outputTriA.vectors[0] = new Vector(insidePoints[0][0][0], insidePoints[0][1][0], insidePoints[0][2][0])

        const vectorTwo = vectorIntersectPlane(planePoint, planeN, insidePoints[0], outsidePoints[0])
        const vectorThree = vectorIntersectPlane(planePoint, planeN, insidePoints[0], outsidePoints[1])
        outputTriA.vectors[1] = new Vector(vectorTwo[0][0], vectorTwo[1][0], vectorTwo[2][0])
        outputTriA.vectors[2] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])

        return {quantity: 1, triangles: [outputTriA]}
    }

    if (nInsidePointCount === 2 && nOutsidePointCount === 1) {

        outputTriA.color = inputTriangle.color //'red'
        outputTriB.color = inputTriangle.color // 'green'

        outputTriA.vectors[0] = new Vector(insidePoints[0][0][0], insidePoints[0][1][0], insidePoints[0][2][0])
        outputTriA.vectors[1] = new Vector(insidePoints[1][0][0], insidePoints[1][1][0], insidePoints[1][2][0])
        const vectorThree = vectorIntersectPlane(planePoint, planeN, insidePoints[0], outsidePoints[0])
        outputTriA.vectors[2] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])

        outputTriB.vectors[0] = new Vector(insidePoints[1][0][0], insidePoints[1][1][0], insidePoints[1][2][0])
        outputTriB.vectors[1] = new Vector(vectorThree[0][0], vectorThree[1][0], vectorThree[2][0])
        const outTwoVectorThree = vectorIntersectPlane(planePoint, planeN, insidePoints[1], outsidePoints[0])
        outputTriB.vectors[2] = new Vector(outTwoVectorThree[0][0], outTwoVectorThree[1][0], outTwoVectorThree[2][0])

        return {quantity: 2, triangles: [outputTriA, outputTriB]}
    }
}