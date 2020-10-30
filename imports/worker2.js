import {calc_pi2, print_scope} from "./utils.js"

print_scope.call(self, 'Worker2');

addEventListener('message',(ev)=>{
    let my_pi2 = calc_pi2(ev.data['n']);
    postMessage({pi2: my_pi2});
});
