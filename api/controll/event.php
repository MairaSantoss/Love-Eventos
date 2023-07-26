<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

$api = json_decode(file_get_contents('php://input'));
include("../class/event.php");
include("../class/endereco.php");
include("../class/imagem.php");

$response="";
if(!empty($api)){
  switch ($api->request) {   
    case "read":  
      echo Event::Read($api->idUser, $api->carrossel, $api->latitude, $api->longitude );
    break;
    case "select":     
      echo Event::Select($api->idEvento);
    break;
    case "interestedUser":     
      echo Event::interestedEvent($api->interested);
    break;
    case "EventProximed":     
      echo Event::interestedEvent($api->interested);
    break;
    case "likeDeslike":     
      echo Event::likeDeslike($api->idUser , $api->idEvento);
    break;
    case "UpdateSliderMedidorInteresse":     
      echo Event::UpdateSliderMedidorInteresse($api->idUser , $api->idEvento,  $api->comand);
    break;
    case "getInterestedUser":     
      echo Event::getInterestedUser($api->idUser , $api->idEvento);
    break;
    case "getCategoria":     
      echo Event::getCategoria();
    break; 
    case "createEvent":        
      $e = new Address($api->cep, $api->numero, $api->cidade, $api->rua, $api->bairro, $api->estado, $api->local,"","");
      $cordenada = $e->getCordenada();
      $e->setLatitude($cordenada['lat']);
      $e->setLongitude($cordenada['lon']);
      $endereco = $e->convertJson();
      $event = new Event($api->idUser,"", "", $api->nome, $api->descricao, "fotocaminho" , $endereco, $api->limiteParticipante, "", "");  
      $resp = $event->createEvent();
      $response = [
      "erro"=> $resp];
      echo json_encode($response);
      //IMG 
      //IMG
      //IMG
      //precisa capturar o id do evento e colocar a imagem 
      //$imagem = new Imagem($api->foto, '../../triboonAssets/evento/banner/' . $api->idUser . '/');
      //$imagem->Upload();
     // echo json_encode(["sds",$api]);
    break; 
    case "myEvent":
      echo Event::myEvent($api->idUser);
    break; 
    case "cancelEvent":
      echo Event::cancelEvent($idUser, $motivation, $idEvent);
    break; 
  }
}

?>



