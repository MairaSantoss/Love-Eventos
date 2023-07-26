<?php
    $rua = 'R.Valter Donzelli';
    $cidade = 'PRESIDENTE PRUDENTE';
    $pais = 'Brasil';
    $url = "https://nominatim.openstreetmap.org/search?format=json&street=" . urlencode($rua) . "&city". urlencode($cidade) . "&state=SP" . "&country=" . urlencode($pais);
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
    print_r($result);
?>