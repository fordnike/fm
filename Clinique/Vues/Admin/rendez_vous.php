 <?php 
if(!($_SESSION ["connecter"]==1||$_SESSION ["connecter"]==2)) {
     header('Location:http://physio-bien-etre-inc.com/Connexion.php');

}
           
?>
<?php 


if(isset($_REQUEST["heures"])){
    $daoRDV= new Rendez_vous_DAO();
    $obj=new Rendez_vous($_REQUEST["pat"],$_REQUEST["medecin"],$_REQUEST["date"],$_REQUEST["heures"]);
   
    if($daoRDV->delete($obj)){
        echo "la suppression se fait avec succées !";
    }
}else{
    // echo "non";
}

?>
<div class="ag_all" align=center>
    <form id="" method="post" action="Vues/Admin/deconnecter.php" >
        <button type="submit" name="Deconnecter">Deconnécter</button>
    </form>
<!--     <table>
         <tr><td>-->
        <div class="date">
            <fieldset>
                <form  id="Formdate" method="get" action="?">
                    <input type="hidden" name="action" value="rendez_vous">
            <div style="white:300px"> Date: <input type="text" class="datepicker" name="date" value="<?php if(isset($_REQUEST["date"])&&$_REQUEST["date"]!=""){
                    echo $_REQUEST["date"];
                }else{
                    echo '';
                }
                   ?>"/>
            </div> 
                    </form>
            </fieldset>
    <div class="patADMIN">        
           <!--      ----------------------creation nouveau patient--------------------------------------------------------------                    >
            
            
   <div class="patADMIN">
     <?php  $dao = new Patient_DAO;
  
     if(isset($_REQUEST["Supprimer"])){
        try {         
            echo'est supprimer'.$dao->delete($_REQUEST["Supprimer"]);  

         } catch (Exception $exc) {
             echo "<p style='color:red'>?</p> ";

         }
       
       
   }else{
              echo 'n est pas';}
   if(isset($_REQUEST["modifier"])){
     try {         
         $dao->update($_REQUEST["Modifier"],$_REQUEST["nom"],$_REQUEST["prenom"],$_REQUEST["adresse"],$_REQUEST["dt"],$_REQUEST["em"],$_REQUEST["teld"],$_REQUEST["telc"]);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'> ?</p> ";
        
      }
       
       
   }
   if(isset($_REQUEST["ajouter"])){
     try {   
         $objetpatient=new Patient($_REQUEST["cm"],$_REQUEST["nom"],$_REQUEST["prenom"],$_REQUEST["teld"],$_REQUEST["telc"],$_REQUEST["adresse"],$_REQUEST["dt"],$_REQUEST["em"]);
         $dao->create($objetpatient);  
        
      } catch (Exception $exc) {
          echo "<p style='color:red'> ?</p> ";
        
      }
       
       
   }
  
  ?>
<!-- <div id="dg_m" title="Valide">
  <p style="color: red">la Modification est réussit</p>
</div>-->
 
    
    
    
 
      <div class="pat_maitre" align=center>
          <h2>PATIENT  </h2>
     
         <?php if ( isset($_REQUEST["Modifier"])){ 
             $medecin=$dao->find("nCarteMaladie", $_REQUEST["Modifier"]);
             
             ?>
      <form id="pat_up" method="post" action="?action=rendez_vous" >
   <input type="hidden" name="action" value="rendez_vous" />
      <input type="hidden" name="Modifier" value="<?php echo $_REQUEST["Modifier"];?>" />
                  
                <table >
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom" value="<?php echo $medecin->getNomPatient() ; ?>"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom" value="<?php echo $medecin->getPrenomPatient() ; ?>"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse" value="<?php echo $medecin->getAdressePatient(); ?>"></td></tr>
                    <tr><td> <label class="">carte maladie:</label></td><td><input type="text" name="cm" value="<?php echo $medecin->getNCarteMaladie() ; ?>"></td></tr>
                    <tr><td><label class=""> Date de naissance:</label></td><td><input type="text" name="dt" value="<?php echo $medecin->getDateNaissancePatient() ; ?>"></td></tr>
                    <tr><td><label class=""> Email:</label></td><td><input type="text" name="em" value="<?php echo $medecin->getEmailPatient() ; ?>"></td></tr>
                    <tr><td><label class=""> Tél D:</label></td><td><input type="text" name="teld" value="<?php echo $medecin->getTelDomicilePatient(); ?>"></td></tr>
                    <tr><td><label class=""> Tel C :</label></td><td><input type="text" name="telc" value="<?php echo $medecin->getCellulairePatient() ; ?>"></td></tr>
                 
                </table>
      <button type="submit" class="b_orange" name="modifier" id="mdf" > Modifier </button>
       </form >
     <form id="pat_sup" method="get" action="#" >
     <input type="hidden" name="action" value="medecin" />         
     <button type="submit" class="b_orange" name="Cree" id=""> Crée Un medecin </button>
     </form >
  <?php }else{ ?>
   <form id="pat_cree" method="post" action="?" >
     <input type="hidden" name="action" value="rendez_vous" />
  
                <table>
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name="nom"></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name="prenom"></td></tr>                  
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name="adresse"></td></tr>
                    <tr><td> <label class="">carte maladie:</label></td><td><input type="text" name="cm"></td></tr>
                    <tr><td><label class=""> date de naissance:</label></td><td><input type="text" name="dt"></td></tr>                    
                    <tr><td><label class=""> email:</label></td><td><input type="text" name="em"></td></tr>
                    <tr><td><label class=""> Tél d:</label></td><td><input type="text" name="teld"></td></tr>
                    <tr><td><label class=""> Tél c:</label></td><td><input type="text" name="telc"></td></tr>
                  
                </table>
      <button type="submit" name="ajouter" class="b_orange" value="" style="border: 0px;">Ajouter</button>
  
  
   </form >
  </div>
 
  <?php }?>
  <?php ?>
  <?php
  
    $liste=$dao->findAll();
  ?>
  <form id="pat_tab" method="get" action="?" >
