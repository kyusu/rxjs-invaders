import Rx
    from 'rxjs/Rx';
import {
    paintStars,
    stars$
} from './starfield';
import {
    paintHero,
    hero$
} from './hero';
import {
    paintEnemies,
    enemies$
} from './enemies';

/**
 * @typedef {Object} Actors
 * @property {Stars} stars
 * @property {HeroCoordinates} hero
 * @property {Enemies} enemies
 */

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 * @param {Enemies} enemies
 * @return {Actors}
 */
const getActors = (stars, hero, enemies) => ({
    stars,
    hero,
    enemies
});

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 * @param {Enemies} enemies
 */
const renderScene = ({stars, hero, enemies}) => {
    paintStars(stars);
    paintHero(hero);
    paintEnemies(enemies);
};

Rx.Observable
    .combineLatest(stars$, hero$, enemies$, getActors)
    .sampleTime(200)
    .subscribe(renderScene);

