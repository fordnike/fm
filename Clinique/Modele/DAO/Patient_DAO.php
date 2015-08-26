<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Patient_DAO
 *
 * @author User
 */

class Patient_DAO {
    //put your code here
    public function create($x) {
    
           //$x= new Patient();
            $request = "INSERT INTO  patient(nCarteMaladie, nomPatient, prenomPatient, telDomicilePatient, cellulairePatient, adressePatient, dateNaissancePatient, emailPatient )".
				" VALUES ('".$x->getNCarteMaladie()."','".$x->getNomPatient()."','".$x->getPrenomPatient()."','".$x->getTelDomicilePatient()."','".$x->getCellulairePatient()."','".$x->getAdressePatient()."','".$x->getDateNaissancePatient()."','".$x->getEmailPatient()."')";
	//echo "<br />la requete est de : ".$request."<br />";	
            try
		{
			$db = Database::getInstance();
                        //echo "<br /> EST CREE : ".$db->exec($request)."<br />";	
			return $db->exec($request) ;
		}
		catch(PDOException $e)
		{
			throw $e;
		}
	}
        public static function findAll()
	{
		try {
			$liste_Membres = new liste();
		
			$requete = 'SELECT * from patient ORDER BY nomPatient';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Patient();
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

		$pstmt = $db->prepare("SELECT * FROM patient WHERE ".$type." = :x");//requ�te param�tr�e par un param�tre x.
		$pstmt->execute(array('x' => $val));
		
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		
		if ($result)
		{
			$f = new Patient();
			$f->setNCarteMaladie($result->nCarteMaladie);
                        $f->setNomPatient($result->nomPatient);
			$f->setPrenomPatient($result->prenomPatient);
			$f->setAdressePatient($result->adressePatient);
			$f->setCellulairePatient($result->cellulairePatient);
                        $f->setDateNaissancePatient($result->dateNaissancePatient);
                        $f->setEmailPatient($result->emailPatient);
                        $f->setTelDomicilePatient($result->telDomicilePatient);
                     
                        
			
                        
//                        $mDAO = new Patient_DAO();
//			$f->setListeMembres($mDAO->findMembresDUneFamille($result->numeroFamille));
//					
				
			$pstmt->closeCursor();
			return $f;
		}
		$pstmt->closeCursor();
		return null;
	}
         public static function findListe($type,$val)
	{
		try {
			$liste_Membres = new liste();
		
			$requete = "SELECT * from patient where ".$type."='".$val."'";
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Patient();
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
        public function update($id,$nom,$prenom,$ad,$dat,$em,$teld,$telc) {
        //nom,prenom,tel_Medecin,adresse_M,poste
		$request = "UPDATE patient SET nomPatient= '".$nom."', prenomPatient= '".$prenom."', adressePatient= '".$ad."', dateNaissancePatient= '".$dat."', emailPatient= '".$em."',telDomicilePatient= '".$teld."', cellulairePatient= '".$telc."'  WHERE nCarteMaladie = '".$id."'";
		//echo "requete update ".$request;
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
         
	public function delete($x) {             
                
		$request = "DELETE FROM patient WHERE nCarteMaladie ='".$x."'";
               
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

