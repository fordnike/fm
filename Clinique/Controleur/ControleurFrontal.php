<?php
require_once('BD/config.php'); 
require_once('BD/Database.php'); 
require_once('Modele/Classe/Annonce.php');
require_once('Modele/Classe/Even.php');
//require_once('Modele/Classe/Employes.php');
require_once('Modele/Classe/Medecin.php');
//require_once('Modele/Classe/Rendez_vous.php'); 
require_once('Modele/DAO/Annonce_DAO.php');
require_once('Modele/DAO/Even_DAO.php'); 
//require_once('Modele/DAO/Employes_DAO.php'); 
require_once('Modele/DAO/Medecin_DAO.php'); 
//require_once('Modele/DAO/Rendez_vous_DAO.php'); 
require_once('Modele/Classe/Liste.php'); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_REQUEST['action'])){
    $action=$_REQUEST['action'];
    switch ($action){
      case"accueil":
          include_once 'Vues/Accueil.php'; 
      break;
      case"emplois":
          include_once 'Vues/Emplois.php'; 
      break;
      case"equipe":
          include_once 'Vues/Equipe.php'; 
      break;
      case"evenement":
          include_once 'Vues/Evenement.php'; 
      break;
      case"faq":
          include_once 'Vues/FAQ.php'; 
      break;
      case"services":
          include_once 'Vues/Services.php'; 
      break;
      case"contact":
          include_once 'Vues/contact.php'; 
      break;
      case"apropos":
          include_once 'Vues/apropos.php'; 
      break;
   case"clinique":
          include_once 'Vues/Clinique.php'; 
      break;
    }
}else{
    include_once 'Vues/Accueil.php'; 
    
}



?>