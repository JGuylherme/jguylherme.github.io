function isVowel(letter){
    let vowel = 'AEIOUaeiouÁÀÂÃáàâãÉÈÊéèêÍÌÎíìîÓÒÔÕóòôõÚÙÛúùû';
    if (vowel.indexOf(letter) == -1)
        return false;
    else
        return true;
}

let btEdit = document.getElementById("btn2");

btEdit.onclick = function(){
    let txt = text2.value;
    let result = '';
    for (let i =0; i < txt.length; i++) {
        if(isVowel(txt[i]))
            result += '<b>'+txt[i]+'</b>';
        else
            result += txt[i];
    }
    textEdit.innerHTML = result;
}