<input type="hidden" name="action" value="rendez_vous" />
  <table class='tab2'>
      <tr><td>Nom</td> <td> Prénom </td>  <td>carte maladie </td><td>Tel D</td></tr>
      
    <?php while($liste->next()){ ?> 
          <tr><td> <?php echo $liste->getObjet()->getNomPatient() ; ?> </td> 
              <td> <?php echo $liste->getObjet()->getPrenomPatient() ; ?></td>
<!--              <td> <?php echo $liste->getObjet()->getAdressePatient(); ?></td>-->
              <td><?php echo $liste->getObjet()->getNCarteMaladie() ; ?> </td>
<!--              <td> <?php echo $liste->getObjet()->getDateNaissancePatient() ; ?></td>-->
<!--              <td> <?php echo $liste->getObjet()->getEmailPatient()  ; ?></td>-->
              <td> <?php echo $liste->getObjet()->getTelDomicilePatient() ; ?></td>
<!--              <td> <?php echo $liste->getObjet()->getCellulairePatient() ; ?></td>-->
              <td> <button type="submit" class="b_orange" name="Supprimer" value="<?php echo $liste->getObjet()->getNCarteMaladie() ; ?>">Supprimer</button></td>
             <td><button type="submit" class="b_orange" name="Modifier" value="<?php echo $liste->getObjet()->getNCarteMaladie() ; ?>">Modifier</button></td>
          </tr>   
      
  <?php } ?>
  
 
       
  </table>
  </form >
  </div>         
            
<!----------------------------------- fin   patient ------------------------------------------>
            
            
            <!--      ------------------------------------------------------------------------------------                    >
            
            
<!--            <fieldset>
            <div class="patient">    
             <form id="myForm3" method="post" action="#" >
                <table>
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">Date de naissance </label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">Carte maladie</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Email :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class=""> Tel domicile:</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Tel cellulaire :</label></td><td><input type="text" name=""></td></tr>
                </table>
            </form >
            </div>
            </fieldset>
            <fieldset>
           <div class="d_rech">
                <div style="white:300px"> Date: <input type="text" class="datepicker" /> </div>
                <label class=""> T&#233;l&#233;phone :</label><input id="" class="" type="text" name="" onclick="myFunction('')"><button type="submit" id="" class='' name="" > Recherche </button></br>
                
            </div>
            </fieldset>-->
        </div>
