import Rx
    from 'rxjs/Rx';
import {forEach} from 'ramda';
import getDrawTriangle
    from './getDrawTriangle';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const drawTriangle = getDrawTriangle(ctx);

/**
 * @typedef {Object} EnemyCoordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Array.<EnemyCoordinates>} Enemies
 */

const ENEMY_FREQ = 1500;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getEnemyCoordinates = () => ({
    x: parseInt(Math.random() * canvas.width),
    y: -30
});

/**
 * @param {Enemies} enemies
 * @return {Enemies}
 */
const scanEnemies = enemies => {
    enemies.push(getEnemyCoordinates());
    return enemies;
};

/**
 * @param {EnemyCoordinates} enemy
 */
const paintEnemy = enemy => {
    enemy.y += 5;
    enemy.x += getRandomInt(-15, 15);
    const {x, y} = enemy;
    drawTriangle(x, y, 20, '#00ff00', 'down');
};

/**
 * @param {Enemies} enemies
 */
const paintEnemies = forEach(paintEnemy);

const enemies$ = Rx.Observable.interval(ENEMY_FREQ)
    .scan(scanEnemies, []);

export {
    enemies$,
    paintEnemies
}
