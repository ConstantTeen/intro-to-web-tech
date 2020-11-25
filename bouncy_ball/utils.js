function y_x(x){
    let k = Math.floor((x - x0)/dx);

    if(k % 2 === 0){
        return y0 - g/2*(x/v0 - (x0 + k*dx)/v0)**2;
    }

    return y0 - g/2*(x/v0 - (x0 + (k+1)*dx)/v0)**2;
}

function timing(timeFraction) {
    return v0/1000*timeFraction;
}

function draw(progress) {
    let current_x = x0 + (600 - x0) * progress;
    let inversed_y = y_x(current_x);
    let current_y = 400 - inversed_y;
    let coef;
    let radiusX = r;
    let radiusY = r;

    if(inversed_y < r/2){
        current_y = 400 - r/2;
        coef = 0.75;
        radiusY*= coef
    }else if(inversed_y < r){
        coef = inversed_y/r;
        radiusY*= coef
    }else{
        coef = 1;
    }

    ctx.clearRect(0,0,600,400);
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.scale(1, coef);
    ctx.beginPath();
    ctx.ellipse(current_x, current_y/coef, radiusX, radiusY, 0, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    ctx.stroke();

    ellipse.setAttribute('cx', current_x + 'px');
    ellipse.setAttribute('cy', current_y + 'px');
    ellipse.setAttribute('rx', radiusX + 'px');
    ellipse.setAttribute('ry', radiusY + 'px');
}

function animate({duration, draw, timing}){
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress, duration);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

