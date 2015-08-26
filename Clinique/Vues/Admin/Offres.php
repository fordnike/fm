<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<?php 
if(!$_SESSION ["connecter"]==1) {
     header('Location:http://physio-bien-etre-inc.com/Connexion.php');

}
           
?>
<?php
$dao = new Annonce_DAO;




if (isset($_FILES['monfichier']) AND $_FILES['monfichier']['error'] == 0) {
    if ($_FILES['monfichier']['size'] <= 1000000) {
        $infosfichier = pathinfo($_FILES['monfichier']['name']);
        $extension_upload = $infosfichier['extension'];
        $extensions_autorisees = array('PDF', 'pdf');
        if (in_array($extension_upload, $extensions_autorisees)) {
        if(isset($_REQUEST["ajouter"])){
              $ofobjet=new Annonce( $_REQUEST["titre"], "Fichier/".$_REQUEST["titre"].".pdf"
             , $_REQUEST["afficher"]);
             $dao->create($ofobjet);
        }  
        if(isset($_REQUEST["modifier"])){           
             $dao->update($_REQUEST["modifier"],$_REQUEST["titre"],$_REQUEST["afficher"]);
        }           

            echo "L'envoi a bien été effectué !". move_uploaded_file($_FILES['monfichier']['tmp_name'], "Fichier/".$_REQUEST["titre"].".". $infosfichier['extension']);
        }  else {
            echo "echec ! extension invalide veuillez telechager un fichier pdf";
        }
    }
     else {
            echo "echec ! le fichier est tros grand ! .1M max";
     }
}
?>
<!--<div class="emploi">
<form method="post" action="?action=offres"enctype = "multipart/form-data" >   
  <label> poste:</label><input type='text' name='poste'value='<?php  ?>'/>   
    <input type="file" name="monfichier" class="fil" /><br />
      
             <input type='hidden' name='nom_album'value='<?php  ?>'/>
        <button type="submit" class="classname" id=''>ajouter</button>
 </form> 
    
</div >-->


 

<div class="emploi">
    <h2>GESTION OFRRES </h2>
     <?php  
   if(isset($_REQUEST["Supprimer"])){
     try {         
         $dao->delete($_REQUEST["Supprimer"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>Le nom d'utilisateur ou le mot de passe saisi est incorrect. ?</p> ";
        
      }     
   }
    if(isset($_REQUEST["modifier"])){
     try {         
         $dao->update($_REQUEST["Modifier"],$_REQUEST["titre"],$_REQUEST["afficher"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>Le nom d'utilisateur ou le mot de passe saisi est incorrect. ?</p> ";
        
      }     
   }
  
  ?>
<!-- <div id="dg_m" title="Valide">
  <p style="color: red">la Modification est réussit</p>
</div>-->
 
    
    
    
 
      <div class="E_maitre" align=center>
     
         <?php if ( isset($_REQUEST["Modifier"])){ 
             $medecin=$dao->find("id_annonce", $_REQUEST["Modifier"]);
             
             ?>
      <form id="E_up" method="post" action="?action=offres" enctype = "multipart/form-data" >
        
         <input type="file" name="monfichier" class="fil" /><br />
     <input type="hidden" name="action" value="offres" />
      <input type="hidden" name="Modifier" value="<?php echo $_REQUEST["Modifier"];?>" />
                  
                <table >
                    <tr><td><label class="">TITRE :</label></td><td><input type="text" name="titre" value="<?php echo $medecin->getTitre() ; ?>"></td></tr>
                    <!--<tr><td><label class="">CHEMIN</label></td><td><input type="text" name="prenom" value="<?php echo $medecin->getChemin() ; ?>"></td></tr>-->                  
                    <!--<tr><td> <label class="">DATE :</label></td><td><input type="text" name="adresse" value="<?php echo $medecin->getDate_annonce(); ?>"></td></tr>-->
                    <tr><td> <label >AFFICHER:</label></td><td><select name="afficher">
                        <?php if($medecin->getAfficher()==1){ ?>
                               <option value="1">oui</option>
                              <option value="0">non</option>

                            <?php }else{ ?>
                               <option value="0">non</option>
                               <option value="1">oui</option>

                           <?php } ?>
                            </select>
                   </td></tr>
                   
                  
                </table>
      <button type="submit" class="b_orange" name="modifier" id="mdf" > Modifier </button>
       </form >
     <form id="M_sup" method="get" action="?" >
     <input type="hidden" name="action" value="offres" />         
     <button type="submit" class="b_orange" name="Cree" id=""> Crée Un medecin </button>
     </form >
  <?php }else{ ?>
   <form id="E_cree" method="post" action="?" enctype = "multipart/form-data" >
        
       <input type="file" name="monfichier" class="fil" /><br />
     <input type="hidden" name="action" value="offres" />
  
                <table>
                    <tr><td><label> TITRE:</label></td><td><input type='text' name='titre'value='<?php  ?>'/> </td></tr>
<!--                    <tr><td><label class="">CHEMIN:</label></td><td><input type="text" name="chemin"></td></tr>                  -->
<!--                    <tr><td> <label class="">DATE :</label></td><td><input type="text" name="date"></td></tr>-->
                    <tr><td> <label class="">AFFICHER:</label></td><td> <select name="afficher">
                        <option value="1">oui</option>
                        <option value="0">non</option>
                        
                      </select></td></tr>
                    
                  
                </table>
      <button type="submit" name="ajouter" class="b_orange" value="" style="border: 0px;">Ajouter</button>
  
  
   </form >
  </div>
 
  <?php }?>
  <?php ?>
  <?php
  
    $liste=$dao->findAll();
  ?>
  <form id="E_tab" method="get" action="?" >
     <input type="hidden"name="action" value="offres" />
  <table class='tab2'>
      <tr><td>TITRE</td> <td> CHEMIN </td> <td>DATE </td> <td>AFFICHER </td></tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <?php echo $liste->getObjet()->getTitre() ; ?> </td> 
              <td> <?php echo $liste->getObjet()->getChemin() ; ?></td>
              <td> <?php echo $liste->getObjet()->getDate_annonce(); ?></td>
              <td><?php echo $liste->getObjet()->getAfficher() ; ?> </td>             
              <td> <button type="submit" class="b_orange" name="Supprimer" value="<?php echo $liste->getObjet()->getId_annonce() ; ?>">Supprimer</button></td>
             <td><button type="submit" class="b_orange" name="Modifier" value="<?php echo $liste->getObjet()->getId_annonce()  ; ?>">Modifier</button></td>
          </tr>   
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>