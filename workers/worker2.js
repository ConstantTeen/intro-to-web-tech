addEventListener('message',(ev)=>{
    let my_pi2 = calc_pi_square(ev.data['n']);
    postMessage({pi2: my_pi2});
});

function calc_pi_square(n){
    let eps = 10**(-2*n - 1);
    let current_sum = 8/3;
    let previous_sum = 0;
    let k = 0;

    while (Math.abs(current_sum - previous_sum) > eps){
        k+= 1;
        previous_sum = current_sum;
        current_sum+= 8/(4*k+1)/(4*k+3);
    }

    return [Math.floor(current_sum * 10**n) / 10**n,k];
}
