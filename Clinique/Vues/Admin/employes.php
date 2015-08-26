<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if($_SESSION ["connecter"]==2||$_SESSION ["connecter"]==1){
    
}else{
    header('Location:Connexion.php');  
}
  $dao = new Employes_DAO; 
   if(isset($_REQUEST["Supprimer"])){
     try {         
         $dao->delete($_REQUEST["Supprimer"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>Le nom d'utilisateur ou le mot de passe saisi est incorrect. ?</p> ";
        
      }
       
       
   }
?>
<div class="empADMIN">
  <h2>GESTION EMPLOYES</h2>
      <div class="Emp_maitre" align=center>
         <?php if ( isset($_REQUEST["Modifier"])){ 
               $emp=$dao->find("id_emp", $_REQUEST["Modifier"]);
             
             ?>
        <form id="EMP_up" method="post" action="?action=employes" >
             <input type="hidden"name="action" value="employes" />
             <input type="hidden" name="Modifier" value="<?php echo $_REQUEST["Modifier"];?>" />
         
                <table >
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom" value="<?php echo $emp->getNom_emp();?>"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom" value="<?php echo $emp->getPrenom_emp();?>"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse" value="<?php echo $emp->getAdresse_emp();?>"></td></tr>
                    <tr><td> <label class="">poste:</label></td><td><input type="text" name="poste" value="<?php echo $emp->getPoste_emp();?>"></td></tr>
                    <tr><td><label class=""> Tel-D:</label></td><td><input type="text" name="tel_d" value="<?php echo $emp->getTel_emp();?>"></td></tr>
                    <tr><td><label class="">Tel-C</label></td><td><input type="text" name="tel_c" value="<?php echo $emp->getCel_emp();?>"></td></tr>                  
                    <tr><td> <label class="">user :</label></td><td><input type="text" name="user" value="<?php echo $emp->getUser();?>"></td></tr>
                    <tr><td> <label class="">mot de passe:</label></td><td><input type="password" name="mdp" value="<?php echo $emp->getMdp();?>"></td></tr>
                  
                  
                </table>
      <button type="submit" name="modifier" > Modifier </button>
       </form >
      <form id="" method="post" action="?action=employes" >
             <input type="hidden"name="action" value="employes" />
      
      <button type="submit" name="Cree" > Crée Un Employé </button>
      </form >
  <?php }else{ ?>
  <form id="EMP_cree" method="post" action="?action=employes" >
             <input type="hidden"name="action" value="employes" />
                <table>
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse"></td></tr>
                    <tr><td> <label class="">poste:</label></td><td><input type="text" name="poste"></td></tr>
                    <tr><td><label class=""> Tel-D:</label></td><td><input type="text" name="tel_d"></td></tr>
                    <tr><td><label class="">Tel-C</label></td><td><input type="text" name="tel_c"></td></tr>                  
                    
                   
                  
                </table>
      <button type="submit" name="ajouter" >Ajouter</button>
  
  
    </form >
  </div>
  
  <?php }?>
  <?php ?>
  <?php
  
    $liste=$dao->findAll();
  ?>
    
  <form id="EMP_sup" method="post" action="?action=employes" >
             <input type="hidden"name="action" value="employes" />
  <table class='tab2'>
      <tr><td>Nom</td> <td> Prénom </td> <td>Tel-D </td> <td>Tel-C </td><td>Adresse</td><td>Poste</td><td>USER</td><td>M-PASSE</td></tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <?php echo $liste->getObjet()->getNom_emp() ; ?> </td> 
              <td> <?php echo $liste->getObjet()->getPrenom_emp() ; ?></td>
              <td> <?php echo $liste->getObjet()->getTel_emp(); ?></td>
              <td><?php echo $liste->getObjet()->getCel_emp() ; ?> </td>
              <td> <?php echo $liste->getObjet()->getAdresse_emp() ; ?></td>
              <td> <?php echo $liste->getObjet()->getPoste_emp() ; ?></td>
              <td> <?php echo $liste->getObjet()->getUser() ; ?></td>
              <td> <?php echo $liste->getObjet()->getMdp() ; ?></td>
              <td> <button type="submit" name="Supprimer" value="<?php echo $liste->getObjet()->getId_emp() ; ?>">Supprimer</button></td>
               <td><button type="submit" name="Modifier" value="<?php echo $liste->getObjet()->getId_emp() ; ?>">Modifier</button></td>
          </tr>   
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>