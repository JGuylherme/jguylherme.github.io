function elevado(numero) {
    var resultado = 1;
    for (i=1; i<=30; i++) {
        resultado = resultado * numero;
        console.log(resultado);
    }
}

elevado(4);