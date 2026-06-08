<?php

header('Content-Type: application/json');

$arquivo = "data/rifa.json";

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

$lista = [];

if(file_exists($arquivo))
{
    $lista = json_decode(
        file_get_contents($arquivo),
        true
    );
}

foreach($lista as $item)
{
    if($item["numero"] == $dados["numero"])
    {
        echo json_encode([
            "sucesso"=>false,
            "mensagem"=>"Número já vendido."
        ]);
        exit;
    }
}

$lista[] = $dados;

file_put_contents(
    $arquivo,
    json_encode(
        $lista,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_UNICODE
    )
);

echo json_encode([
    "sucesso"=>true,
    "mensagem"=>"Número reservado com sucesso!"
]);