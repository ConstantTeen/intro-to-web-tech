importScripts("utils.js");

addEventListener('message',(ev)=>{
    let my_pi = calc_pi(ev.data['n']);
    postMessage({pi: my_pi});
});