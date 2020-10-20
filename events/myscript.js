"use strict";


class Flower{
    _state = 0b00000; // 1 на i-й позиции означает отсутствие i-го лепестка
    _feelings = true;

    /**
     * Удаляет n-й по счету лепесток. Отсчет от самого
     * нижнего, против часовой стрелки.
     */
    delete_petal(n){
        if(n >= 1 && n <= 5){
            let tmp = Math.floor(2**(5 - n));
            this._state = this._state | tmp;

            this._feelings = !this._feelings;
        }
    }

    reset(){
        if(arguments.length === 1){
            this._feelings = !!arguments[0];
        }
        if(arguments.length <= 1){
            this._state = 0b00000;
        }
    }

    get_state(){
        let str = this._state.toString(2);
        let n = str.length;

        if(n < 5){
            for(let i = 0; i < (5-n); i++){
                str = "0" + str;
            }
        }
        return str;
    }

    get_image_path(){
        let flower_state = this.get_state();

        return 'photos/' + flower_state + '.png';
    }

    get_feelings(){
        return this._feelings ? 'Любит' : 'Не любит';
    }

    change_init_feelings(){
        let f = !this._feelings;

        if(this._state === 0){
            this._feelings = f;
            return;
        }
        this.reset(f);
    }
}


function set_petals(){
    delete_all_petals();

    let petals_div = document.querySelector('.petals');

    for(let i=1; i < 6; i++){
        let p = document.createElement('div');

        p.id = 'petal' + i;
        p.addEventListener('click', (event) => {
            flower.delete_petal(i);
            event.currentTarget.remove();
        });
        petals_div.appendChild(p);
    }

    let central_petal = document.createElement('div');

    central_petal.id = 'central-petal';

    central_petal.addEventListener('click', () => {
        flower.reset();
        delete_all_petals();
        set_petals();
    });

    petals_div.appendChild(central_petal);
}

function delete_all_petals(){
    let petals_div = document.querySelector('.petals');

    while (petals_div.firstChild) {
        petals_div.removeChild(petals_div.lastChild);
    }
}

let flower = new Flower();

set_petals();

let image = document.getElementById('image-wrapper');

image.addEventListener('click', () => {
    let path = flower.get_image_path();
    let img = document.querySelector('#image-wrapper > img');
    let feelings_h1 = document.querySelector('.state > h1');

    img.src = path;
    feelings_h1.innerHTML = `${flower.get_feelings()}`;
}, {capture: false});

const feelings_colors = ["gray",'#f52d71'];
let feelings_div = document.querySelector('.state');

feelings_div.addEventListener('click', ()=>{
    flower.change_init_feelings();
},{capture: true});

let feelings_h1 = document.querySelector('.state > h1');

feelings_h1.addEventListener('click', (e) => {
    e.target.innerHTML = `${flower.get_feelings()}`;
})

feelings_div.addEventListener('DOMSubtreeModified', (e)=>{
    e.currentTarget.style.background = feelings_colors[+(flower.get_feelings() === 'Любит')];
})

window.addEventListener('touchmove', (e) => {
    console.log('I will not prevent default');
}, {passive:true})