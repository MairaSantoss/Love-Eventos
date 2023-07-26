<?php
/* PDO database functions */
if(!class_exists('pdoclass')) {
	
	



	class pdoclass { 
		public static $current = "default";
		public static $data = [
			"default" => [
				"dbstring" => "mysql:host=mysql:3306", //;dbname=database
				"dbuser" => "",
				"dbpass" => "",
				"con" => null
			]
		];
		
		public function __construct($connectionstr=null, $dbuser=null, $dbpass=null) {
			self::$current = md5(
				($connectionstr = ($connectionstr ?? self::$data["default"]["dbstring"])).
				($dbuser = ($dbuser ?? self::$data["default"]["dbuser"])).
				($dbpass = ($dbpass ?? self::$data["default"]["dbpass"])));
			if(is_object(pdoclass::$data[self::$current]["con"] ?? null)) return false;
			if(!pdo_connect($connectionstr,$dbuser,$dbpass,self::$current)) return false;
			else return pdoclass::$data[self::$current]["con"];
		} 

		public static function __callStatic($name, $arguments) {
			if(!function_exists($name)) return [];
			$arguments[] = self::$current;
			return call_user_func_array($name, $arguments);
		}

		public static function database() {
			pdo_query("CREATE TABLE IF NOT EXISTS log_query (
				id bigint(20) NOT NULL AUTO_INCREMENT,
				query longtext NULL DEFAULT NULL,
				parameters longtext NULL DEFAULT NULL,
				response longtext NULL DEFAULT NULL,
				runat int NULL,
				PRIMARY KEY (id))");
		}		
	}
}

