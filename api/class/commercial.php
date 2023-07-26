<?php

include('../database/index.php');

    class Commercial {
        private $name;
        private $instagram;
        private $site;
        private $facebook;
        private $category;
        private $address;
        private $photo;
        private $idUser;

        function __construct($name, $category, $address,$instagram,$site,$facebook,$photo, $idUser)
        {
            $this->name = $name;
            $this->instagram = $instagram;
            $this->site = $site;
            $this->facebook = $facebook;
            $this->category = $category;
            $this->address = $address;
            $this->photo = $photo;
            $this->idUser = $idUser;  
        }

        public function getName(){
            return $this->name;
        }

        public function getNetworks(){
            return $this->networks;
        }

        public function getcategory(){
            return $this->category;
        }
     
        public function getAddress(){
            return $this->address;
        }

       
        public static function convertJsonRedes($instagram, $site, $facebook){
            $redes = ['instagram'=>$instagram,'facebook'=>$facebook,'site'=>$site];
             return json_encode($redes, JSON_UNESCAPED_UNICODE);
        }

        public function createCommercial(){            
            $redes = Commercial::convertJsonRedes($this->instagram, $this->site, $this->facebook);       
            $exec = pdo_query("insert into comercial (idComercial, nome, redes, categoria,endereco,foto, idPessoa) values (null,'".$this->name."','".$redes."','".json_encode($this->category)."', '".$this->address."', '".$this->photo."', '".$this->idUser."')" ); 
            echo "ma";
            var_dump($exec);
        }


    }

    //($name, $category, $address,$instagram,$site,$facebook,$photo, $idUser)

$g = new Commercial("Shopping americanas","[1,3]","{}","@shopping","https//sla","facebookshoppintg", "foto", 5 );
$g->createCommercial();

//var_dump($g);
?>

