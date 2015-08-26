<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Employes_DAO {
    //put your code here
    public function create($x) {
    
          // $x= new  Employes() ;
            $request = "INSERT INTO  employes( nom_emp,prenom_emp,tel_emp,cel_emp, adresse_emp,poste_emp)".
				" VALUES ('".$x->getNom_emp()."','".$x->getPrenom_emp()."','".$x->getTel_emp()."','".$x->getCel_emp()."','".$x->getAdresse_emp()."','".$x->getPoste_emp()."')";
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
		
			$requete = 'SELECT * from employes';
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Employes();
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

		$pstmt = $db->prepare("SELECT * FROM employes WHERE ".$type." = :x");//requ�te param�tr�e par un param�tre x.
		$pstmt->execute(array('x' => $val));
		
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		
		if ($result)
		{
			$f = new Employes();
                       
			$f->setAdresse_emp($result->adresse_emp);
                        $f->setCel_emp($result->cel_emp);
			$f->setId_emp($result->id_emp);
			$f->setNom_emp($result->nom_emp);
			$f->setPoste_emp($result->poste_emp);
                        $f->setPrenom_emp($result->prenom_emp);
                        $f->setUser($result->user);
                        $f->setMdp($result->mdp);
                        $f->setTel_emp($result->tel_emp);
                        
                     
                        
			
                        
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
		
			$requete = "SELECT * from employes where ".$type."='".$val."'";
			$cnx = Database::getInstance();
			
			$res = $cnx->query($requete);
		    foreach($res as $row) {
                        
				$membre = new Employes();
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
             public static function login($login,$mtP)
	{
            try{
                if(strlen($login)>2&& strlen($mtP)>2){
		$db = Database::getInstance();

		$pstmt = $db->prepare("SELECT * FROM employes WHERE user= :x");//requête paramétrée par un paramètre x.
		$pstmt->execute(array('x' => $login));
		 //echo 'requet '.$pstmt;
		$result = $pstmt->fetch(PDO::FETCH_OBJ);
		//echo 'mot de passe :'.$result->mdp."</br>";
                //echo 'login idm :'.$result->user."</br>";
		if ($result)
		{
			if(($result->mdp)==($mtP)){
                           // echo 'login au compte'."</br>";                           
                            return  $result->role;
                        }  else {
                           return false;
                        }
		}  else {
                    echo "pas de resultat"."</br>";
                }
		$pstmt->closeCursor();
                }  
		return false;
            }
              catch (Exception $e){
                echo "ERREUR".$e->getMessage();
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
                
		$request = "DELETE FROM employes WHERE id_emp = ".$x."";
               
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