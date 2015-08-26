<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Medecins
 *
 * @author User
 */
class Medecin {
    //put your code here
 
    private $id_medecin;
     private $nom;
     private $prenom;
     private $tel_Medecin;
     private $adresse_M;
     private $poste;
     function __construct($nom="", $prenom="", $tel_Medecin="", $adresse_M="", $poste="") {
         $this->nom = $nom;
         $this->prenom = $prenom;
         $this->tel_Medecin = $tel_Medecin;
         $this->adresse_M = $adresse_M;
         $this->poste = $poste;
     }

     
     public function getId_medecin() {
         return $this->id_medecin;
     }

     public function getNom() {
         return $this->nom;
     }

     public function getPrenom() {
         return $this->prenom;
     }

     public function getTel_Medecin() {
         return $this->tel_Medecin;
     }

     public function getAdresse_M() {
         return $this->adresse_M;
     }

     public function getPoste() {
         return $this->poste;
     }

     public function setId_medecin($id_medecin) {
         $this->id_medecin = $id_medecin;
     }

     public function setNom($nom) {
         $this->nom = $nom;
     }

     public function setPrenom($prenom) {
         $this->prenom = $prenom;
     }

     public function setTel_Medecin($tel_Medecin) {
         $this->tel_Medecin = $tel_Medecin;
     }

     public function setAdresse_M($adresse_M) {
         $this->adresse_M = $adresse_M;
     }

     public function setPoste($poste) {
         $this->poste = $poste;
     }
   public function loadFromRecord($ligne) {
        $this->id_medecin=$ligne["id_medecin"];
         $this->nom = $ligne["nom"];
         $this->prenom = $ligne["prenom"];
         $this->tel_Medecin = $ligne["tel_Medecin"];
         $this->adresse_M = $ligne["adresse_M"];
         $this->poste = $ligne["poste"];
      
    }
    
    
   
    
}
