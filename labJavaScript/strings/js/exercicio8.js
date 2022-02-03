function distanceInWeeks(date1,date2) {
    return Math.abs(Math.round((date2-date1)/(7*24*60*60*1000)));
}

let btDistanceBetweenDates = document.getElementById("btn8");
btDistanceBetweenDates.onclick = function(){
    var date1 = new Date(dt3.value);
    var date2 = new Date(dt4.value);
    let distance = distanceInWeeks(date1,date2);
    distanciaEntreDatas.innerHTML = (`${distance} semana(s)`)
}

