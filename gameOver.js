import collisionDetection
    from './collisionDetection';

/**
 * @param {HeroCoordinates} hero
 * @return {function(EnemyShotCoordinates): Boolean}
 */
const detectHit = hero => shot => {
    const hit = collisionDetection(hero, shot);
    if (hit) {
        console.log('gameOver.js', '11', 'hero collided with shot', hero.x, hero.y, shot.x, shot.y);
    }
    return hit;
};

/**
 * @param {HeroCoordinates} hero
 * @return {function(Enemy): Boolean}
 */
const detectCollisions = hero => enemy => {
    if (collisionDetection(hero, enemy)) {
        console.log('gameOver.js', '16', 'hero collided with enemy', hero.x, hero.y, enemy.x, enemy.y);
        return true;
    }
    return enemy.shots.some(detectHit(hero));
};

/**
 * @param {HeroCoordinates} hero
 * @param {Enemies} enemies
 * @return {boolean}
 */
const gameOver = ({hero, enemies}) => enemies.some(detectCollisions(hero));

export default gameOver;
