
<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

$api = json_decode(file_get_contents('php://input'));
include("../class/commercial.php");
include("../class/endereco.php");
include("../class/imagem.php");

$response ="";
if(!empty($api)){
  switch ($api->request) {   
  case "createCommercial":
    $e = new Address($api->cep, $api->numero, $api->cidade, $api->rua, $api->bairro, $api->estado, $api->local,"","");
    $endereco = $e->convertJson();
    $imagem = new Imagem($api->foto, '../../triboonAssets/perfilComercial/' . $api->idUser . '/');
    $imagem->Upload();
    $commercial = new Commercial($api->nome, $api->categoria, $endereco, $api->instagram, $api->site, $api->facebook, $api->foto, $api->idUser);  
    $resp = $commercial->createCommercial();
    $response = [
    "erro"=> $resp];
    echo json_encode($response);
    break; 
  }

}
?>