if(!function_exists('pdo_connect')) {

	function pdo_autoconfig($dir = null, $file = 'database.php') {
		if($dir === null) $dir = __DIR__;
		if(($_SERVER[$on = 'autocreatedbtables_'.md5("$dir/$file")] ?? '') == '1') return; else $_SERVER[$on] = '1';
		if(function_exists('autocreatedbtables')) return autocreatedbtables();
		for($i=0;$i<5;$i++)
			if(file_exists("$dir/$file")) return @include_once("$dir/$file");
			else $dir = realpath("$dir/../"); 
	}

	function pdo_connect($connectionstr=null,$dbuser=null,$dbpass=null,$cname=null,$defresult=false) {
		if(!isset($_SERVER['GROUP']) && class_exists('group',true)) new group();
		$connectionstr = ($connectionstr ?? (pdoclass::$data[pdoclass::$current]["dbstring"] ?? (pdoclass::$data["default"]["dbstring"] ?? '')));
		$dbuser = ($dbuser ?? (pdoclass::$data[pdoclass::$current]["dbuser"] ?? (pdoclass::$data["default"]["dbuser"] ?? '')));
		$dbpass = ($dbpass ?? (pdoclass::$data[pdoclass::$current]["dbpass"] ?? (pdoclass::$data["default"]["dbpass"] ?? '')));
		if($cname === null) $cname = pdoclass::$current = md5($connectionstr.$dbuser.$dbpass);
		try {
			if(is_object(pdoclass::$data[$cname]['con'] ?? null)) return $defresult;
			pdoclass::$data[$cname] = [ "dbstring" => $connectionstr, "dbuser" => $dbuser, "dbpass" => $dbpass, "con" => null ];
			pdoclass::$data[$cname]['con'] = new PDO($connectionstr, $dbuser, $dbpass);
			pdoclass::$data[$cname]['con']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
			$defresult = $cname;
		} catch (PDOException $e) { $defresult = false; }
		if(!$defresult) pdo_autoconfig();
		return $defresult; }

	function pdo_log($statm, $eo = null, $save = false) { 
	  if(!is_object($pdodb = (pdoclass::$data[pdoclass::$current]['con'] ?? null))) return null;
	  if(!(($save ?? false) || ($statm['l'] ?? false))) return $eo;
	  try { $e = $eo; if(is_array($e) || is_object($e)) $e = json_encode($e);
		if(($clear = @$pdodb->prepare("select count(*) qtd from log_query"))->execute()) {
			$qtd = intval($clear->fetchAll()[0]['qtd'] ?? -1);
			if($qtd < 0) return;
			else if($qtd > 1000)
					@$pdodb->prepare("delete from log_query order by id asc limit 100")->execute(); }
		if((!empty($statm['s'] ?? '')) && (($statm['c'] ?? '') == 'default'))
		  if(!(strpos(preg_replace('/[^a-z]/','',strtolower(explode(' ',trim($statm['s']))[0] ?? '')),'set') !== false))
				@$pdodb->prepare("INSERT INTO log_query (query, parameters, response, runat) VALUES (:q, :p, :r, :t)")
					   ->execute(['q'=>($statm['s'] ?? null), 'p'=>json_encode($statm['v'] ?? []), 
						 	      'r'=>($statm['d'] ?? ($e ?? null)), 't'=>strtotime('now')]);
		} catch (PDOException $e) { } 
		return $eo; }


	function pdo_insert_id($cname=null) { 
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
		return $pdodb->lastInsertId(); }


	function pdo_num_rows($statm) {
		if($statm == null) return 0;
		if(!isset($statm['q'])) return 0;
		try { 
		  @$statm['q']->execute($statm['v'] ?? []);
		  return pdo_log($statm, @$statm['q']->rowCount());
		} catch (PDOException $e) { 
		  pdo_log($statm, $e, true);
		  return 0; } }


          //se colocar true ele vai converter em json
	function pdo_fetch_array($statm, $convertjson=false) {
	  if($statm == null) return array();
	  if(!isset($statm['q'])) return array();
	  try { 
	    @$statm['q']->execute($statm['v'] ?? []);
		$r = pdo_log($statm, arrayval($statm['q']->fetchAll(PDO::FETCH_OBJ)));
		if($convertjson) $r = recursive_jsonconvert($r, true);
		return $r;
	  } catch (PDOException $e) { 
		pdo_log($statm, $e, true);
		return array(); } }


	function pdo_fetch_object($statm, $convertjson=false) { 
	  if($statm == null) return array(); 
	  if(!isset($statm['q'])) return array();
	  try {
		@$statm['q']->execute($statm['v'] ?? []);
		$r = pdo_log($statm, $statm['q']->fetchAll(PDO::FETCH_OBJ));
		if($convertjson) $r = recursive_jsonconvert($r, false);
		return $r;
	  } catch (PDOException $e) { 
		pdo_log($statm, $e, true);
		return array(); } }


	function pdo_query($select, $vname=[], $cname=null, $log=false) {
		if(is_string($vname)) { $cname = $vname; $vname = []; }
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null)))
			if(!pdo_connect(null, null, null, $cname)) return null;
			else if(!is_object($pdodb = (pdoclass::$data[pdoclass::$current]['con'] ?? null))) return null;
		try { 
			$statm = ['q'=>@$pdodb->prepare(jsonextractalias($select)), 's'=>$select, 'c'=>$cname, 'v'=>$vname, 'l'=>$log];
			return (!(strpos(preg_replace('/[^a-z]/','',strtolower(explode(' ',trim($select))[0] ?? '')),'select') !== false))
			       ? pdo_num_rows($statm)
				   : $statm; 
		} catch (PDOException $e) { pdo_log($statm, $e, true);
			if(@$_GET['debug'] == "2") echo "<!-- Error: " . $e->getMessage() . " -->";
			if($cname == "default") pdo_autoconfig();
			return []; } }


	function pdo_prepare($select,$cname=null) {
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
		try { $statm = $pdodb->prepare($select); } 
		catch (PDOException $e) { if(@$_GET['debug'] == "2") echo "<!-- Error: " . $e->getMessage() . " -->"; }
		return $statm; }


	function pdo_execute($statm, $array) { 
		if($statm == null) return array(); 
		return $statm->execute($array); }


	function pdo_fetch_item($statm, $convertjson=false) {
		if($statm == null) return array();
		return (pdo_fetch_array($statm,$convertjson)[0] ?? []); }


	function pdo_fetch_row($statm, $convertjson=false) { if($statm == null) return array(); return @pdo_fetch_item($statm,$convertjson); }


	function pdo_start_transaction($cname=null) { 
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
        return ($pdodb == null) ? null : $pdodb->beginTransaction(); }


	function pdo_commit($cname=null) { 
        if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
        return ($pdodb == null) ? null : $pdodb->commit(); }


	function pdo_rollback($cname=null) { 
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
        return ($pdodb == null) ? null : $pdodb->rollBack(); }


	function pdo_close($cname=null) { 
		if($cname === null) $cname = pdoclass::$current;
		if(!is_object($pdodb = (pdoclass::$data[$cname]['con'] ?? null))) return null;
		$pdodb = null;
		return true; }


	function arrayval($data) { 
	  $result = [];
	  if (is_array($data) || is_object($data)) {
		foreach ($data as $key => $value)
			$result[$key] = (is_array($value) || is_object($value)) ? arrayval($value) : $value;
		return $result; }
	  return $data;
	}

	function jsonextractalias($query) {
		if(strpos(preg_replace('/[^a-z]/','',strtolower(explode(' ',trim($query))[0] ?? '')),'update') !== false)
          if(!empty($fp = explode(' WHERE ',str_ireplace(' where ',' WHERE ',($query.' WHERE ')))[0] ?? ''))
            if(!empty($np = preg_replace('!(.*?)([\ |\,|\(])?([^\ \,\(\-]+)\-\>\'(.*?)\'(.*?)\'(.*?)\'(.*?)!', "$1$2$3=json_insert(coalesce($3,'{}'),'$4','$6')$7",
                            preg_replace('!(.*?)([\ |\,|\(])?([^\ \,\(\-]+)\-\>\>\'(.*?)\'(.*?)\'(.*?)\'(.*?)!', "$1$2$3=json_set(coalesce($3,'{}'),'$4','$6')$7", $fp))))
              $query = str_replace($fp, $np, $query);

        return preg_replace('!(.*?)([\ |\,|\(])?([^\ \,\(\-]+)\-\>\'(.*?)\'(.*?)!', "$1$2json_extract($3,'$4')$5", 
               preg_replace('!(.*?)([\ |\,|\(])?([^\ \,\(\-]+)\-\>\>\'(.*?)\'(.*?)!', "$1$2json_unquote(json_extract($3,'$4'))$5", $query));
	}

	function recursive_jsonconvert($data, $returnarray=false) {
		$result = [];
		if (is_array($data) || is_object($data)) {
			foreach ($data as $key => $value)
				$result[$key] = (is_array($value) || is_object($value)) 
							  ? recursive_jsonconvert($value, $returnarray) 
							  : ((($convert = @json_decode($value,true)) && (json_last_error() === JSON_ERROR_NONE)) ? $convert : $value);
			return (($returnarray) ? $result : json_decode(json_encode($result), $returnarray)); }
	  return $data;
	}

}
?>

