import {calc_pi, print_scope} from "./utils.js"

print_scope.call(self, 'Worker1');

addEventListener('message',(ev)=>{
    let my_pi = calc_pi(ev.data['n']);
    postMessage({pi: my_pi});
});