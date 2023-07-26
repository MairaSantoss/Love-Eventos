<?php

include("../class/upload.php");


$img = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mairasantos%252FTriboon/ImagePicker/4922e1d3-cd95-48ac-9987-3626f501f4d4.jpg"; 


$idUser = 1;
$foto = new Uploadimg();

$date = date_create();
$timestamp = date_timestamp_get($date);

//$nomeImagem = $timestamp . "_" . $img['name'];


$foto->uploadImagem($img, '../../triboonAssets/user/' . $idUser . '/', "nomeims.jpg" );



?>