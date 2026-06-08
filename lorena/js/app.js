const grid = document.getElementById("gridRifa");

const CHAVE = "rifa_lorena";

let numeroAtual = 0;
let tamanhoAtual = "";

const tamanhos = [

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",

"Fralda P + 1 Mimo",



"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",



"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",

"Fralda M + 1 Mimo",



"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",



"Fralda G + 1 Mimo",

"Fralda G + 1 Mimo",



"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo",

"Fralda XG + 1 Mimo"

];

function obterDados() {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

function salvarDados(dados) {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
}

function carregarNumeros() {

    const vendidos = obterDados();

    grid.innerHTML = "";

    for(let i = 1; i <= 50; i++) {

        const venda = vendidos.find(x => x.numero === i);

        const item = document.createElement("div");

        item.className = venda
            ? "numero vendido"
            : "numero";

        item.innerHTML = `
            <b>${String(i).padStart(2,'0')}</b>
            <br>
            Fralda ${tamanhos[i - 1]}
            <br>
            <small>
                ${venda ? venda.nome : "Disponível"}
            </small>
        `;

        if(!venda) {
            item.onclick = () =>
                abrirModal(i, tamanhos[i - 1]);
        }

        grid.appendChild(item);
    }
}

function abrirModal(numero, fralda) {

    numeroAtual = numero;
    tamanhoAtual = fralda;

    document.getElementById("numeroSelecionado").innerText = numero;
    document.getElementById("fraldaSelecionada").innerText = fralda;

    document.getElementById("modal").style.display = "block";
}

function fecharModal() {

    document.getElementById("modal").style.display = "none";

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
}

function salvarNumero() {

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    if(nome === "") {
        alert("Informe o nome.");
        return;
    }

    let dados = obterDados();

    const existe =
        dados.find(x => x.numero === numeroAtual);

    if(existe) {
        alert("Número já reservado.");
        return;
    }

    dados.push({
        numero: numeroAtual,
        nome: nome,
        telefone: telefone,
        fralda: tamanhoAtual,
        data: new Date().toLocaleString()
    });

    salvarDados(dados);

    fecharModal();

    carregarNumeros();

    alert("Número reservado com sucesso!");
}

function limparRifa() {

    if(confirm("Deseja apagar todos os números?")) {

        localStorage.removeItem(CHAVE);

        carregarNumeros();
    }
}

carregarNumeros();
