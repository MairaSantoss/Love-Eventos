<?php
/* database configuration variables (dont change it here) */

//include("conexaoo.php");

$dbhost = ((isset($dbhost)) ? $dbhost : "");
$dbport = ((isset($dbport)) ? $dbport : "3306");
$dbuser = ((isset($dbuser)) ? $dbuser : "");
$dbpass = ((isset($dbpass)) ? $dbpass : "");
$dbbase = ((isset($dbbase)) ? $dbbase : ""); /* name of the database (required) */
$dbdier = ((isset($dbdier)) ? $dbdier : false); /* script dies in case of db returns error */

/* Basic usage */
/*
    $var = pdo_query("select from ...");
    $var = pdo_fetch_array($var);
    foreach($var as &$item)
      $value = $item['key'];

    pdo_query("insert into ...");
*/

/* PDO database functions */
if(!class_exists('pdoclass')) {
	class pdoclass { public static $db = null; public static $dbconn = array(); public static $con = false; }
}

if(!function_exists('pdo_connect'))	{
	function pdo_connect($dbhost,$dbuser,$dbpass,$dbbase='',$dbport='3306',$cname="default",$defresult=false) {
		if(strpos($dbhost,':') !== false)
		  if((is_array($sep = explode(':',$dbhost))) && (count($sep) < 3))
		    $sep = (($dbhost=$sep[0]).':'.($dbport=$sep[1]));
		$conectionstr = 'mysql:host='.$dbhost.((!empty($dbport)) ? ';port='.$dbport : '').((!empty($dbbase)) ? ';dbname='.$dbbase : '');
		if($cname == "default") { 
			try {
				pdoclass::$db = new PDO($conectionstr , $dbuser, $dbpass);
				pdoclass::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
				$defresult = (pdoclass::$con = true);
			} catch (PDOException $e) {
				if(@$_GET['debug'] == "2") echo "<!-- Error: " . $e->getMessage() . " -->";
				$defresult = (pdoclass::$con = false); } 
		} else { 
			try {
				if((isset(pdoclass::$dbconn[$cname])) && (@pdoclass::$dbconn[$cname] != null)) return false;
				pdoclass::$dbconn[$cname] = null;
				pdoclass::$dbconn[$cname] = new PDO($conectionstr, $dbuser, $dbpass);
				pdoclass::$dbconn[$cname]->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
				$defresult = true;
			} catch (PDOException $e) { 
				$defresult = false; 
		} } 
		if(!$defresult) @include(__DIR__ . '/../../database.php');
		return $defresult;
	}
}

if(!function_exists('pdo_log')) {	
	function pdo_log($statm, $eo = null, $save = false) { 
	  if(!((isset(pdoclass::$db)) && (pdoclass::$con) && (@pdoclass::$db != null))) return false;
	  if(!(($save ?? false) || ($statm['l'] ?? false))) return $eo;
	  try { $e = $eo; if(is_array($e) || is_object($e)) $e = $_SERVER['PDOMODULE_LAST_ERR'] = json_encode($e);
		if(($clear = @pdoclass::$db->prepare("select count(*) qtd from log_query"))->execute())
			if(intval($clear->fetchAll()[0]['qtd'] ?? 0) > 1000)
			@pdoclass::$db->prepare("delete from log_query order by id asc limit 100")->execute();
		if((!empty($statm['s'] ?? '')) && (($statm['c'] ?? '') != 'refill'))
		  if(!(strpos(preg_replace('/[^a-z]/','',strtolower(explode(' ',trim($statm['s']))[0] ?? '')),'set') !== false))
				@pdoclass::$db->prepare("INSERT INTO log_query (query, parameters, response, runat) VALUES (:q, :p, :r, :t)")
						  	  ->execute(['q'=>($statm['s'] ?? null), 'p'=>json_encode($statm['v'] ?? []), 
									   'r'=>($statm['d'] ?? ($e ?? null)), 't'=>strtotime('now')]);
	  } catch (PDOException $e) { } 
	return $eo; }
}


if(!function_exists('pdo_insert_id')) {	
	function pdo_insert_id($cname="default") { 
	if(($cname == "default") && (!pdoclass::$con)) return null;
	if(($cname != "default") && (!(isset(pdoclass::$dbconn[$cname])) && (@pdoclass::$dbconn[$cname] != null))) return null;
	$pdodb = ($cname == "default") ? pdoclass::$db : pdoclass::$dbconn[$cname];
	return $pdodb->lastInsertId(); }
}

if(!function_exists('pdo_num_rows')) {	
	function pdo_num_rows($statm) {
		if($statm == null) return 0;
		if(!isset($statm['q'])) return 0;
		try { 
		  @$statm['q']->execute($statm['v'] ?? []);
		  return pdo_log($statm, @$statm['q']->rowCount());
		} catch (PDOException $e) { 
		  pdo_log($statm, $e, true);
		  return 0; } 
	}
}

