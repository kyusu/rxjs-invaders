/**
 * @interface
 * @typedef {Object} ICoordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {ICoordinates} target1
 * @param {ICoordinates} target2
 * @return {boolean}
 */
const collisionDetection = (target1, target2) => {
    const xAxisCollision = target1.x > target2.x - 20 && target1.x < target2.x + 20;
    const yAxisCollision = target1.y > target2.y - 20 && target1.y < target2.y + 20;
    const collision = xAxisCollision && yAxisCollision;
    if (collision) {
        console.log('collisionDetection.js', '6', 'collisionDetection', target2.id);
    }
    return collision;
};

export default collisionDetection;
