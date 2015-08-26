<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Medecin_DAO
 *
 * @author User
 */
class Medecin_DAO {
    //put your code here
     public function create($x) {
    
          // $x= new Medecin();
            $request = "INSERT INTO  medecin(nom,prenom,tel_Medecin,adresse_M,poste)".
				" VALUES ('".$x->getNom()."','".$x->getPrenom()."','".$x->getTel_Medecin()."','".$x->getAdresse_M()."','".$x->getPoste()."')";
	//echo "<br />la requete est de : ".$request."<br />";	
            try
		{
			$db = Database::getInstance();
                       // echo "<br /> EST CREE : ".$db->exec($request)."<br />";	
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
		
			$requete = 'SELECT * from medecin';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Medecin();
				$membre->loadFromRecord($row);
				$liste_Membres->add($membre);
		    }
			$res->closeCursor();
		    $cnx = null;
			return $liste_Membres;
		} catch (PDOException $e) {
		    "<p style='color=red;'>M Error!: " . $e->getMessage() . "</p><br/>";
		    return $liste;
		}	
	}
        public static function find($type,$val)
	{
		$db = Database::getInstance();

		$pstmt = $db->prepare("SELECT * FROM medecin WHERE ".$type." = :x");//requ�te param�tr�e par un param�tre x.
		$pstmt->execute(array('x' => $val));
		
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		
		if ($result)
		{
			$f = new Medecin();
			$f->setAdresse_M($result->adresse_M);
                        $f->setId_medecin($result->id_medecin);
			$f->setNom($result->nom);
			$f->setPoste($result->poste);
			$f->setPrenom($result->prenom);
                        $f->setTel_Medecin($result->tel_Medecin);
                       
                     
                        
			
                        
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
		    print "<p style='color=red;'>M Error!: " . $e->getMessage() . "</p><br/>";
		    return $liste;
		}	
	}
    public function update($id,$nom,$prenom,$ad,$tel,$ps) {
        //nom,prenom,tel_Medecin,adresse_M,poste
		$request = "UPDATE medecin SET poste= '".$ps."', nom= '".$nom."', prenom= '".$prenom."', tel_Medecin= '".$tel."', adresse_M= '".$ad."'  WHERE id_medecin = '".$id."'";
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
                
		$request = "DELETE FROM medecin WHERE id_medecin = ".$x."";
               
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
