/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {function(number,number, number, string, string): void}
 */
const getDrawTriangle = ctx => (x, y, width, color, direction) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
};

export default getDrawTriangle;

