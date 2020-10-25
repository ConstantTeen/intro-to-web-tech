addEventListener('message',(ev)=>{
    let my_pi = calc_pi(ev.data['n']);

    postMessage({pi: my_pi});
});

function calc_pi(n){
    let eps = 10**(-n - 1);
    let current_sum = 4;
    let previous_sum = 0;
    let k = 0;

    while (Math.abs(current_sum - previous_sum) > eps){
        k+= 1;
        previous_sum = current_sum;
        current_sum+= 4*(-1)**k/(2*k+1);
    }

    return [Math.floor(current_sum * 10**n) / 10**n,k];
}