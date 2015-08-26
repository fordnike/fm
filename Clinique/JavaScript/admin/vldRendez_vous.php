<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



require_once('../../BD/config.php'); 
require_once('../../BD/Database.php');
require_once('../../Modele/DAO/Rendez_vous_DAO.php'); 
require_once('../../Modele/Classe/Liste.php');
require_once('../../Modele/Classe/Rendez_vous.php');
$dao= new Rendez_vous_DAO();
$obj=new Rendez_vous($_REQUEST["pat"],$_REQUEST["med"],$_REQUEST["date"],$_REQUEST["heur"]);
//$dao->create($obj);
echo $dao->create($obj);
?>