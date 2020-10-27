importScripts("utils.js");

addEventListener('message',(ev)=>{
    let my_pi2 = calc_pi2(ev.data['n']);
    postMessage({pi2: my_pi2});
});
