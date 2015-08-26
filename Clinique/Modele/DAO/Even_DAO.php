<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Even_DAO {
    //put your code here
    
    
     public function create($x) {
    
       // $x= new Even() ;
            $request = "INSERT INTO  even(text_even)".
				" VALUES ('".$x->getText_even()."')";
	//echo "<br />la requete est de : ".$request."<br />";	
            try
		{
			$db = Database::getInstance();
                        //echo "<br /> (EST CREE : ".$db->exec($request).")<br />";
                        $db->exec($request) ;
                        $res = $db->query('select max(id_even)"max" from even ');
                         foreach($res as $row) {
                            return $row["max"] ;
		         }
			return false;
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
		
			$requete = 'SELECT * from even';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Even();
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
                
		$request = "DELETE FROM even WHERE id_even = ".$x."";
                $request = "DELETE FROM even WHERE id_even = ".$x."";
               
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
        public function update($id,$tr,$ch) {
        //nom,prenom,tel_Medecin,adresse_M,poste
		$request = "UPDATE even SET text_even='".$tr."', chemin_even='".$ch."'  WHERE id_even ='".$id."'";
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
		$requete = "SELECT * from  even where id_even='".$id."'";
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