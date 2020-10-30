import {print_scope} from "./utils.js";

print_scope.call(globalThis, 'myscript');

let w1 = new Worker('worker1.js',{type: "module"});

w1.addEventListener('message',(ev)=>{
    let pi = ev.data['pi'];

    console.log('pi:', pi);
});
w1.postMessage({n: 6}); // для n == 8 уже не справляется

let w2 = new Worker('worker2.js',{type: "module"});

w2.addEventListener('message',(ev)=>{
    let pi2 = ev.data['pi2'];

    console.log('pi2:',pi2);
});
w2.postMessage({n: 8});

draw_coordinates();

if (!!window.SharedWorker) {
    let sw = new SharedWorker('shared_worker.js',{type:"module"});

    sw.port.addEventListener('message', ev => {
        clear_canvas();

        let coords = ev.data['output'];
        let message = ev.data['message'];

        draw(coords);
        if(!!message) console.log(message);
    });

    document.getElementById('canvas').addEventListener('click',(e) => {
        sw.port.postMessage('zdarova');
    });
    sw.port.start();

}

function draw_coordinates(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let w = +canvas.getAttribute('width');
    let h = +canvas.getAttribute('height');

    ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
    ctx.lineWidth = 2.0; // Ширина линии
    ctx.beginPath(); // Запускает путь
    ctx.moveTo(0.06*w, 0.002*h); // Указываем начальный путь
    ctx.lineTo(0.06*w, 0.92*h); // Перемешаем указатель
    ctx.lineTo(w, 0.92*h); // Ещё раз перемешаем указатель
    ctx.stroke(); // Делаем контур

    for(let i=0; i < 6; i++){
        ctx.fillText(i/5 + "", 4, 0.92*h - i*0.1836*h + 8);
        ctx.beginPath();
        ctx.moveTo(0.05*w, 0.92*h - i*0.1836*h);
        ctx.lineTo(0.06*w, 0.92*h - i*0.1836*h);
        ctx.stroke();
    }

    for(let i=0; i<6; i++) {
        ctx.fillText(i/5 + "", 0.06*w + i/5*0.94*w - 8, 0.95*h);
    }
}

function draw(coords){
    if(!coords) return;

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let w = +canvas.getAttribute('width');
    let h = +canvas.getAttribute('height');

    ctx.strokeStyle = "grey";

    for(let i = 0; i < coords.length - 1; i++) {
        let x = coords[i][0];
        let y = coords[i][1];
        let next_x = coords[i+1][0];
        let next_y = coords[i+1][1];

        ctx.beginPath();
        ctx.moveTo(0.06*w + x*0.94*w, 0.92*h - y*0.918*h);
        ctx.lineTo(0.06*w + next_x*0.94*w, 0.92*h - next_y*0.918*h);
        ctx.stroke();
    }
}

function clear_canvas(){
    let canv = document.getElementById('canvas');
    const context = canv.getContext('2d');

    context.clearRect(0, 0, canv.width, canv.height);
    draw_coordinates();
}

function greetings(){
    return 'Hello there!';
}

export default greetings;