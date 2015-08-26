<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(!$_SESSION ["connecter"]==1) {
     header('Location:http://physio-bien-etre-inc.com/Connexion.php');

}
           
?>
<?php
$dao = new Even_DAO;
$idRetourne;



if (isset($_FILES['monfichier']) AND $_FILES['monfichier']['error'] == 0) {
    if ($_FILES['monfichier']['size'] <= 2000000) {
        $infosfichier = pathinfo($_FILES['monfichier']['name']);
        $extension_upload = $infosfichier['extension'];
        $extensions_autorisees = array('JPG', 'jpg','PNG', 'png','JPEG', 'jpeg');
        if (in_array($extension_upload, $extensions_autorisees)) {
                if(isset($_REQUEST["ajouter"])){
                      $ofobjet=new Even($_REQUEST["text"]);
                     $idRetourne=$dao->create($ofobjet);
                     echo "L'envoi a bien été effectué !". move_uploaded_file($_FILES['monfichier']['tmp_name'], "img_even/".$idRetourne.".". $infosfichier['extension']);
                     $dao->update($idRetourne, $_REQUEST["text"],"img_even/".$idRetourne.".". $infosfichier['extension']);
                }  
                if(isset($_REQUEST["modifier"])){           
                     $dao->update($_REQUEST["modifier"],$_REQUEST["chemin"],$_REQUEST["text"]);
                }           

            
        }  else {
            echo "echec ! extension invalide veuillez telechager un fichier type (jpg,jpeg,png)";
        }
    }
     else {
            echo "echec ! le fichier est tros grand ! .2M max";
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
    <h2>GESTION ÉVÉNEMENT</h2>
     <?php  
   if(isset($_REQUEST["Supprimer"])){
     try {         
         $dao->delete($_REQUEST["Supprimer"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>echec de suppression V&egrave;rifier avec l'administrateur de site . ?</p> ";
        
      }     
   }
    if(isset($_REQUEST["modifier"])){
     try {         
         $dao->update($_REQUEST["Modifier"],$_REQUEST["titre"],$_REQUEST["afficher"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'>echec de modification V&egrave;rifier avec l'administrateur de site. ?</p> ";
        
      }     
   }
  
  ?>
<!-- <div id="dg_m" title="Valide">
  <p style="color: red">la Modification est réussit</p>
</div>-->
 
    
    
    
 
      <div class="even_maitre" align=center>
     
         <?php if ( isset($_REQUEST["Modifier"])){ 
             $medecin=$dao->find("id_even", $_REQUEST["Modifier"]);
             
             ?>
      <form id="E_up" method="post" action="?action=Even" enctype = "multipart/form-data" >       
                     <input type="file" name="monfichier" class="fil" /><br />
                     <input type="hidden" name="action" value="Even" />
                     <input type="hidden" name="Modifier" value="<?php echo $_REQUEST["Modifier"];?>" />
                  
                <table >
                    <tr><td><label class="">text :</label></td><td><textarea type="text" name="titre" value="<?php echo $medecin->getText(); ?>"></textarea></td></tr>
          
<!--                    <tr><td> <label >AFFICHER:</label></td><td><select name="afficher">
                        <?php if($medecin->getAfficher()==1){ ?>
                               <option value="1">oui</option>
                              <option value="0">non</option>

                            <?php }else{ ?>
                               <option value="0">non</option>
                               <option value="1">oui</option><textarea class="textarea"></textarea>

                           <?php } ?>
                            </select>
                   </td>
                    </tr>-->
                   
                  
                </table>
      <button type="submit" class="b_orange" name="modifier" id="mdf" > Modifier </button>
       </form >
     <form id="even_sup" method="get" action="?" >
     <input type="hidden" name="action" value="offres" />         
     <button type="submit" class="b_orange" name="Cree" id=""> Crée Un medecin </button>
     </form >
  <?php }else{ ?>
   <form id="even_cree" method="post" action="?" enctype = "multipart/form-data" >
        
       <input type="file" name="monfichier" class="fil" /><br />
     <input type="hidden" name="action" value="even" />
  
                <table>
                    <tr><td><label> text:</label></td><td><textarea  name='text' value='<?php  ?>'/></textarea> </td></tr>
<!--                    <tr><td><label class="">CHEMIN:</label></td><td><input type="text" name="chemin"></td></tr>                  -->
<!--                    <tr><td> <label class="">DATE :</label></td><td><input type="text" name="date"></td></tr>-->
<!--                    <tr><td> <label class="">AFFICHER:</label></td><td> <select name="afficher">
                        <option value="1">oui</option>
                        <option value="0">non</option>
                        
                      </select></td></tr>-->
                    
                  
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
     <input type="hidden"name="action" value="even" />
  <table class='tab2'>
      <tr><td>TEXT</td> <td> CHEMIN </td> </tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <div class="max_text"><p><?php echo $liste->getObjet()->getText_even() ; ?> </p></div></td> 
              <td> <img src="<?php echo $liste->getObjet()->getChemin_even() ; ?>" alt="Smiley face" height="200" width="300"></td>                     
              <td> <button type="submit" class="b_orange" name="Supprimer" value="<?php echo $liste->getObjet()->getId_even() ; ?>">Supprimer</button></td>
             <td><button type="submit" class="b_orange" name="Modifier" value="<?php echo $liste->getObjet()->getId_even()  ; ?>">Modifier</button></td>
          </tr> 
      
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>
