let btMostOcurrences = document.getElementById("btn4");

btMostOcurrences.onclick = function(){
    let array = text4.value.split(' ');
    let occurrences = [];
    let most ={
        name: 0,
        qtn: 0
    };

    for(let i=0; i<array.length ; i++){
        occurrences[i] = occurrence(text4.value,array[i]);
    }

    for(let i = 0; i<occurrences.length; i++){
        if (occurrences[i] > most.qtn) {
            most.name = array[i];
            most.qtn = occurrences[i];
        }
    }

    maiorOcorrencia.innerHTML = (`${most.name} - ${most.qtn} vezes`);
}

function occurrence(txt, word) {
    let array = txt.split(' ');
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if (word === array[i]) {
            count++
        }
    }
    return count;
}