if(!function_exists('pdo_fetch_array')) {
	function pdo_fetch_array($statm) {
	  if($statm == null) return array();
	  if(!isset($statm['q'])) return array();
	  try { 
	    @$statm['q']->execute($statm['v'] ?? []);
		return pdo_log($statm, $statm['q']->fetchAll());
	  } catch (PDOException $e) { 
		pdo_log($statm, $e, true);
		return array(); }
    }
}

if(!function_exists('pdo_query')) {
	function pdo_query($select, $vname=[], $cname="default", $log=false) {
		if(($cname == 'default') && (is_string($vname))) { $cname = $vname; $vname = []; }
		if(($cname == "default") && (!pdoclass::$con)) return null;
		if(($cname != "default") && (!(isset(pdoclass::$dbconn[$cname])) && (@pdoclass::$dbconn[$cname] != null))) return null;
		$pdodb = ($cname == "default") ? pdoclass::$db : pdoclass::$dbconn[$cname];
		if($pdodb == null) return;
		try { 
			$statm = ['q'=>$pdodb->prepare($select), 's'=>$select, 'c'=>$cname, 'v'=>$vname, 'l'=>$log];
			return (!(strpos(preg_replace('/[^a-z]/','',strtolower(explode(' ',trim($select))[0] ?? '')),'select') !== false))
			       ? pdo_num_rows($statm)
				   : $statm; 
		} catch (PDOException $e) { pdo_log($statm, $e, true);
			if(@$_GET['debug'] == "2") echo "<!-- Error: " . $e->getMessage() . " -->";
			if($cname == "default") @include(__DIR__ . '/../../database.php');
			return []; }
	}
}

if(!function_exists('pdo_prepare'))	{	
	function pdo_prepare($select,$cname="default") {
	if(($cname == "default") && (!pdoclass::$con)) return null;
	if(($cname != "default") && (!(isset(pdoclass::$dbconn[$cname])) && (@pdoclass::$dbconn[$cname] != null))) return null;
	$pdodb = ($cname == "default") ? pdoclass::$db : pdoclass::$dbconn[$cname];
	try { $statm = $pdodb->prepare($select);
	} catch (PDOException $e) { if(@$_GET['debug'] == "2") echo "<!-- Error: " . $e->getMessage() . " -->"; }
	return $statm; }
}

if(!function_exists('pdo_execute')) {	
	function pdo_execute($statm, $array) { 
		if($statm == null) return array(); 
		return $statm->execute($array); 
	}
}

if(!function_exists('pdo_fetch_object')) {	
	function pdo_fetch_object($statm) { 
		if($statm == null) return array(); 
		if(!isset($statm['q'])) return array();
		@$statm['q']->execute($statm['v'] ?? []);
		return @$statm['q']->fetchAll(PDO::FETCH_OBJ); 
	}
}

if(!function_exists('pdo_fetch_item')) {	
	function pdo_fetch_item($statm) {
		if($statm == null) return array();
		return (pdo_fetch_array($statm)[0] ?? []);
	}
}

if(!function_exists('pdo_fetch_row')) {
	function pdo_fetch_row($statm) { if($statm == null) return array(); return @pdo_fetch_item($statm); }
}

if(!function_exists('pdo_start_transaction')) {	
	function pdo_start_transaction($cname="default") { 
        $pdodb = ($cname == "default") ? pdoclass::$db : ((isset(pdoclass::$dbconn[$cname])) ? pdoclass::$dbconn[$cname] : null); 
        return ($pdodb == null) ? null : $pdodb->beginTransaction(); }
}

if(!function_exists('pdo_commit')) {	
	function pdo_commit($cname="default") { 
        $pdodb = ($cname == "default") ? pdoclass::$db : ((isset(pdoclass::$dbconn[$cname])) ? pdoclass::$dbconn[$cname] : null); 
        return ($pdodb == null) ? null : $pdodb->commit(); }
}

if(!function_exists('pdo_rollback')) {	
	function pdo_rollback($cname="default") { 
        $pdodb = ($cname == "default") ? pdoclass::$db : ((isset(pdoclass::$dbconn[$cname])) ? pdoclass::$dbconn[$cname] : null); 
        return ($pdodb == null) ? null : $pdodb->rollBack(); }
}

if(!function_exists('pdo_close')) {	
	function pdo_close($cname="default") { 
	if($cname != "default") pdoclass::$dbconn[$cname] = null;
	else { pdoclass::$db = null; pdoclass::$con = false; }
	return true; }
}

/* Auto PDO connect */
if(($dbuser != '') && ($dbpass != '') && ($dbbase != ''))
  if(!pdo_connect($dbhost,$dbuser,$dbpass,$dbbase,$dbport))
    if(isset($dbdier)) if($dbdier) die();

?>