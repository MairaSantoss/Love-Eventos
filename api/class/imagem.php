<?php

class Imagem
{

    private $Imagem;
    private $Diretorio;
 
    function __construct( $Imagem, $Diretorio)
    {
        $this->Imagem = $Imagem;
        $this->Diretorio = $Diretorio;
    }
    
    
    public function Upload()
    {    
        $img = $this->Imagem;
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $diretorio = $this->Diretorio;  
        if(!file_exists($diretorio) && !is_dir($diretorio)){
            mkdir($diretorio, 0755, true); }    
        file_put_contents($diretorio.strtotime('now').'image.png', $data);
    }


}
