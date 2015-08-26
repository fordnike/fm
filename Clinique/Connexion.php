<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<?php
session_start();

if (!ISSET($_SESSION))
    session_start();
if ((ISSET($_SESSION) && $_SESSION ["connecter"])){
    //echo 'connecter';
}
 
?>
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
  
    </head> 
    <body>
      <div class="conn_all" align=center> 
        <?php
        if(ISSET($_SESSION ["connecter"])){
            switch ($_SESSION ["connecter"]){
                case 1:                   
                   include_once 'Vues/Admin/admin.php'; 
                break;
                case 2:                    
                    include_once 'Vues/Admin/rendez_vous.php'; 
                break;
            }            
        }else{ 
        // header('Location:http://developpement.netau.net/Vues/Admin/login.php');
         include_once 'Vues/Admin/login.php';             
        }
        ?>
      </div>       
    </body>
</html>
