<?php

$id = $_GET["id"];

$arquivo = "../../data/rifa.json";

$dados =
json_decode(
file_get_contents($arquivo),
true
);

$novo=[];

foreach($dados as $item)
{
    if($item["numero"] != $id)
    {
        $novo[] = $item;
    }
}

file_put_contents(
$arquivo,
json_encode(
$novo,
JSON_PRETTY_PRINT |
JSON_UNESCAPED_UNICODE
));
