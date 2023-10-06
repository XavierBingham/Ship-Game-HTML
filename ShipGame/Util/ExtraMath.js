export default {

    clamp:(num, min, max) => Math.min(Math.max(num, min), max),
    lerp:(a, b, x) => a + x * (b - a),

}