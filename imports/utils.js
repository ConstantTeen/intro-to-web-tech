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

    return Math.floor(current_sum * 10**n) / 10**n;
}

function calc_pi2(n){
    let eps = 10**(-2*n - 1);
    let current_sum = 8/3;
    let previous_sum = 0;
    let k = 0;

    while (Math.abs(current_sum - previous_sum) > eps){
        k+= 1;
        previous_sum = current_sum;
        current_sum+= 8/(4*k+1)/(4*k+3);
    }

    return Math.floor(current_sum * 10**n) / 10**n;
}

function print_scope(scope_name){
    let message = `${scope_name} node starts working in `+ String(this) + ' scope.';
    console.log(message);

    return message;
}

export {calc_pi,calc_pi2,print_scope};