let btReverse = document.getElementById("btn1");

btReverse.onclick = function(){
    str = text.value;
    textReversed.innerHTML = str.split('').reverse().join('');
}

