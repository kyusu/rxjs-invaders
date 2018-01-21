import Rx
    from 'rxjs/Rx';
import {partial} from 'ramda';

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const SPEED = 200;
const STAR_NUMBER = 250;

/**
 * @typedef {Object} Star
 * @property {number} y
 * @property {number} x
 * @property {number} size
 * @implements ICoordinates
 */

/**
 * @typedef {Array.<Star>} Stars
 */

/**
 * @return {Star}
 */
const getStar = () => ({
    x: parseInt(Math.random() * canvas.width),
    y: parseInt(Math.random() * canvas.height),
    size: Math.random() * 2
});

/**
 * @param {Star} star
 */
const moveStar = star => {
    if (star.y >= canvas.height) {
        star.y = 0;
    }
    star.y += 3;
};

/**
 * @param {Stars} stars
 */
const moveStars = stars => {
    stars.forEach(moveStar);
    return stars;
};

/**
 * @param {Stars} stars
 */
const createStarMovementStream$ = stars => Rx.Observable.interval(SPEED).map(partial(moveStars, [stars]));

/**
 * @param {Star} star
 */
const paintStar = star => ctx.fillRect(star.x, star.y, star.size, star.size);

/**
 * @param {Stars} stars
 */
const paintStars = stars => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(paintStar);
};

const stars$ = Rx.Observable
    .range(1, STAR_NUMBER)
    .map(getStar)
    .toArray()
    .flatMap(createStarMovementStream$);

export {
    paintStars,
    stars$
};
