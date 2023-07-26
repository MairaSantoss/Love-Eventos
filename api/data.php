<?php

//include('database.php');

    class Data {
        private $Codigo;
        private $Hora;
        private $Data;
  
        function __construct()
        {          
            date_default_timezone_set('America/Sao_Paulo');
            $data = date('Y-m-d');
            $hora = date('H:i:s');
            $this->Codigo = Null;
            $this->Hora = $hora;
            $this->Data = $data;
        }

        public function getData(){
            return $this->Data;
        }

        public function getHora(){
            return $this->Hora;
        }

        public function getCodigo(){
            return $this->Codigo;
        }


        public function Mostrar(){
            echo "<br>Codigo: " .$this->Codigo;
            echo "<br>Data: ". $this->Data;
            echo "<br>Hora: ". $this->Hora;
        }
        
        public function Cadastro(){
            $banco = new Database();
            $comandoSQL = "Insert into datahora ( hora, data) values ( '$this->Hora', '$this->Data')";   
            return $banco->executarLastId($comandoSQL);              
        }

 
    }

//$g = new Data();
//$g->Cadastro();
//echo $g->inverteData();

?>
