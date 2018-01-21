import Rx
    from 'rxjs/Rx';
import {
    forEach
} from 'ramda';
import getDrawTriangle
    from './getDrawTriangle';

/**
 * @typedef {Object} HeroCoordinates
 * @property {number} x
 * @property {number} y
 * @implements ICoordinates
 */

/**
 * @typedef {Object} HeroShotCoordinates
 * @property {number} x
 * @property {number} y
 * @implements ICoordinates
 */

/**
 * @typedef {Array.<HeroShotCoordinates>} HeroShots
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

const drawTriangle = getDrawTriangle(ctx);

const HERO_Y = canvas.height - 30;
const mouseMove$ = Rx.Observable.fromEvent(canvas, 'mousemove');

const startCoordinates = {
    x: canvas.width / 2,
    y: HERO_Y
};

const hero$ = mouseMove$.map(getNewHeroCoordinates).startWith(startCoordinates);

const paintHero = ({x, y}) => drawTriangle(x, y, 20, '#ff0000', 'up');

const firing$ = Rx.Observable
    .fromEvent(canvas, 'click')
    .startWith({})
    .sampleTime(200)
    .timestamp();

/**
 * @param {HeroShots} shots
 * @param {number} x
 * @return {HeroShots}
 */
const scanShots = (shots, {x}) => {
    shots.push({
        x,
        y: HERO_Y
    });
    return shots;
};

const getShotWithTimeStamp = ({timestamp}, {x}) => ({
    timestamp,
    x
});

const heroShots$ = Rx.Observable
    .combineLatest([firing$, hero$], getShotWithTimeStamp)
    .distinctUntilKeyChanged('timestamp')
    .scan(scanShots, []);

/**
 * @param {HeroShotCoordinates} shot
 */
const paintHeroShot = shot => {
    shot.y -= 15;
    const {x, y} = shot;
    drawTriangle(x, y, 5, '#ffff00', 'up');
};

/**
 * @typedef {function(HeroShots): undefined}
 */
const paintHeroShots = forEach(paintHeroShot);

export {
    paintHero,
    paintHeroShots,
    hero$,
    heroShots$
};
