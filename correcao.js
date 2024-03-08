"use strict";
function formatarNumero(input) {
    input.value = input.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    const regexCelular = /^(\d{2})(\d{5})(\d{4})$/; // Formato para celular: (DD) 9XXXX-XXXX
    const regexFixo = /^(\d{2})(\d{4})(\d{4})$/; // Formato para telefone fixo: (DD) XXXX-XXXX
    if (input.value.length == 11) {
        input.value = input.value.replace(regexCelular, '($1) $2-$3');
    }
    else {
        input.value = input.value.replace(regexFixo, '($1) $2-$3');
    }
}
function buscarMunicipios() {
    const uf = document.getElementById("estado");
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.value}/municipios`;
    fetch(url)
        .then(response => response.json())
        .then(data => adicionarMunicipio(data))
        .catch(error => alert(error));
}
function adicionarMunicipio(data) {
    //console.log(data);
    let municipioSelect = document.getElementById("municipio");
    municipioSelect.innerHTML = "";
    data.forEach(function (municipio) {
        let option = document.createElement("option");
        option.value = municipio.id;
        option.text = municipio.nome;
        municipioSelect.appendChild(option);
    });
}
function upgrade(select) {
    const containerUpgrade = document.getElementById("veiculosUpgrade");
    const containerNormal = document.getElementById("veiculosPadrao");
    if (select) {
        containerUpgrade.classList.add("esconderElemento");
        containerNormal.classList.remove("esconderElemento");
    }
    else {
        containerUpgrade.classList.remove("esconderElemento");
        containerNormal.classList.add("esconderElemento");
    }
}
function salvar() {
    let matriculaInput = document.getElementById("idMatricula");
    let municipioInput = document.getElementById("municipio");
    let estadoInput = document.getElementById("estado");
    let veiculoInput = document.getElementById("veiculo");
    const dados = {
        matricula: matriculaInput.value,
        municipio: municipioInput.value,
        estado: estadoInput.value,
        veiculo: veiculoInput.value
    };
    var dados_json = JSON.stringify(dados);
    localStorage.setItem("dados", dados_json);
    alert("salvo");
}
