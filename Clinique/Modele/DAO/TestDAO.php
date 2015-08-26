<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
require_once('../Classe/Patient.php');
require_once('../Classe/Employes.php');
require_once('../Classe/Medecin.php');
require_once('../Classe/Rendez_vous.php');
require_once('Patient_DAO.php'); 
require_once('Employes_DAO.php'); 
require_once('Medecin_DAO.php'); 
require_once('Rendez_vous_DAO.php'); 
require_once('../Classe/Liste.php');

$dao= new Rendez_vous_DAO();
//$p=new Patient("514-222-222","MAMA","NANA");
//$dao->create($p);
$liste=$dao->findListe(1,"12/12/12");
//while($liste->next()){
//
//    echo 'nm'.$liste->getObjet()->getNCarteMaladie();
//    
//}
//  if($dao->find("nCarteMaladie", "514-443-779")){
//      
//      echo 'oui';
//  }else{
//       echo 'non';
//  }

print_r($liste);
/* test employe*/
//echo 'entree';
//
//$dao= new Employes_DAO();
//$p=new Employes("emplye2","p_empoye2","tel2","cel2","adrees2","poste2");
//$dao->create($p);
//$liste=$dao->findAll();
//while($liste->next()){
//
//    echo 'nm'.$liste->getObjet()->getNom_emp();
//    
//}
//  if($dao->find("nCarteMaladie", "514-443-779")){
//      
//      echo 'oui';
//  }else{
//       echo 'non';
//  }
  
  


?>