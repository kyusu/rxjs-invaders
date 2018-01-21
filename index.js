import Rx
    from 'rxjs/Rx';
import {
    not,
    compose
} from 'ramda';
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
import gameOver
    from './gameOver';

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

const renderGameOver = () => {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    ctx.font = '78px serif';
    ctx.fillText('GAME OVER', (window.innerWidth / 2) - 120, window.innerHeight / 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
};

/**
 * @type {function (Actors): boolean}
 */
const notGameOver = compose(not, gameOver);

Rx.Observable
    .combineLatest([stars$, hero$, enemies$, heroShots$], getActors)
    .sampleTime(200)
    .takeWhile(notGameOver)
    .subscribe({
        next: renderScene,
        complete: renderGameOver
    });

