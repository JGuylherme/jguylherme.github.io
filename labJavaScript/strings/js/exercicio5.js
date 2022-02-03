let btSearch = document.getElementById("procurar");
let btSubstitute = document.getElementById("substituir");

btSearch.onclick = function(){
    let str = document.getElementById("termo").value;
    let result = document.getElementById("result");
    let resultStr = result.innerHTML;

    //removendo as antigas marcações
    resultStr = resultStr.replaceAll("<mark>", "");
    resultStr = resultStr.replaceAll("</mark>", "");

    //adicionando novas marcações no texto
    resultStr = resultStr.replaceAll(str, `<mark>${str}</mark>`);
    result.innerHTML = resultStr;
}

btSubstitute.onclick = function(){
    //recuperar o termo procurado
    let str = document.getElementById("termo").value;
    //recuperar o termo procurado
    let substitute = document.getElementById("termoSubstituto").value;
    //substituir   
    let result = document.getElementById("result");
    let resultStr = result.innerHTML;
    resultStr = resultStr.replaceAll(`<mark>${str}</mark>`,substitute);
    result.innerHTML = resultStr;
}