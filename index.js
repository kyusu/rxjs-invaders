import Rx
    from 'rxjs/Rx';
import {
    paintStars,
    stars$
} from './starfield';
import {
    paintHero,
    paintHeroShots,
    hero$,
    heroShots$
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
 * @property {HeroShots} heroShots
 */

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 * @param {Enemies} enemies
 * @param {HeroShots} heroShots
 * @return {Actors}
 */
const getActors = (stars, hero, enemies, heroShots) => ({
    stars,
    hero,
    enemies,
    heroShots
});

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 * @param {Enemies} enemies
 * @param {HeroShots} heroShots
 */
const renderScene = ({stars, hero, enemies, heroShots}) => {
    paintStars(stars);
    paintHero(hero);
    paintEnemies(enemies);
    paintHeroShots(heroShots);
};

Rx.Observable
    .combineLatest([stars$, hero$, enemies$, heroShots$], getActors)
    .sampleTime(200)
    .subscribe(renderScene);

