<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Annoce_DAO
 *
 * @author User
 */
class Annonce_DAO {
    //put your code here
    
    
     public function create($x) {
    
          /// $x= new Annonce() ;
            $request = "INSERT INTO  annonce(titre,chemin,afficher,date_annonce)".
				" VALUES ('".$x->getTitre()."','".$x->getChemin()."','".$x->getAfficher()."',NOW())";
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
		
			$requete = 'SELECT * from annonce';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Annonce();
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

		$pstmt = $db->prepare("SELECT * FROM annonce WHERE ".$type." = :x");//requ�te param�tr�e par un param�tre x.
		$pstmt->execute(array('x' => $val));
		
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		
		if ($result)
		{
			$f = new Annonce();
                       
			$f->setChemin($result->chemin);
                        $f->setDate_annonce($result->date_annonce);
			$f->setId_annonce($result->id_annonce);
			$f->setTitre($result->titre);           
			$f->setAfficher($result->afficher);           	
				
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
		
			$requete = "SELECT * from annonce where ".$type."='".$val."'";
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Annonce();
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
           public function delete($x) {             
                
		$request = "DELETE FROM annonce WHERE id_annonce = ".$x."";
               
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
        public function update($id,$tr,$af) {
        //nom,prenom,tel_Medecin,adresse_M,poste
		$request = "UPDATE annonce SET titre='".$tr."', chemin='Fichier/".$tr.".pdf', afficher='".$af."'  WHERE id_annonce ='".$id."'";
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
          public function existeObjet($id) {
        //nom,prenom,tel_Medecin,adresse_M,poste
		$requete = "SELECT * from annonce where id_annonce='".$id."'";
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
