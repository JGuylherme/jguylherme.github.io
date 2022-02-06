function daysOfLife(data) {
    var date = new Date(data);
    var dateNow = new Date(); 

    if(date > dateNow) {
        return -1;
    }
    else{
        var seconds = Math.abs(dateNow - date) / 1000;

        var days = Math.trunc(seconds/(60*60*24));
        return days;
    }
}
let btDaysOfLife = document.getElementById("btn6");

btDaysOfLife.onclick = function(){
    var date = dt1.value;
    let days = daysOfLife(date);
    if(days == -1){
        diasDeVida.innerHTML = (`Data inválida!`);
    }else{
    diasDeVida.innerHTML = (`${days} dia(s) de vida.`);
    }
}