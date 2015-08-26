<?php 
if(!$_SESSION ["connecter"]==1) {
     header('Location:http://developpement.netau.net/Connexion.php');

}
           
?>


 

<div class="medecinADMIN">
     <?php  $dao = new Medecin_DAO;
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
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom" value="<?php echo $medecin->getNom() ; ?>"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom" value="<?php echo $medecin->getPrenom() ; ?>"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse" value="<?php echo $medecin->getAdresse_M(); ?>"></td></tr>
                    <tr><td> <label class="">poste:</label></td><td><input type="text" name="poste" value="<?php echo $medecin->getPoste() ; ?>"></td></tr>
                    <tr><td><label class=""> Téléphone:</label></td><td><input type="text" name="tel" value="<?php echo $medecin->getTel_Medecin() ; ?>"></td></tr>
                  
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
      <tr><td>Nom</td> <td> Prénom </td> <td>Adresse </td> <td>Spécialité </td><td>Téléphone </td></tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <?php echo $liste->getObjet()->getNom() ; ?> </td> 
              <td> <?php echo $liste->getObjet()->getPrenom() ; ?></td>
              <td> <?php echo $liste->getObjet()->getAdresse_M(); ?></td>
              <td><?php echo $liste->getObjet()->getPoste() ; ?> </td>
              <td> <?php echo $liste->getObjet()->getTel_Medecin() ; ?></td>
              <td> <button type="submit" class="b_orange" name="Supprimer" value="<?php echo $liste->getObjet()->getId_medecin() ; ?>">Supprimer</button></td>
             <td><button type="submit" class="b_orange" name="Modifier" value="<?php echo $liste->getObjet()->getId_medecin() ; ?>">Modifier</button></td>
          </tr>   
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>