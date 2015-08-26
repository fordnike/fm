<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_REQUEST['action'])){
    $action=$_REQUEST['action'];
    switch ($action){
      case"offres":
          include_once 'Vues/Admin/Menu.php';
          include_once 'Vues/Admin/Offres.php'; 
      break;
      case"employes":
          include_once 'Vues/Admin/Menu.php';
          include_once 'Vues/Admin/employes.php'; 
      break;
      case"even":
          include_once 'Vues/Admin/Menu.php';
          include_once 'Vues/Admin/Even.php'; 
      break;
      case"medecin":
          include_once 'Vues/Admin/Menu.php';
          include_once 'Vues/Admin/medecin.php'; 
      break;
      case"patient":
          include_once 'Vues/Admin/Menu.php';
          include_once 'Vues/Admin/patient.php'; 
      break;
      case"deconnecter":
          include_once 'Vues/Admin/deconnecter.php'; 
     break;
      case"rendez_vous":
          include_once 'Vues/Admin/rendez_vous.php'; 
      break;
//      case"apropos":
//          include_once 'Vues/apropos.php'; 
//      break;
//   case"clinique":
//          include_once 'Vues/Clinique.php'; 
//      break;
    }
}else{
      include_once 'Vues/Admin/Menu.php';
    include_once 'Vues/Admin/employes.php'; 
    
}
?>