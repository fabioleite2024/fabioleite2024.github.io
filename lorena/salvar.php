<?php

header('Content-Type: application/json; charset=utf-8');

try
{
    $arquivo = __DIR__ . '/data/rifa.json';

    $dados = json_decode(
        file_get_contents("php://input"),
        true
    );

    if(!$dados)
    {
        throw new Exception("Dados inválidos.");
    }

    if(!file_exists($arquivo))
    {
        file_put_contents($arquivo, "[]");
    }

    $lista = json_decode(
        file_get_contents($arquivo),
        true
    );

    if(!$lista)
    {
        $lista = [];
    }

    foreach($lista as $item)
    {
        if($item["numero"] == $dados["numero"])
        {
            echo json_encode([
                "sucesso"=>false,
                "mensagem"=>"Número já reservado."
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
        "mensagem"=>"Reserva realizada com sucesso!"
    ]);
}
catch(Exception $e)
{
    echo json_encode([
        "sucesso"=>false,
        "mensagem"=>$e->getMessage()
    ]);
}