
<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once('../../BD/config.php'); 
require_once('../../BD/Database.php'); 
require_once('../../Modele/Classe/Patient.php'); 
require_once('../../Modele/Classe/Liste.php'); 
require_once('../../Modele/DAO/Patient_DAO.php');    
 $dao = new Patient_DAO(); 

 //echo "<script>alert(\"la variable est nulle\")</script>"; 
// if($dao->find('nCarteMaladie', $_REQUEST['telephone'])){
//     
//     echo "ok";   
// }else{
//    echo "echec";
// }$liste=$dao->findListe('telDomicilePatient', $_REQUEST['telephone']);
 $liste=$dao->findListe('telDomicilePatient', $_REQUEST['telephone']);
 if($liste->size()!=0){
     
     $s=" <div class='datagrid'><table  > <thead><th>N carte maladie</th> <th> pernom </th> <th>nom </th> <th></thead><tbody>";
     $i=0;
     while($liste->next()){
         if($i==0){
           $s=$s." <tr><td>".$liste->getObjet()->getNCarteMaladie()."</td><td>".$liste->getObjet()->getNomPatient()."</td><td>".$liste->getObjet()->getPrenomPatient() .""
                   . "</td><td>"
                   . " <button type=\"submit\" onclick=\"ajtDlg('".$liste->getObjet()->getNCarteMaladie()."')\">Ajouter</button></td></tr>"; 
         
           $i=1;
         }else{
             $s=$s." <tr class='alt'><td>".$liste->getObjet()->getNCarteMaladie() ."</td><td>".$liste->getObjet()->getNomPatient()."</td><td>".$liste->getObjet()->getPrenomPatient() .""
                     . "</td><td>"
                     . "<button type=\"submit\" onclick=\"ajtDlg('".$liste->getObjet()->getNCarteMaladie()."')\">Ajouter</button></td></tr>";
            $i=0; 
         }
         
     }
     echo $s."</tbody></table><div>"; 
         
 }else{
    echo "echec";
 }
 
 
?>