<!--         </td>
        <td>-->
        <div class="heurs">
             
            <fieldset>
            <div > 
                <p style="margin: 0;padding: 0">les codes de recherche :</p>
                <p style="margin: 0;padding: 0">Stop tel:514-000-0000  </p>
                <p style="margin: 0;padding: 0">Réservé tel:514-444-4444</p>
                <p style="margin: 0;padding: 0">Nouveau tel:514-111-1111</p></br>
                <?php if(isset($_REQUEST["date"])&&$_REQUEST["date"]!=""){
                    echo '<p class="pDate" style="color:#191950; font-weight: bold;">Date du rendez-vous :'.$_REQUEST["date"].'<p>';
                }else{
                    echo '<p class="pDate" style="color:#191950;font-weight: bold;">saisie une date <p>';
                }
                   ?>
                <a target='_blank' href="http://physio-bien-etre-inc.com/Vues/Admin/imprimer.php?medecin=<?php echo $_REQUEST["medecin"]; ?>&nMedecin=<?php echo $_REQUEST["nMedecin"]; ?>&date=<?php echo $_REQUEST["date"]; ?>" >Imprimer</a></br>
             
               Cédule: <select id="s_medecin" name="sel">
                    
                     <option value="choix">Choix</option>
                <?php   while ($listeM->next()){ 
                    if($_REQUEST["medecin"]==$listeM->getObjet()->getId_medecin()){
                    ?>              
                      <option  value="<?php echo$listeM->getObjet()->getId_medecin();?>" selected><?php echo$listeM->getObjet()->getNom()."  ".$listeM->getObjet()->getPrenom();?></option>
               
                          <?php 
                    }else{?> 
                          <option  value="<?php echo$listeM->getObjet()->getId_medecin();?>"><?php echo$listeM->getObjet()->getNom()."  ".$listeM->getObjet()->getPrenom();?></option>
                <?php 
                    }
                    }
                    //$_REQUEST["nomedecin"]=$listeM->getObjet()->getNom()." & ".$listeM->getObjet()->getPernom();
                    ?>
                </select> 
                
            </div>
               
              <?php if(isset($_REQUEST["medecin"])&&isset($_REQUEST["date"])){
               $dao= new Rendez_vous_DAO();               
                $listeP=$dao->findListe($_REQUEST["medecin"],$_REQUEST["date"]);           
                ?>
                <input type="hidden" name="medecin" value="<?php echo $_REQUEST["medecin"] ; ?>">
                <input type="hidden" name="date" value="<?php echo $_REQUEST["date"]; ?>">
                <input type="hidden" name="nMedecin" value="<?php echo $_REQUEST["nMedecin"]; ?>">
            <?php for ($i = 8; $i < 21; $i++) { 
                  if(array_key_exists($i."00",$listeP)){ ?>
              
                <label class="">  <?php echo $i.':00'; ?><img class="imgAjt" src="images/ajt.png" title="Ajouter" id="<?php echo "img".$i.'00a'; ?>" onclick="myFunction('<?php echo $i.'00a'; ?>')"></label>
                <input id="<?php echo $i.'00'; ?>" class="opener" type="text" name="<?php echo $i.'00'; ?>" 
                       value="<?php echo $listeP[$i."00"][0]; ?>" onclick="myFunction('<?php echo $i.'00'; ?>')" title="N&#176;Assurance maladie : <?php echo $listeP[$i."00"][2]; ?>
                       TEL-D :<?php echo $listeP[$i."00"][3]; ?>
                        TEL-C :<?php echo $listeP[$i."00"][4]; ?>">
                <a href="?action=rendez_vous&medecin=<?php echo $_REQUEST["medecin"] ; ?>&date=<?php echo $_REQUEST["date"] ; ?>&heures=<?php echo $i.'00'; ?>&pat=<?php echo $listeP[$i."00"][1]; ?>"><button type="submit" id="<?php echo "sup".$i.'00'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button></a>
<!--                <button type="submit" id="<?php echo "mdf".$i.'00'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
                </br>
              
                <div id="<?php echo "div".$i.'00'; ?>" > 
                </div>
              
              <?php }else{?>
                <label class="">  <?php echo $i.':00'; ?><img src="images/ajt.png" title="Ajouter" id="<?php echo "img".$i.'00'; ?>" onclick="myFunction('<?php echo $i.'00'; ?>')"></label>
                <input id="<?php echo $i.'00'; ?>" class="opener" type="text" name="<?php echo $i .':00'; ?>" 
                       value="" onclick="myFunction('<?php echo $i.'00'; ?>')">
                <!--<button type="submit" id="<?php echo "sup".$i.'00'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button><button type="submit" id="<?php echo "mdf".$i.':00'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
               </br>
               <?php   }
               //////////////////////////////////////////////////////////////////////////////
               if(array_key_exists($i."00a",$listeP)){ ?>
              
                <label class="">  <?php echo $i.':00a'; ?></label>
                <input  class="opener" type="text" name="<?php echo $i.'00a'; ?>" 
                       value="<?php echo $listeP[$i."00a"][0]; ?>" title="N&#176;Assurance maladie : <?php echo $listeP[$i."00a"][2]; ?>
                       TEL-D :<?php echo $listeP[$i."00a"][3]; ?>
                        TEL-C :<?php echo $listeP[$i."00a"][4]; ?>">
                <a href="?action=rendez_vous&medecin=<?php echo $_REQUEST["medecin"] ; ?>&date=<?php echo $_REQUEST["date"] ; ?>&heures=<?php echo $i.'00a'; ?>&pat=<?php echo $listeP[$i."00a"][1]; ?>"><button type="submit" id="<?php echo "sup".$i.'00a'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button></a>
<!--                <button type="submit" id="<?php echo "mdf".$i.'00'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
                </br>      
              <?php }
               
               
               //////////////////////////////////////////////////////////////////////////////
               
               
               
               
               
               
                  if(array_key_exists($i."30",$listeP)){ ?>               
                <label class="">  <?php echo $i.':30'; ?><img class="imgAjt" src="images/ajt.png" title="Ajouter"id="<?php echo "img".$i.'30a'; ?>"onclick="myFunction('<?php echo $i.'30a'; ?>')"></label>
                <input id="<?php echo $i.'30'; ?>" class="opener" type="text" name="<?php echo $i.'30'; ?>"
                       value="<?php echo $listeP[$i."30"][0]; ?>" onclick="myFunction('<?php echo $i.'30'; ?>')"title="N&#176;Assurance maladie : <?php echo $listeP[$i."30"][2]; ?>
                       TEL-D:<?php echo $listeP[$i."30"][3]; ?>
                       TEL-C:<?php echo $listeP[$i."30"][4]; ?>">
                <a href="?action=rendez_vous&medecin=<?php echo $_REQUEST["medecin"]; ?>&date=<?php echo $_REQUEST["date"] ; ?>&heures=<?php echo $i.'30'; ?>&pat=<?php echo $listeP[$i."30"][1]; ?>"><button type="submit" id="<?php echo "sup".$i.'30'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button></a>
                <!--<button type="submit" id="<?php echo "mdf".$i.'00'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
                </br>
              
              <?php }else{?>
                <label class="">  <?php echo $i.':30'; ?><img src="images/ajt.png" title="Ajouter" id="<?php echo "img".$i.'30'; ?>"></label>
                <input id="<?php echo $i.'30'; ?>" class="opener" type="text" name="<?php echo $i.'30'; ?>" 
                         onclick="myFunction('<?php echo $i.'30'; ?>')">
                <!--<button type="submit" id="<?php echo "sup".$i.'30'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button><button type="submit" id="<?php echo "mdf".$i.'30'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
                </br>
               
               <?php   } 
               
                if(array_key_exists($i."30a",$listeP)){ ?>
              
                <label class="">  <?php echo $i.':30a'; ?></label>
                <input  class="opener" type="text" name="<?php echo $i.'30a'; ?>" 
                       value="<?php echo $listeP[$i."30a"][0]; ?>" title="N&#176;Assurance maladie : <?php echo $listeP[$i."30a"][2]; ?>
                       TEL-D :<?php echo $listeP[$i."30a"][3]; ?>
                        TEL-C :<?php echo $listeP[$i."30a"][4]; ?>">
                <a href="?action=rendez_vous&medecin=<?php echo $_REQUEST["medecin"] ; ?>&date=<?php echo $_REQUEST["date"] ; ?>&heures=<?php echo $i.'30a'; ?>&pat=<?php echo $listeP[$i."30a"][1]; ?>"><button type="submit" id="<?php echo "sup".$i.'30a'; ?>" class='b_sup_h' name="opener" title="Supprimer"> </button></a>
<!--                <button type="submit" id="<?php echo "mdf".$i.'30a'; ?>" class='b_mdf_h' name="opener" title="Modifier"> </button>-->
                </br>      
              <?php }
               
               
            }
            } ?>
            </fieldset>
            
        </div>
<!--        </td>
        </tr>
     </table>-->
        <div id="dialog" title="Basic dialog">
          <form id="myForm" method="post" action="#" >
           <div class="ht"> </div >
            <table  class="tbD_rech">
                <tr><td><label class="">Telephone :</label></td><td><input class="t" type="text" name="telephone" value="" ondblclick="myFunction('t')">  <button type="submit" id="sbm" class='btEnv' name="opener" > Recherche</button></td></tr>
                

            </table>
            <h6 class="test"></h6>
<!--             <button type="submit" id="opener" class='btEnv' name="opener" > Envoyer</button>-->
          </form>
            <form id="myForm2" method="post" action="#" >
                
            </form>
            <form id="formAjouterP" method="post" action="#" >
                
            </form>
        </div>

        <?php
        // put your code here
        ?>
      </div>