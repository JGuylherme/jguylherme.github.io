function fibonacci(sequencia){
    let n1=0,n2=1,aux=0;
    for(i=0;i<sequencia;i++){
      aux=n1+n2;
      n1=n2;
      n2=aux;
      console.log(n2);
    }
}
  
fibonacci(100);