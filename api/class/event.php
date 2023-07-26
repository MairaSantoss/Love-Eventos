<?php

include('../database/index.php');

    class Event {
        private $idPeople;
        private $datetime;
        private $category;
        private $name;
        private $description;
        private $photograph;
        private $limitParticipant;
        private $status;
        private $engajament;
        //
        private $address;
        //

        function __construct($idPeople, $datetime, $category, $name, $description, $photograph, $address, $limitParticipant, $status, $engajament)
        {
            $this->idPeople = $idPeople;
            $this->datetime = $datetime;
            $this->category = $category;
            $this->name = $name;
            $this->description = $description;
            $this->photograph = $photograph;
             $this->address = $address;
            $this->limitParticipant = $limitParticipant;       
            $this->status = $status;  
            $this->engajament = $engajament;  
        }

    public function getDatetime(){
        return $this->datetime;
    }

    public function getStatus(){
        return $this->status;
    }

    public function getEvent(){
        return $this->event;
    }

    
    public function getPhotograph(){
        return $this->photograph;
    }

    
    public function getAddress(){
        return $this->address;
    }

    public function Print(){
        echo "<br>Data e hora: " .$this->datetime;
        echo "<br>Foto: ".$this->photograph;
        echo "<br>Endereco: ".$this->address; }      

        
    public static function StatusEvent($status){
        if($status->status == "Em andamento") return ["Em andamento", "#4153F2"]; 
        elseif ($status->status == "Cancelado") return ["Cancelado", "#E90606"];  
        elseif ($status->status == "Concluido") return ["Concluído", "#06E91D"];
        else return " ";   }



//update evento set status = JSON_SET(status, "$.motivo, $.status", "maireaaa ID2","sasas") where idEvento = 120;



    public static function Array($var, $idUser){
        $data=[];
        foreach ( $var as $e ) {                                                                     
            $datetime = json_decode( $e->datetime);
            $_status = json_decode( $e->status);
            $status = Event::StatusEvent($_status);  
            $event = json_decode( $e->evento);     
            $address = json_decode( $e->endereco); 
            $engagement = json_decode( $e->engajamento);    
            $corLike = 0;
            if (in_array($idUser, $engagement->like ) &&  in_array($idUser, $engagement->like ) != null)
            { $corLike = 1;  }
                $data[] = array (
                    'id' => $e->idEvento, 'horaInicial' => $datetime->horaInicial,
                    'horaFinal' => $datetime->horaFinal, 'dataInicial' => $datetime->dataInicial,
                    'dataFinal' => $datetime->dataFinal, 'status' => $status,
                    'titulo' => $event->titulo, 'descricao' => $event->descricao,
                    'organizador' => $event->organizador,'fotoOrganizador' => $event->fotoOrganizador,
                    'foto' => $e->foto, 'local' => $address->local,
                    'cep' => $address->cep,'rua' => $address->rua,
                    'bairro' => $address->bairro,'cidade' => $address->cidade,
                    'estado' => $address->estado, 'numero' => $address->numero,
                    'like' =>  count($engagement->like),
                    'interesse' =>  count($engagement->interesse),
                    'interessados' => $engagement->interesse,'longitude' => $address->longitude,
                    'latitude' => $address->latitude, 'corLike'=>$corLike ); }
        return $data; } 


    public static function Read($idUser, $carrossel, $latitude, $longitude) {         
        $lat = (float) $latitude;
        $long = (float) $longitude;
        $sql="";
        $data = [];
        switch ($carrossel){ 
            case 1: $sql = "SELECT * FROM `evento` Order by json_extract(engajamento,'$.interesse') desc limit 5";
            break;   
            case 2: 
                if ($latitude != null && $longitude != null){
                $sql = "SELECT *, ( 3959 * acos( cos( radians($lat) )
                * cos( radians( json_extract(endereco,'$.latitude') ) ) 
                * cos( radians( json_extract(endereco,'$.longitude') ) 
                - radians($long) ) + sin( radians($lat) ) 
                * sin(radians(json_extract(endereco,'$.latitude'))) ) ) 
                AS distance FROM evento HAVING distance < 50 "; }
                else { return json_encode($data); }
            break; 
            case 3: $sql = "SELECT * FROM `evento` WHERE json_extract(evento,'$.categoria') = 11";
            break;  }
        $var = pdo_fetch_object(pdo_query($sql));
        $data = Event::Array($var, $idUser); 
        return json_encode($data);    }


    public static function Select($id){
        $idUser = 0;
        $var = pdo_fetch_object(pdo_query("SELECT * FROM `evento` WHERE idEvento = $id"));
        $data = Event::Array($var, $idUser); 
        return json_encode($data);  
    }


    public static function interestedEvent($people) {
        $dataVazio = []; $data = [];
        foreach ( $people as $e ) {              
            $var = pdo_fetch_object(pdo_query("SELECT * FROM `participante` WHERE idParticipante = $e"));                                 
            foreach ( $var as $e ) {   
                $data[] = array (
                    'idUser' => $e->idParticipante,
                    'fotoUser' => $e->foto,
                    );  }   }   
        if(count($data) == 0) return json_encode($dataVazio);     
        else  return json_encode($data); }


    public static function likeDeslike($idUser, $idEvento) {
        $peoples = [];
        $var = pdo_fetch_object(pdo_query("SELECT engajamento FROM `evento` where idEvento = $idEvento"));
            foreach ( $var as $e ){  
                $engagement = json_decode( $e->engajamento);  
                foreach ( $engagement->like as $key => $pessoa )
                    { if($pessoa == $idUser){                           
                        $exec = pdo_query("update evento set engajamento = JSON_REMOVE(engajamento, '$.like[$key]') where idEvento = $idEvento");                        
                        return; }  
                    }      
                    $exec = pdo_query("update evento set engajamento = JSON_ARRAY_APPEND(engajamento, '$.like', $idUser) where idEvento = $idEvento");
                    return;  }  }   
                


    public static function UpdateSliderMedidorInteresse($idUser, $idEvento , $comand ) {
        $grau="";      
        switch ($comand){   
        case 0: $grau = "none"; break;        
        case 1: $grau = "baixoInteresse"; break;
        case 2: $grau = "medioInteresse"; break;
        case 3: $grau = "interesse"; break; }
        $var = pdo_fetch_object(pdo_query("SELECT engajamento FROM `evento` where idEvento = $idEvento"));
        foreach ( $var as $e ){  
            $engagement = json_decode( $e->engajamento);   } 
        $i=1;  $array="";
        while($i <= 3){             
            if($i == 1){ $array="interesse";}                                                
            elseif($i == 2){ $array="baixoInteresse";  }                                                 
            elseif($i == 3){ $array="medioInteresse"; }    
            else{}
            if (in_array($idUser, $engagement->$array ))   {                                       
                $key = array_search($idUser, $engagement->$array);                                      
                $exec = pdo_query("update evento set engajamento = JSON_REMOVE(engajamento, '$." . $array . "[" . $key . "]" . "') where idEvento = $idEvento");
                if($comand != "none"){                
                    $exec = pdo_query("update evento set engajamento = JSON_ARRAY_APPEND(engajamento, '$.$grau', $idUser) where idEvento = $idEvento");}                                                    
                return;
            }   $i+=1;   }  
        $exec = pdo_query("update evento set engajamento = JSON_ARRAY_APPEND(engajamento, '$.$grau', $idUser) where idEvento = $idEvento");   
        return;  }  

    public static function getInterestedUser($idUser, $idEvento) {
        $response = ["interesse"=> 156  ];
        $var = pdo_fetch_object(pdo_query("SELECT engajamento FROM `evento` where idEvento = $idEvento"));
        foreach ( $var as $e ){  
            $engagement = json_decode( $e->engajamento);   } 
        $i=1;  $array="";
        while($i <= 3){                                                          
            if($i == 1){ $array="baixoInteresse";  }                                                 
            elseif($i == 2){ $array="medioInteresse"; }    
            elseif($i == 3){ $array="interesse";}   
            else{}
            if (in_array($idUser, $engagement->$array ))   {   
                $response = ["interesse"=> $i ];                                                                                                                                                    
                return json_encode($response);
            }   $i+=1;   }                  
        return json_encode($response); }  



    public static function getCategoria() {
        $data=[];
        $var = pdo_fetch_object(pdo_query("SELECT * FROM `categoria`"));    
        foreach ( $var as $e ) {                                                                     
            $data[] = array ('id' => $e->idCategoria, 'categoria' => $e->tipo); }        
        return json_encode($data); }


    public static function convertJsonEvento($idPeople, $titulo, $categoria, $descricao, $limite){
        $execDadosOrganizador = pdo_fetch_object(pdo_query("SELECT foto, nome FROM `comercial` where idPessoa = $idPeople"));
        $evento = [ 'titulo'=>$titulo ,'categoria'=>$categoria,'descricao'=>$descricao, 'limiteParticipante'=>$limite, 'idPessoa'=>$idPeople,'organizador'=> $execDadosOrganizador[0]->nome, 'fotoOrganizador'=>$execDadosOrganizador[0]->foto];       
            return json_encode($evento, JSON_UNESCAPED_UNICODE);
        }


    public function createEvent(){                
        $evento = Event::convertJsonEvento($this->idPeople, $this->name, $this->category, $this->description, $this->limitParticipant ); 
        $datahora = [
            "dataFinal" => 1660154039,
            "horaFinal" => 1660154039,
            "dataInicial" => 1660154039,
            "horaInicial"=> 1660154039  ];
            $array = [];
        $status = ["andamento" => 1, "cancelado" => 0, "concluido" => 0 ];
        $engajamento = ["like" => [], "interesse" => [] ,"baixoInteresse" => [], "medioInteresse" => [] ];
        $this->status = json_encode($status);
        $this->engajament = json_encode($engajamento);
        $this->datetime = json_encode($datahora);
        $exec = pdo_query("insert into evento (datetime, status, evento, foto, endereco, engajamento) values ('".$this->datetime."','".$this->status."','".$evento."', '".$this->photograph."', '".$this->address."', '".$this->engajament."')" ); 
        return $exec;
        }

        public static function myEvent($idUser){     
            $sql = "SELECT * FROM `evento` WHERE json_extract(evento,'$.idPessoa') = '".$idUser."' ";
            $var = pdo_fetch_object(pdo_query($sql));
            $data = Event::Array($var, $idUser); 
            return json_encode($data);             
        }

        public static function cancelEvent($idUser, $motivation, $idEvent){     
            $insert = pdo_query("update evento set engajamento = JSON_ARRAY_APPEND(engajamento, '$.$grau', $idUser) where idEvento = $idEvento");
            $exec = pdo_query("delete from evento where idEvento = '".$idEvent."' "); 
        }

    }


    //Event::cancelEvent(3, "pq eu quero", 122 );

  // $event = new Event ( "3","datetimedata" , [5] , "maíra", "api->descricao", "triboonAssets/usuario/3/fernanda.jpeg" , "endereco", "api->limiteParticipante", "status", "enajament" );  
   //$event->createEvent();
//
    // $event->Print();


//$idUser, $carrossel, $latitude, $longitude
//echo Event::myEvent("3");
/*INSERT INTO `evento` (`idEvento`, `datetime`, `status`, `evento`, `foto`, `endereco`, `engajamento`) VALUES (NULL, '{\"horaInicial\":\"19h\", \"horaFinal\":\"20h\",\"dataInicial\":\"2022-07-18\",\"dataFinal\":\"2022-10-18\"}', '{\"concluido\":1,\"andamento\":0,\"cancelado\":0}', '{}', '\"sa\"', '{\"estado\":\"sp\",\"cidade\":\"pres prudente\",\"cep\":\"19045-5885\",\"rua\":\"Valter Donzeli\",\"numero\":\"165\",\"bairro\":\"santa monica\"}', '{\"like\":\"454844545454545\",\"interesse\":\"64545454545454\"}');
*/

?>


