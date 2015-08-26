<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *CREATION DES ANNONCES D'OFFRES D'EMPLOI
 *
 * @author User
 */
class Annonce {
    //put your code here
    private $id_annonce;
    private $titre;
    private $chemin;
    private $date_annonce;
    private $afficher;
  
    function __construct($titre="", $chemin="",$afficher="") {
        $this->titre = $titre;
        $this->chemin = $chemin;
        $this->afficher=$afficher;
    }
    public function loadFromRecord($ligne) {
        $this->id_annonce=$ligne["id_annonce"];
        $this->titre = $ligne["titre"];
        $this->chemin = $ligne["chemin"];
        $this->date_annonce = $ligne["date_annonce"];
        $this->afficher = $ligne["afficher"];
       
    }
    /**
 *
 *
 * RETOURNE TRUE OU FALSE
 */
    public function getAfficher() {
        return $this->afficher;
    }
/**
 *
 *
 * @param type $BOULEAN Description :TRUE SI L'ANNONCE S'AFFICHE OU FALSE SI SE N'AFFICHE PAS .  
 */
    public function setAfficher($afficher) {
        $this->afficher = $afficher;
    }

   public function getId_annonce() {
        return $this->id_annonce;
    }

    public function getTitre() {
        return $this->titre;
    }

    public function getChemin() {
        return $this->chemin;
    }

    public function getDate_annonce() {
        return $this->date_annonce;
    }

    public function setId_annonce($id_annonce) {
        $this->id_annonce = $id_annonce;
    }
/**
 *
 *
 * @param type $TEXTE Description : FOURNIR UN TITRE A L'ANNONCE D'OFFRES D'EMPLOI.
 */
    public function setTitre($titre) {
        $this->titre = $titre;
    }

    public function setChemin($chemin) {
        $this->chemin = $chemin;
    }

    public function setDate_annonce($date_annonce) {
        $this->date_annonce = $date_annonce;
    }



}
