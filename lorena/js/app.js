const grid = document.getElementById("gridRifa");

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

carregarNumeros();

async function carregarNumeros(){

    let vendidos = [];

    try{

        const resp = await fetch("data/rifa.json");
        vendidos = await resp.json();

    }catch{

    }

    grid.innerHTML="";

    for(let i=1;i<=50;i++){

        const item = document.createElement("div");

        const venda = vendidos.find(x => x.numero == i);

        item.className = venda
            ? "numero vendido"
            : "numero";

       item.innerHTML = `
    <b>${String(i).padStart(2,'0')}</b>
    <div style="margin-top:8px;font-size:12px">
        ${tamanhos[i-1]}
    </div>
    <div style="margin-top:8px;color:#d63384;font-weight:bold">
        ${venda ? venda.nome : "Disponível"}
    </div>
`;

        if(!venda){

            item.onclick = () =>
                abrirModal(i,tamanhos[i-1]);
        }

        grid.appendChild(item);
    }
}

function abrirModal(numero,fralda){

    numeroAtual = numero;
    tamanhoAtual = fralda;

    document.getElementById("numeroSelecionado")
            .innerText = numero;

    document.getElementById("fraldaSelecionada")
            .innerText = fralda;

    document.getElementById("modal")
            .style.display="block";
}

function fecharModal(){

    document.getElementById("modal")
            .style.display="none";
}

async function salvarNumero(){

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const dados = {
        numero:numeroAtual,
        nome:nome,
        telefone:telefone,
        fralda:tamanhoAtual
    };

    const resp = await fetch("salvar.php",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(dados)
    });

    const retorno = await resp.json();

    alert(retorno.mensagem);

    fecharModal();

    carregarNumeros();
}