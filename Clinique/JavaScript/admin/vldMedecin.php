<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
require_once('../../Modele/Classe/Medecin.php'); 
require_once('../../Modele/Classe/Liste.php'); 
require_once('../../Modele/DAO/Medecin_DAO.php');    
 $dao = new Medecin_DAO;
 $med=new Medecin( $_REQUEST["nom"], $_REQUEST["prenom"]
             , $_REQUEST["tel"],$_REQUEST["adresse"], $_REQUEST["poste"]);
 
   if(isset($_REQUEST["Modifier"])){
      try {
           $dao->update($_REQUEST["Modifier"], $_REQUEST["nom"], $_REQUEST["prenom"]
              ,$_REQUEST["adresse"], $_REQUEST["tel"], $_REQUEST["poste"]);
           
         echo "ok";  
      } catch (Exception $exc) {
          echo "<p style='color:red'>".$exc->getTraceAsString()."</p>";
      }
   }
    if(isset($_REQUEST["ajouter"])){
      try {
           $dao->create($med);
           
         echo "ok";  
      } catch (Exception $exc) {
          echo "echec ! .contactez l'adminstrateur du site :".$exc->getTraceAsString()."</p>";
      }
   }
   
         
  
?>