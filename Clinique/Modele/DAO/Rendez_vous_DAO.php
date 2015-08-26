<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Rendez_vous_DAO
 *
 * @author User
 */
class Rendez_vous_DAO {
    //put your code here
    
     public function create($x) {
    
         // $x= new Rendez_vous($pat, $med, $date, $heures) ;
            $request = "INSERT INTO  gestion(pat,med,date,heures)".
				" VALUES ('".$x->getPat()."','".$x->getMed()."','".$x->getDate()."','".$x->getHeures()."')";
	//echo "<br />la requete est de : ".$request."<br />";	
            try
		{
			$db = Database::getInstance();
                        //echo "<br /> (EST CREE : ".$db->exec($request).")<br />";	
			return $db->exec($request) ;
		}
		catch(PDOException $e)
		{
                     print "Error!: " . $e->getMessage() . "<br/>";
			throw $e;
		}
	}
        public static function findAll()
	{
		try {
			$liste_Membres = new liste();
		
			$requete = 'SELECT * from gestion';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Rendez_vous();
				$membre->loadFromRecord($row);
				$liste_Membres->add($membre);
		    }
			$res->closeCursor();
		    $cnx = null;
			return $liste_Membres;
		} catch (PDOException $e) {
		    print "Error!: " . $e->getMessage() . "<br/>";
		    return $liste;
		}	
	}
        public static function find($type,$val)
        {
		$db = Database::getInstance();

		$pstmt = $db->prepare("SELECT * FROM getion WHERE ".$type." = :x");//requ�te param�tr�e par un param�tre x.
		$pstmt->execute(array('x' => $val));
		
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		
		if ($result)
		{
			$f = new Rendez_vous();                       
			$f->setPat($result->pat);
                        $f->setMed($result->med);
			$f->setDate($result->date);
			$f->setHeures($result->heures);    		
			$pstmt->closeCursor();
			return $f;
		}
		$pstmt->closeCursor();
		return null;
	}
         public static function findListe($med,$date)
	{
		try {
		$liste=  array();
               // echo "entre base"."<br />";
		
			$requete = "SELECT patient.nomPatient, patient.prenomPatient,patient.nCarteMaladie,patient.telDomicilePatient,patient.cellulairePatient, gestion.pat, gestion.heures FROM patient, gestion"
                                . " where gestion.med ='".$med."' and gestion.date='".$date."' and patient.nCarteMaladie = gestion.pat order by gestion.heures ";
			//echo "<br />la requete est de : ".$requete."<br />";	
                        $cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
                        
		    foreach($res as $row) {
                      //  echo "<br /> NOM :".$row["nomPatient"]."<br />";	
                              $s=$row["nomPatient"]." & ".$row["prenomPatient"];
                              //                           0     1              2                      3                              4
		              $liste[$row["heures"]]=array($s,$row["pat"],$row["nCarteMaladie"],$row["telDomicilePatient"],$row["cellulairePatient"],$row["heures"]);
                              
			
		    }
			$res->closeCursor();
		    $cnx = null;
			return $liste;
		} catch (PDOException $e) {
		    print "Error!: " . $e->getMessage() . "<br/>";
		    return $liste;
		}	
	}
          
       public function update($x) {
        //nom_emp,prenom_emp,tel_emp,cel_emp, adresse_emp,poste_emp
        //   $x=new Employes();
		$request = "UPDATE employes SET nom_emp='".$x->getNom_emp()."', prenom_emp= '".$x->getPrenom_emp().
                        "', tel_emp='".$x->getTel_emp()."', cel_emp='".$x->getCel_emp()."',adresse_emp='".$x->getAdresse_emp()."',poste_emp='".$x->getPoste_emp()."',user='".$x->getUser()."',mdp='".$x->getMdp().
                        "'  WHERE id_emp ='".$x->getId_emp()."'";
		//echo "requete update ".$request;
                try
		{
			$db = Database::getInstance();
			//$t=$db->exec($request);
                       /// echo 'up est :'.$t."</br>";
                        return $db->exec($request);
		}
		catch(PDOException $e)
		{
			throw $e;
		}
	}
        public function delete($x) {             
                
		$request = "DELETE FROM gestion WHERE "
                        ." CONVERT(pat USING utf8)='".$x->getPat()."'and CONVERT(med USING utf8)='".$x->getMed()."' and CONVERT(date USING utf8)='".$x->getDate()."' and CONVERT(heures USING utf8)='".$x->getHeures()."'";
                //echo $request;
		try
		{
			$db = Database::getInstance();
			return $db->exec($request);
		}
		catch(PDOException $e)
		{
			throw $e;
		}
	}
    
    
    
}
?>
