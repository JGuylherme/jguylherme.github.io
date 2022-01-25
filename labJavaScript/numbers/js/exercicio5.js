function ehPrimo(numero) {
    for (let divisor=2; divisor<=Math.sqrt(numero); divisor++)
        if (numero % divisor == 0) 
            return false;
    return true;
}

function imprimePrimos(inicio,fim) {
    for (let i=inicio;i<=fim;i++) {
         if(ehPrimo(i)) 
            console.log(i);
    }
}

imprimePrimos(2,1000);