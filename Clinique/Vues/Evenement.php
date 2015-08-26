<?php 
$daoEven=new Even_DAO();
$listeEven=$daoEven->findAll();
?>
<div class="evenement" align="center">
     <h1 >
        &#201;V&#201;NEMENTS</h1>
    
      
   
     
    
     <?php  while ($listeEven->next()){?>
         
       <img class='img_even' src="<?php echo $listeEven->getObjet()->getChemin_even();?>" ><br>
       <div>
           <p> <?php echo $listeEven->getObjet()->getText_even();?></p>
       </div>
         
     <?php } ?>
      
</div>