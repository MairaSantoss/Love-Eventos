
<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

$api = json_decode(file_get_contents('php://input'));
include("../class/participant.php");

if(!empty($api)){
  switch ($api->request) {   
  case "select":
    echo Participant::Select($api->idUser);
    break; 
  }

}
?>
