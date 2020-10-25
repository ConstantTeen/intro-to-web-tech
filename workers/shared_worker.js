onconnect = (e) => {
    let port = e.ports[0];

    port.addEventListener("message", () => {
        get_coords();
        port.postMessage({output: (coordinates)});
    });

    port.start();
};

let coordinates = [];
let a = 0;
let b = 1;
let N = 50;
let h = (b - a)/N;
let i = 0;

function get_coords(){
    i++;
    if(i > N){
        i = 0;
        coordinates = [];
        return false;
    }
    let x = Math.floor(1e4*(a + i*h))/1e4;

    coordinates.push( [x, f(x)] );
    return true;
}

function f(x){
    return Math.floor(x**2*1e4)/1e4;
}