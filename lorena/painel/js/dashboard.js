async function carregar(){

    const resp =
    await fetch("api/listar.php");

    const dados =
    await resp.json();

    let html = "";

    let vendidos = dados.length;

    document.getElementById("vendidos")
        .innerHTML = vendidos;

    document.getElementById("livres")
        .innerHTML = 50 - vendidos;

    document.getElementById("arrecadado")
        .innerHTML = "R$ " + (vendidos * 20);

    dados.forEach(item=>{

        html += `
        <tr>

            <td>${item.numero}</td>

            <td>${item.nome}</td>

            <td>${item.telefone}</td>

            <td>${item.fralda}</td>

            <td>

                <button
                    class="btn editar"
                    onclick="editar(${item.numero})">

                    Editar

                </button>

                <button
                    class="btn excluir"
                    onclick="excluirNumero(${item.numero})">

                    Excluir

                </button>

            </td>

        </tr>
        `;
    });

    document
    .getElementById("dados")
    .innerHTML = html;
}

async function excluirNumero(numero){

    if(!confirm("Excluir número?"))
        return;

    await fetch(
        "api/excluir.php?id="+numero
    );

    carregar();
}

carregar();