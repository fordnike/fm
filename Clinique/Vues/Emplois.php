<?php 
$daoof=new Annonce_DAO();
$listeof=$daoof->findAll();
?>
<div class="emploiss" align="center">
     <h1 >
        EMPLOIS</h1>
    
       <h2>Liste des emplois disponibles</h2>
   
     
    
     <?php 
     $temp=0;
     //echo 'temp'.$temp;
     while ($listeof->next()){
     
     if( $listeof->getObjet()->getAfficher()=="1"){ 
          $temp=1;
          ?>
         
       <a href="<?php echo $listeof->getObjet()->getChemin();?>" target="_blank"><?php echo $listeof->getObjet()->getTitre();?></a><br>
         
     <?php }
     
     }if($temp==0){?>
          <h2>Aucune offre d'emploi n'est disponible en ce moment.</h2>
     <?php } 
     
     ?>  
</div>