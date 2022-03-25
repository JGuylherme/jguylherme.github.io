let btTenisPolar = document.getElementById("btn10");
function changeLetter(letter){
    let tenis = ['t','e','n','i','s','T','E','N','I','S'];
    let polar = ['p','o','l','a','r','P','O','L','A','R'];
    for (let i=0; i<10; i++){
        if (letter == tenis[i])
            letter = polar[i];
        else if(letter == polar[i])
            letter = tenis[i];
    }
    return letter;
}

btTenisPolar.onclick = function(){
    let txtAlter = text10.value.split('');

    for (let i=0; i<txtAlter.length; i++) {
        txtAlter[i] = changeLetter(txtAlter[i]);
    }
    txtAlter = txtAlter.join('')
    console.log(txtAlter);
    tenisPolar.innerHTML = txtAlter;
}