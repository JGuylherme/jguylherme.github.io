let iptPassword = document.getElementById("senha");

iptPassword.onkeyup = function() {
    let status = document.getElementById("status");
    status.innerHTML = "Senha Fraca";
    status.style.color = "red";
    let password = iptPassword.value;

    if(isUpperCase(password) && isLowerCase(password) && IsNumber(password)){
        status.innerHTML = "Senha Moderada";
        status.style.color = "orange";
    }
    if(isUpperCase(password) && isLowerCase(password) && IsNumber(password) && IsSpecialDigit(password)){
        status.innerHTML = "Senha Forte";
        status.style.color = "green";
    }
}

function isUpperCase(password) {
    for(let i = 0; i < password.length; i++){
        if(password.charCodeAt(i)>=65 && password.charCodeAt(i) <= 90)
            return true;
    }
    return false;
}
function isLowerCase(password) {
    for(let i = 0; i < password.length; i++){
        if(password.charCodeAt(i)>=97 && password.charCodeAt(i) <= 122)
            return true;
    }
    return false;
}

function IsNumber(password) {
    for(let i = 0; i < password.length; i++){
        if(password.charCodeAt(i)>=48 && password.charCodeAt(i) <= 57)
            return true;
    }
    return false;
}
function IsSpecialDigit(password) {
    for (let i=0; i<password.length; i++){
        if('@#!$%&*,-+.='.indexOf(password.charAt(i)) != -1) return true;
    }return false;
}