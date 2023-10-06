export default {

    isColliding:(a, b) => {
        a = a.getBoundingClientRect();
        b = b.getBoundingClientRect()
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

}