import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

neonCursor({
    el: document.body,
    shaderPoints: 16,
    curvePoints: 80,
    curveLerp: 0.4,
    radius1: 5,
    radius2: 5,
    velocityTreshold: 10,
    sleepRadiusX: 100,
    sleepRadiusY: 100,
    sleepTimeCoefX: 0.0025,
    sleepTimeCoefY: 0.0025
})