<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
require_once('../../Modele/Classe/Employes.php'); 
require_once('../../Modele/Classe/Liste.php'); 
require_once('../../Modele/DAO/Employes_DAO.php');    
 $dao = new Employes_DAO;
 $emp=new Employes( $_REQUEST["nom"], $_REQUEST["prenom"]
             , $_REQUEST["tel_d"],$_REQUEST["tel_c"], $_REQUEST["adresse"],
         $_REQUEST["poste"]);
 // echo 'cont'.$_REQUEST["mdp"].count($_REQUEST["mdp"]).$_REQUEST["user"].count($_REQUEST["user"]);  
 if(isset($_REQUEST["mdp"])&&isset($_REQUEST["user"])&&strlen($_REQUEST["mdp"])>2 && strlen($_REQUEST["user"])>2){
      $emp->setUser($_REQUEST["user"]);
      $emp->setMdp($_REQUEST["mdp"]);
 }

 
   if(isset($_REQUEST["Modifier"])){
      try {
          $emp->setId_emp($_REQUEST["Modifier"]);  
           $dao->update($emp);
           
         echo "okM";  
      } catch (Exception $exc) {
          echo "echec ! .contactez l'adminstrateur du site :".$exc->getTraceAsString()."";
      }
//   }else{
//       echo "echec d'envoi le formulaire modifier" ;
  }
    if(isset($_REQUEST["ajouter"])){
      try {
           $dao->create($emp);
           
         echo "okJ";  
      } catch (Exception $exc) {
          echo "echec ! .contactez l'adminstrateur du site :".$exc->getTraceAsString()."</p>";
      }
//   }else{
//       echo "echec d'envoi le formulaire ajouter" ;
  }
//  echo ''.$_REQUEST["nom"]. $_REQUEST["prenom"]
//             . $_REQUEST["tel_d"].$_REQUEST["tel_c"]. $_REQUEST["adresse"].
//         $_REQUEST["poste"];
//         
  
?>