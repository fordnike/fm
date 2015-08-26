<?php

ob_start();
require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
//require_once('Modele/Classe/Annonce.php');
//require_once('Modele/Classe/Patient.php');
//require_once('Modele/Classe/Employes.php');
//require_once('Modele/Classe/Medecin.php');
require_once('../../Modele/Classe/Rendez_vous.php'); 
//require_once('Modele/DAO/Annonce_DAO.php');
//require_once('Modele/DAO/Patient_DAO.php'); 
//require_once('Modele/DAO/Employes_DAO.php'); 
//require_once('Modele/DAO/Medecin_DAO.php'); 
require_once('../../Modele/DAO/Rendez_vous_DAO.php'); 
require_once('../../Modele/Classe/Liste.php'); 
//$daoM=new Medecin_DAO();
//$daoP=new Patient_DAO();

 if(isset($_REQUEST["medecin"])&&isset($_REQUEST["date"])){
          $dao= new Rendez_vous_DAO();               
          $listeP=$dao->findListe($_REQUEST["medecin"],$_REQUEST["date"]);           
   } 

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <style>
        tr{
            background: #FCFCFC;

        }
        .tit{
            background: #CFCFCF;
           font-weight:bold;
           font-size: 120%;
           color:#191950;

        }
        .tab2{
            
            //font-family:Serif;
            
        }
        H1{
           color:#191950;
        }
        span{
             color:#191950;
        }
         
     
        
    </style>
    <body>
   <h1>Physio Bien-Etre.INC</h1>
<div >
    <h3><span  style="margin-left: 220px;">C&#233;dule :</span><?php echo $_REQUEST["nMedecin"];   ?></h3>
   <h3 ><span style="margin-left: 220px;">Date :</span><?php echo $_REQUEST["date"];   ?></h3>  
<table class="tab2" style="width: 100%; border:2px ; ">
    
    <tr class="tit"><td>Heure</td><td>Assurance maladie</td><td>Nom & Prénom patient</td><td>Téléphone domicile</td><td>Téléphone cellulaire</td></tr>
    <?php    ?>
     <?php foreach ($listeP as $row) {?>
    <tr><td><?php echo $row[5];   ?></td><td><?php echo $row[2];   ?></td><td><?php echo $row[0];   ?></td><td><?php echo $row[3];   ?></td><td><?php echo $row[4];   ?></td></tr>
     <?php   } ?>
</table>
</div>
 <?php   
 //ob_start();
   
    $content = ob_get_clean();

    // convert to PDF
    require_once('../../html2pdf_v4.03/html2pdf.class.php');
    try
    {
        $html2pdf = new HTML2PDF('P', 'A4', 'fr');
        $html2pdf->pdf->SetDisplayMode('fullpage');
//      $html2pdf->pdf->SetProtection(array('print'), 'spipu');
        $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
        $html2pdf->Output('Sans titre.pdf');
    }
    catch(HTML2PDF_exception $e) {
        echo $e;
        exit;
    }
 
 ?>
 </body>
 </html>