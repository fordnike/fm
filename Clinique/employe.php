<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<?php 
require_once('BD/config.php'); 
require_once('BD/Database.php'); 
require_once('Modele/Classe/Patient.php');
require_once('Modele/Classe/Employes.php');
require_once('Modele/Classe/Medecin.php');
require_once('Modele/DAO/Patient_DAO.php'); 
require_once('Modele/DAO/Employes_DAO.php'); 
require_once('Modele/DAO/Medecin_DAO.php'); 
require_once('Modele/Classe/Liste.php'); 
$daoM=new Medecin_DAO();
$daoP=new Patient_DAO();
$listeM=$daoM->findAll();

                
  ?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    <script>
      var val;
        function myFunction($val)
        {
            val=$val;
        alert($val);
        }
  </script>
       
  <link rel="stylesheet" href="Css/StylePrincipal.css" />
  <link rel="stylesheet" href="Css/table.css" />
  <link rel="stylesheet" href="Css/tableBlack.css" />
 <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="JavaScript/admin/BoitDailogue.js"></script>
  <script src="JavaScript//admin/Recherche.js"></script>
  
  
  
  <script>
  $(function() {
    $( ".datepicker" ).datepicker( { numberOfMonths: 2,showButtonPanel: true});
  });
  </script>
    </head>
    <body >
        <div class="ag_all">
        <div class="date">
            <div style="white:300px"> Date: <input type="text" class="datepicker" /> </div>
            <div class="patient">    
             <form id="myForm3" method="post" action="#" >
                <table>
                    <tr><td><label class="">Nom :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">prénom </label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">Date de naissance </label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class="">numéro de la Carte maladie</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Adresse :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Email :</label></td><td><input type="text" name=""></td></tr>
                    <tr><td><label class=""> Tel domicile:</label></td><td><input type="text" name=""></td></tr>
                    <tr><td> <label class="">Tel cellulaire :</label></td><td><input type="text" name=""></td></tr>
                </table>
            </form >
            </div>
           <div class="d_rech">
                <div style="white:300px"> Date: <input type="text" class="datepicker" /> </div>
                <label class=""> Telephone :</label><input id="" class="" type="text" name="" onclick="myFunction('')"><button type="submit" id="" class='' name="" > Recherche </button></br>
                
            </div>
        </div>
        <div class="heurs">
            <div > 
                <select>
                <?php   while ($listeM->next()){  ?>              
                      <option value="volvo"><?php echo$listeM->getObjet()->getNom();?></option>
               <?php }?>
                </select> 
                
            </div>
            
            <?php for ($i = 8; $i < 21; $i++) { ?>
                <label class="">  <?php echo $i . ':00'; ?></label><input id="<?php echo $i . ':00'; ?>" class="opener" type="text" name="<?php echo $i . ':00'; ?>" onclick="myFunction('<?php echo $i . ':00'; ?>')"><button type="submit" id="sbm" class='btEnv' name="opener" > Supprimer</button></br>
                <label class="">  <?php echo $i . ':30'; ?></label><input id="<?php echo $i . ':00'; ?>" class="opener" type="text" name="<?php echo $i . ':00'; ?>" onclick="myFunction('<?php echo $i . ':00'; ?>')"><button type="submit" id="sbm" class='btEnv' name="opener" > Supprimer</button></br>
            <?php } ?>


        </div>
        <div id="dialog" title="Basic dialog">
          <form id="myForm" method="post" action="#" >
           <h3 class="ht"> </h3 >
            <table  class="tbD_rech">
                <tr><td><label class="">Telephone :</label></td><td><input class="t" type="text" name="telephone" value="nom 1" ondblclick="myFunction('t')">  <button type="submit" id="sbm" class='btEnv' name="opener" > Recherche</button></td></tr>
<!--            <tr><td><label class="">Nom :</label></td><td><input class="t" type="text" name="" value="nom 1" ondblclick="myFunction('t')"></td></tr>
                <tr><td><label class="">prénom :</label></td><td><input class="t1" type="text" name="" value="pren1" ondblclick="myFunction('t1')"></td></tr>
                <tr><td><label class="">Nom :</label></td><td><input type="text" name=""></td></tr>
                <tr><td><label class="">prénom </label></td><td><input type="text" name=""></td></tr>
                <tr><td><label class="">numéro Carte maladie</label></td><td><input type="text" name=""></td></tr>
                <tr><td><label class=""> Tel domicile:</label></td><td><input type="text" name=""></td></tr>
                <tr><td> <label class="">Tel cellulaire :</label></td><td><input type="text" name=""></td></tr>-->

            </table>
            <h6 class="test"></h6>
<!--             <button type="submit" id="opener" class='btEnv' name="opener" > Envoyer</button>-->
          </form>
            <form id="myForm2" method="post" action="#" >
                
            </form>
        </div>

        <?php
        // put your code here
        ?>
      </div>
    </body>
</html>
