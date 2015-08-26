<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$daoMedecin=new Medecin_DAO();
$listeMedecin=$daoMedecin->findAll();

?>
<div class="equipe">
    <h1 > L&rsquo;&Eacute;QUIPE</h1>
    <img src="images/equipe_physio.png" alt="Css Template Preview" /> 
<!--    <h2 >
        <span style="color:#000080;">L&rsquo;&Eacute;QUIPE PHYSIO BIEN-ETRÊ, DES PROFESSIONNELS QUALIFI&Eacute;S &Agrave; VOTRE SERVICE</span></h2>
   
    <p style="margin: 10px 0px 20px; padding: 0px; border: 0px; font-family: 'Helvetica Neue', sans-serif; font-size: 15px; line-height: 19.5px; vertical-align: baseline; color: rgb(127, 128, 132); -webkit-text-stroke-width: 0.25px;">
        <span style="color:#000080;">Avec Physio Bien Être vous pouvez compter sur une &eacute;quipe dynamique et professionnelle pour vous accompagner tout au long de votre r&eacute;adaptation et pour vous aider &agrave; r&eacute;tablir votre sant&eacute; physique et morale.<br />
           </span></p>-->
      <p>Une équipe dynamique et professionnelle pour vous accompagner tout au long de votre

réadaptation et pour vous aider à rétablir votre santé physique et morale.</br></p>
           <table style="padding-top: 10px;">

        <?php while ($listeMedecin->next()) { ?>    
            <tr>
               <td> <h3 style="margin: 0;padding: 0;"><?php echo $listeMedecin->getObjet()->getPrenom() . ' &nbsp; ' . $listeMedecin->getObjet()->getNom(); ?> </h3></td> <h4  style="margin: 0;padding: 0;"><td> <?php echo ':&nbsp;'.$listeMedecin->getObjet()->getPoste(); ?></h4></td>
            </tr>
        <?php } ?>

    </table>
</div>