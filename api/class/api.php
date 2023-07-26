<?php
        
        class Api{
          
            function __construct()
            {                 
            }
    

         public function get_endereco($cep){          
            $cep = preg_replace("/[^0-9]/", "", $cep);
            $url = "http://viacep.com.br/ws/$cep/xml/";       
            $xml = simplexml_load_file($url);
            return $xml;
            // tbm pode dar acho assim 
            // echo $xml->logradouro;
          }
        }


        $g = new Api();
            echo json_encode($g->get_endereco("19045-250"));


?>
       