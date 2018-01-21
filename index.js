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

/**
 * @typedef {Object} Actors
 * @property {Stars} stars
 * @property {HeroCoordinates} hero
 */

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 * @return {Actors}
 */
const getActors = (stars, hero) => ({
    stars,
    hero
});

/**
 * @param {Stars} stars
 * @param {HeroCoordinates} hero
 */
const renderScene = ({stars, hero}) => {
    paintStars(stars);
    paintHero(hero);
};

Rx.Observable.combineLatest(stars$, hero$, getActors).subscribe(renderScene);

