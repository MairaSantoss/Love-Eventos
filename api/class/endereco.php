
    <?php

    class Address {
        private $cep;
        private $number;
        private $city;
        private $road;
        private $block;
        private $uf;
        private $place;
        private $latitude;
        private $longitude;

        public function setLatitude($latitude){
            $this->latitude = $latitude;
        }

        public function setLongitude($longitude){
            $this->longitude = $longitude;
        }
    
        function __construct($cep, $number, $city, $road, $block, $uf, $place, $latitude, $longitude)
        {
            $this->cep = $cep;
            $this->number = $number;
            $this->city = $city;
            $this->road = $road;
            $this->block = $block;
            $this->uf = $uf;
            $this->place = $place;
            $this->latitude = $latitude;
            $this->longitude = $longitude;  }

        

        public function Mostrar(){
            echo "<br>cep: " .$this->cep;
            echo "<br>numero: ". $this->number;
            echo "<br>city: ".$this->city;
            echo "<br>road: ".$this->road;
            echo "<br>block: ".$this->block;
            echo "<br>uf: ".$this->uf;  }

        public function convertJson(){
            $address = ['cep'=>$this->cep,'rua'=>$this->road,'local'=>$this->place, 'bairro'=>$this->block,'cidade'=>$this->city,
            'estado'=>$this->uf,  'numero'=>$this->number, 'local'=>$this->place,'latitude'=>$this->latitude,'longitude'=>$this->longitude];
            return json_encode($address, JSON_UNESCAPED_UNICODE);  }


        public function getCordenada(){
        $pais = 'Brasil';
        $url = "https://nominatim.openstreetmap.org/search?format=json&street=" . urlencode($this->road) . "&city". urlencode($this->city) . "&state=SP" . "&country=" . urlencode($pais);
        //echo $url . "<br>";  // ASSIM É A FORMA QUE VAI SER MONTADO A URL
        //urlencode  função pronta do php -> PEGA O "OI MAIRA" -> TRANSFORMA EM "OI%20MAIRA" 
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36");
        $result = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($result, true);
        return ['lat' => $result[0]['lat'], 'lon' => $result[0]['lon']];}


    }


//$endereco = new Address("19045250","175","presidente prudente","Valter Donzelli","bairro jardim santa monica","sp","Shopping","","");

//$cordenada = $endereco->getCordenada();

//echo $cordenada['lat'];

?>
