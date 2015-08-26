<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



require_once('../../BD/config.php'); 
require_once('../../BD/Database.php');
require_once('../../Modele/DAO/Patient_DAO.php'); 
require_once('../../Modele/Classe/Liste.php');
require_once('../../Modele/Classe/Patient.php');
$dao=new Patient_DAO();
$objp= new Patient($_REQUEST["cam"],$_REQUEST["nom"],$_REQUEST["pre"],$_REQUEST["tel_d"],$_REQUEST["tel_c"],$_REQUEST["ad"],$_REQUEST["date"],$_REQUEST["em"]);
echo $dao->create($objp);

?>