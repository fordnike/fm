<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<?php 
require_once('BD/config.php'); 
require_once('BD/Database.php'); 
require_once('Modele/Classe/Annonce.php');
require_once('Modele/Classe/Patient.php');
require_once('Modele/Classe/Employes.php');
require_once('Modele/Classe/Medecin.php');
require_once('Modele/Classe/Rendez_vous.php'); 
require_once('Modele/Classe/Even.php'); 
require_once('Modele/DAO/Annonce_DAO.php');
require_once('Modele/DAO/Patient_DAO.php'); 
require_once('Modele/DAO/Employes_DAO.php'); 
require_once('Modele/DAO/Medecin_DAO.php'); 
require_once('Modele/DAO/Rendez_vous_DAO.php'); 
require_once('Modele/DAO/Even_DAO.php'); 
require_once('Modele/Classe/Liste.php'); ?>

<html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    <script>
      // la valeur de input selectionne
      var val_input_sel;
      var ajt_dailogue;
      var datep;
      var slt_medecin;
      var var_slt_medecin;
      var val;
        function ajtDlg($val)
        {
            ajt_dailogue=$val;
      //  alert(ajt_dailogue);
        }
        function myFunction($val)
        {
            val=$val;
       // alert(val);
        }
     
  </script>
    <meta name="google-site-verification" content="OIDgrffOS3_7ly5KMfhxBbqhhDltYSDJ4aTZgLi13vA" />   
  <link rel="stylesheet" href="Css/StylePrincipal.css" />
  <link rel="stylesheet" href="Css/table.css" />
  <link rel="stylesheet" href="Css/tableBlack.css" />
  <link rel="stylesheet" href="Css/login-box.css" />
 <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
 <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
 
  <script src="JavaScript/admin/BoitDailogue.js"></script>
  <script src="JavaScript/admin/Recherche.js"></script>
  
  
  
  <script>
  $(function() {
    $( ".datepicker" ).datepicker( { numberOfMonths: 2,showButtonPanel: true});
  });
  </script>
  <script>
//   $(function() {
//    $( document ).tooltip();
//  });
 $(function() {
    $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
  });
  </script>
  <link rel="stylesheet" href="Css/tooltip.css" />
    <body>
        <?php 
if(!$_SESSION ["connecter"]==1) {
     header('Location:http://physio-bien-etre-inc.com/Connexion.php');

}
           
?>


 

<div class="patADMIN">
     <?php  $dao = new Patient_DAO;
   if(isset($_REQUEST["Supprimer"])){
     try {         
         $dao->delete($_REQUEST["Supprimer"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>Le nom d'utilisateur ou le mot de passe saisi est incorrect. ?</p> ";
        
      }
       
       
   }
  
  ?>
<!-- <div id="dg_m" title="Valide">
  <p style="color: red">la Modification est réussit</p>
</div>-->
 
    
    
    
 
      <div class="M_maitre" align=center>
          <h2>GESTION EQUIPE  </h2>
     
         <?php if ( isset($_REQUEST["Modifier"])){ 
             $medecin=$dao->find("id_medecin", $_REQUEST["Modifier"]);
             
             ?>
      <form id="M_up" method="post" action="?action=medecin" >
     <input type="hidden" name="action" value="medecin" />
      <input type="hidden" name="Modifier" value="<?php echo $_REQUEST["Modifier"];?>" />
                  
                <table >
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom" value="<?php echo $medecin->getNomPatient() ; ?>"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom" value="<?php echo $medecin->getPrenomPatient() ; ?>"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse" value="<?php echo $medecin->getAdressePatient(); ?>"></td></tr>
                    <tr><td> <label class="">carte maladie:</label></td><td><input type="text" name="poste" value="<?php echo $medecin->getNCarteMaladie() ; ?>"></td></tr>
                    <tr><td><label class=""> Date de naissance:</label></td><td><input type="text" name="tel" value="<?php echo $medecin->getDateNaissancePatient() ; ?>"></td></tr>
                    <tr><td><label class=""> Email:</label></td><td><input type="text" name="tel" value="<?php echo $medecin->getEmailPatient() ; ?>"></td></tr>
                    <tr><td><label class=""> Tél D:</label></td><td><input type="text" name="tel" value="<?php echo $medecin->getTelDomicilePatient(); ?>"></td></tr>
                    <tr><td><label class=""> Tel C :</label></td><td><input type="text" name="tel" value="<?php echo $medecin->getCellulairePatient() ; ?>"></td></tr>
                 
                </table>
      <button type="submit" class="b_orange" name="modifier" id="mdf" > Modifier </button>
       </form >
     <form id="M_sup" method="get" action="?action=medecin" >
     <input type="hidden" name="action" value="medecin" />         
     <button type="submit" class="b_orange" name="Cree" id=""> Crée Un medecin </button>
     </form >
  <?php }else{ ?>
   <form id="M_cree" method="post" action="?action=medecin" >
     <input type="hidden" name="action" value="medecin" />
  
                <table>
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse"></td></tr>
                    <tr><td> <label class="">poste:</label></td><td><input type="text" name="poste"></td></tr>
                    <tr><td><label class=""> Téléphone:</label></td><td><input type="text" name="tel"></td></tr>
                  
                </table>
      <button type="submit" name="ajouter" class="b_orange" value="" style="border: 0px;">Ajouter</button>
  
  
   </form >
  </div>
 
  <?php }?>
  <?php ?>
  <?php
  
    $liste=$dao->findAll();
  ?>
  <form id="M_tab" method="get" action="?action=medecin" >
     <input type="hidden"name="action" value="medecin" />
  <table class='tab2'>
      <tr><td>Nom</td> <td> Prénom </td> <td>Adresse </td> <td>carte maladie </td><td>date de naissamce </td><td>Email </td><td>Tel D</td><td>Tel c </td></tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <?php echo $liste->getObjet()->getNomPatient() ; ?> </td> 
              <td> <?php echo $liste->getObjet()->getPrenomPatient() ; ?></td>
              <td> <?php echo $liste->getObjet()->getAdressePatient(); ?></td>
              <td><?php echo $liste->getObjet()->getNCarteMaladie() ; ?> </td>
              <td> <?php echo $liste->getObjet()->getDateNaissancePatient() ; ?></td>
              <td> <?php echo $liste->getObjet()->getEmailPatient()  ; ?></td>
              <td> <?php echo $liste->getObjet()->getTelDomicilePatient() ; ?></td>
              <td> <?php echo $liste->getObjet()->getCellulairePatient() ; ?></td>
              <td> <button type="submit" class="b_orange" name="Supprimer" value="<?php echo $liste->getObjet()->getNCarteMaladie() ; ?>">Supprimer</button></td>
             <td><button type="submit" class="b_orange" name="Modifier" value="<?php echo $liste->getObjet()->getNCarteMaladie() ; ?>">Modifier</button></td>
          </tr>   
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>
    </body>
</html>
