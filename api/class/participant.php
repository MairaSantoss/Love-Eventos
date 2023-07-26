<?php

include('../database/index.php');

    class Participant {
        private $name;
        private $lastname;
        private $cpf_cnpj;
        private $cell;
        private $email;
        private $password;
        private $photograph;

        function __construct($name, $lastname, $cpf_cnpj, $cell, $email, $password, $photograph)
        {
            $this->name = $name;
            $this->lastname = $lastname;
            $this->cpf_cnpj = $cpf_cnpj;
            $this->cell = $cell;
            $this->email = $email;
            $this->password = $password;
            $this->photograph = $photograph;
        }

        public function getName(){
            return $this->name;
        }

        public function getLastname(){
            return $this->lastname;
        }

        public function getCpf_cnpj(){
            return $this->cpf_cnpj;
        }

        
        public function getCell(){
            return $this->cell;
        }

        
        public function getEmail(){
            return $this->email;
        }

        public function getPassword(){
            return $this->password;
        }

        public function getPhotograph(){
            return $this->photograph;
        }

        public function Mostrar(){
            echo "<br>Nome: " .$this->name;
            echo "<br>Sobrenome: ". $this->lastname;
            echo "<br>Cpf_cnpj: ".$this->cpf_cnpj;
            echo "<br>Celular: ".$this->cell;
            echo "<br>Email: ".$this->email;
            echo "<br>Senha: ".$this->password;
            echo "<br>Foto: ".$this->photograph;
        }

        public static function Select($id){
            $idUser = 0;
            $var = pdo_fetch_object(pdo_query("SELECT * FROM `participante` WHERE idParticipante = $id"));
            $data = Participant::Array($var); 
            return json_encode($data);  
        }

        //  'id' => $e->idEvento, 'horaInicial' => $datetime->horaInicial,
        public static function Array($var){
            $data=[];
            foreach ( $var as $e ) {                                                                     
                $redes = json_decode( $e->redes);
                $telefone = json_decode( $e->telefone); 
                    $data[] = array (
                        'idParticipante' => $e->idParticipante, 'email' => $redes->email,
                        'nome' => $e->nome, 'sobrenome' => $e->sobrenome, 'foto' => $e->foto                   
                    ); }                  
            return $data; } 


       /* public function Cadastro(){
            $banco = new Database();
            $comandoSQL = "Insert into noticia (titulo, descricao, foto, visualizacao, autor, veiculo, data) values ( '$this->Titulo', '$this->Descricao', '$this->Foto', '$this->Visualizacao', '$this->Autor', '$this->Veiculo', '$this->Datetime' )";   
           return  $respostaBanco = $banco->executar($comandoSQL);
           
        }

        public static function Visualizacao($id, $qtd) {
            $banco = new Database();
            $visu = (int)$qtd + 1;   
            $comandoSQL = "UPDATE noticia SET visualizacao='$visu' WHERE id=$id";   
            $banco->executar($comandoSQL);
        }


        public static function Noticias() {
            $banco = new Database();
            $arrayNoticia = array();
            $comandoSQL = "Select * from noticia";
            $noticias = $banco->selecionar($comandoSQL);
     
            foreach($noticias->fetchAll() as $k=>$v)  { 
              $noticia = $v['titulo'];
              $arrayNoticia[] = $noticia;
            }
            
          //return $arrayNoticia;
           $result = json_encode($arrayNoticia);
           echo $result;
         }  

         public static function Apagar($id) {
            $banco = new Database();
            $comandoSQL = "DELETE FROM noticia WHERE id=$id";
            return $respostaBanco  = $banco->executar($comandoSQL);
         }  

         public static function Editar($id, $autor, $foto, $titulo, $descricao, $veiculo) {
            $banco = new Database();
            $comandoSQL =  "UPDATE noticia SET autor='$autor' , foto='$foto', titulo='$titulo', descricao='$descricao', veiculo='$veiculo' WHERE id= $id";
            return $respostaBanco  = $banco->executar($comandoSQL);
         }   */

    }

//$g = new Participant("Harry Potter","Suspense, ","dsd","dsd","dsd","dsd","dsd", );
//$g->Mostrar();
//Noticia::Noticias();

?>
