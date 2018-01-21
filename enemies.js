import Rx
    from 'rxjs/Rx';
import {forEach} from 'ramda';
import getDrawTriangle
    from './getDrawTriangle';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const drawTriangle = getDrawTriangle(ctx);

/**
 * @typedef {Object} EnemyShotCoordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Array.<EnemyShotCoordinates>} EnemyShots
 */

/**
 * @typedef {Object} Enemy
 * @property {number} x
 * @property {number} y
 * @property {EnemyShots} shots
 */

/**
 * @typedef {Array.<Enemy>} Enemies
 */

const ENEMY_FREQ = 1500;
const ENEMY_SHOOTING_FREQ = 750;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @return {Enemy}
 */
const getEnemy = () => ({
    x: parseInt(Math.random() * canvas.width),
    y: -30,
    shots: []
});

/**
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
const isVisible = ({x, y}) => x > -40 && x < canvas.width + 40 && y > -40 && y < canvas.height + 40;

const enemyShots$ = Rx.Observable
    .interval(ENEMY_SHOOTING_FREQ);

/**
 * @param {Enemy} enemy
 */
const addShots = enemy => () => {
    const {x, y} = enemy;
    enemy.shots.push({
        x,
        y
    });
    enemy.shots = enemy.shots.filter(isVisible);
};

/**
 * @param {Enemies} enemies
 * @return {Enemies}
 */
const scanEnemies = enemies => {
    const enemy = getEnemy();
    enemyShots$.subscribe(addShots(enemy));
    enemies.push(enemy);
    return enemies;
};

/**
 * @param {EnemyShotCoordinates} shot
 */
const paintEnemyShot = shot => {
    shot.y += 15;
    const {x, y} = shot;
    drawTriangle(x, y, 5, '#00ffff', 'down');
};

/**
 * @param {Enemy} enemy
 */
const paintEnemy = enemy => {
    enemy.y += 5;
    enemy.x += getRandomInt(-15, 15);
    const {x, y} = enemy;
    drawTriangle(x, y, 20, '#00ff00', 'down');
    enemy.shots.forEach(paintEnemyShot);
};

/**
 * @param {Enemies} enemies
 */
const paintEnemies = forEach(paintEnemy);

const enemies$ = Rx.Observable
    .interval(ENEMY_FREQ)
    .scan(scanEnemies, []);

export {
    enemies$,
    paintEnemies
}
