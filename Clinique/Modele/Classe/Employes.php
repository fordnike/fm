<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Employes{
    private $id_emp;
     private $nom_emp;
     private $prenom_emp;
     private $tel_emp;
     private $cel_emp;
     private $adresse_emp;
     private $poste_emp;
     private $user;
     private $mdp;
     private $role=2;
         function __construct($nom_emp="", $prenom_emp="", $tel_emp="", $cel_emp="", $adresse_emp="", $poste_emp="") {
         $this->nom_emp = $nom_emp;
         $this->prenom_emp = $prenom_emp;
         $this->tel_emp = $tel_emp;
         $this->cel_emp = $cel_emp;
         $this->adresse_emp = $adresse_emp;
         $this->poste_emp = $poste_emp;
         
     }
     public function getRole() {
         return $this->role;
     }

     public function setRole($role) {
         $this->role = $role;
     }

          public function getId_emp() {
         return $this->id_emp;
     }
     public function getUser() {
         return $this->user;
     }

     public function getMdp() {
         return $this->mdp;
     }

     public function setUser($user) {
         $this->user = $user;
     }

     public function setMdp($mdp) {
         $this->mdp = $mdp;
     }

          public function getNom_emp() {
         return $this->nom_emp;
     }

     public function getPrenom_emp() {
         return $this->prenom_emp;
     }

     public function getTel_emp() {
         return $this->tel_emp;
     }

     public function getCel_emp() {
         return $this->cel_emp;
     }

     public function getAdresse_emp() {
         return $this->adresse_emp;
     }

     public function getPoste_emp() {
         return $this->poste_emp;
     }

     public function setId_emp($id_emp) {
         $this->id_emp = $id_emp;
     }

     public function setNom_emp($nom_emp) {
         $this->nom_emp = $nom_emp;
     }

     public function setPrenom_emp($prenom_emp) {
         $this->prenom_emp = $prenom_emp;
     }

     public function setTel_emp($tel_emp) {
         $this->tel_emp = $tel_emp;
     }

     public function setCel_emp($cel_emp) {
         $this->cel_emp = $cel_emp;
     }

     public function setAdresse_emp($adresse_emp) {
         $this->adresse_emp = $adresse_emp;
     }

     public function setPoste_emp($poste_emp) {
         $this->poste_emp = $poste_emp;
     }

     
     public function loadFromRecord($ligne) {
        $this->id_emp=$ligne["id_emp"];
        $this->nom_emp = $ligne["nom_emp"];
        $this->prenom_emp = $ligne["prenom_emp"];
        $this->tel_emp = $ligne["tel_emp"];
        $this->cel_emp = $ligne["cel_emp"];
        $this->adresse_emp = $ligne["adresse_emp"];
        $this->poste_emp = $ligne["poste_emp"];
        $this->user = $ligne["user"];
        $this->mdp = $ligne["mdp"];
        $this->role = $ligne["role"];
    }

    
    
}

?>

