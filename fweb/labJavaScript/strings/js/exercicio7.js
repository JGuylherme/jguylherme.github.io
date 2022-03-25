let btFormatDate = document.getElementById("btn7");
btFormatDate.onclick = function(){
    let date = dt2.value;
    let str = date.split("-");
    let day = str[2];
    let month = str[1];
    let year = str[0];

    switch (month) {
        case '01':
            dataFormatada.innerHTML =(`${day} de janeiro de ${year}.`);
            break;
        case '02':
            dataFormatada.innerHTML =(`${day} de fevereiro de ${year}.`);
            break;
        case '03':
            dataFormatada.innerHTML =(`${day} de março de ${year}.`);
            break;
        case '04':
            dataFormatada.innerHTML =(`${day} de abril de ${year}.`);
            break;
        case '05':
            dataFormatada.innerHTML =(`${day} de maio de ${year}.`);
            break;
        case '06':
            dataFormatada.innerHTML =(`${day} de junho de ${year}.`);
            break;
        case '07':
            dataFormatada.innerHTML =(`${day} de julho de ${year}.`);
            break;
        case '08':
            dataFormatada.innerHTML =(`${day} de agosto de ${year}.`);
            break;
        case '09':
            dataFormatada.innerHTML =(`${day} de setembro de ${year}.`);
            break;
        case '10':
            dataFormatada.innerHTML =(`${day} de outubro de ${year}.`);
            break;
        case '11':
            dataFormatada.innerHTML =(`${day} de novembro de ${year}.`);
            break;
        case '12':
            dataFormatada.innerHTML =(`${day} de dezembro de ${year}.`);
            break;
    
        default:
            dataFormatada.innerHTML = ("Request invalid");
            break;
    }
}