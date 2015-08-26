<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
require_once('../../Modele/Classe/Annonce.php'); 
require_once('../../Modele/Classe/Liste.php'); 
require_once('../../Modele/DAO/Annonce_DAO.php');    
 $dao = new Annonce_DAO;
var_dump($_FILES['monfichier']);
 if (isset($_FILES['monfichier']) AND $_FILES['monfichier']['error'] == 0) {
    if ($_FILES['monfichier']['size'] <= 1000000) {
        $infosfichier = pathinfo($_FILES['monfichier']['name']);
        $extension_upload = $infosfichier['extension'];
        $extensions_autorisees = array('PDF', 'pdf');
        if (in_array($extension_upload, $extensions_autorisees)) {
            //$new_photo = new Photo($_FILES['monfichier']['name'], $_FILES['monfichier']['name'], $_REQUEST["id_album"], 1);
            //$dao->create($new_photo);
            //$new_photo->setId_photo($dao->find_lastUpload($_REQUEST["id_album"]));
            //$new_photo->setPath("images1/" . $dao->find_lastUpload($_REQUEST["id_album"]) . "." . $infosfichier['extension']);
           
           

          
//            $dao->update($new_photo);
//            $liste = $dao->findPhotos_album($_REQUEST["id_album"]);
            echo "L'envoi a bien été effectué !". 
           move_uploaded_file($_FILES['monfichier']['tmp_name'], "Fichier/".$_REQUEST["tr"].".". $infosfichier['extension']);
        }  else {
            echo "echec ! extension invalide veuillez telechager un fichier pdf";
        }
    }
     else {
            echo "echec ! le fichier est tros grand ! .1M max";
     }
}

 $med=new Annonce( $_REQUEST["tr"], "Fichier/".$_REQUEST["tr"].".pdf"
             , $_REQUEST["af"]);
 
//   if(isset($_REQUEST["Modifier"])){
//      try {
//           $dao->update($_REQUEST["Modifier"], $_REQUEST["tr"], $_REQUEST["prenom"]
//              ,$_REQUEST["adresse"], $_REQUEST["tel"], $_REQUEST["poste"]);
//           
//         echo "ok";  
//      } catch (Exception $exc) {
//          echo "<p style='color:red'>".$exc->getTraceAsString()."</p>";
//      }
//   }
    if(isset($_REQUEST["ajouter"])){
      try {
           
           
         echo "ok".$dao->create($med);  
      } catch (Exception $exc) {
          echo "echec ! .contactez l'adminstrateur du site :".$exc->getTraceAsString()."</p>";
      }
   }else{
       echo "echec d'envoi le formulaire ajouter" ;
   }
   
?>