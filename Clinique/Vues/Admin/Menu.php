<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<?php 
if(!$_SESSION ["connecter"]==1) {
    header('Location:http://physio-bien-etre-inc.com/Connexion.php');
}
           
?>
<div class="menuADMIN" align=center>  
   
   <a class ="a_menu"  href='?action=employes'><span id="m1">EMPLOYES</span></a>
   <a class ="a_menu"  id="m2" href='?action=offres'><span>OFFRES</span></a> 
    <a class ="a_menu" id="m3" href='?action=medecin'><span>&#201;QUIPES</span></a>  
   <a class ="a_menu" id="m4" href='?action=even'><span>&#201;V&#201;NEMENTS</span></a>  
    
   <a class ="a_menu" id="m6" href='?action=patient'><span>PATIENT</span></a>
   <a class ="a_menu" id="m5" href="?action=rendez_vous"><span>RENDEZ-VOUS</span></a>
   <a class ="a_menu" id="m5" href='?action=deconnecter'><span>DECONNECTER</span></a>
  

</div>     