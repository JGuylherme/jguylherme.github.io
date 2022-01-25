function fatorial(numero) {
    if (numero < 0) {
        console.log('Numero Invalido')
    }
    else{
        let resultado = numero;
        for (i = 1; i<numero ;i++) {
            resultado = resultado*(numero-i);
        }
        console.log(resultado);
    }
}

fatorial(12);