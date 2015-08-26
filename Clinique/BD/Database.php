<?php
require_once('config.php');
class Database
{	
	private static $connexion = null;
	
	private function __construct() {}
	
	public static function getInstance()
	{
		if(self::$connexion == null)
			self::$connexion = new PDO(
				"mysql:host=".Config::DB_HOST.";dbname=".Config::DB_NAME."", 
				Config::DB_USER, 
				Config::DB_PWD);
		return self::$connexion;
	}
}
?>