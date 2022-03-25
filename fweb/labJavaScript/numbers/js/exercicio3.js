function somaPar(final) {
    let soma=0;
    for (i=0 ; i<=final; i++) {
        if(i%2==0) soma=i+soma
    }
    console.log(soma);
}

somaPar(1000);