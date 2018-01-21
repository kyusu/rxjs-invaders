import Rx
    from 'rxjs/Rx';

/**
 * @typedef {Object} HeroCoordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {number} clientX
 * @return {HeroCoordinates}
 */
const getNewHeroCoordinates = ({clientX}) => ({
    x: clientX,
    y: HERO_Y
});

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

const HERO_Y = canvas.height - 30;
const mouseMove$ = Rx.Observable.fromEvent(canvas, 'mousemove');

const startCoordinates = {
    x: canvas.width / 2,
    y: HERO_Y
};

const hero$ = mouseMove$.map(getNewHeroCoordinates).startWith(startCoordinates);

const drawTriangle = (x, y, width, color, direction) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
};

const paintHero = ({x, y}) => drawTriangle(x, y, 20, '#ff0000', 'up');

export {
    paintHero,
    hero$
};
