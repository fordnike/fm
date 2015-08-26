<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Patient
 *
 * @author User
 */
class Patient {
    //put your code here
    
    private $nCarteMaladie;
    private $nomPatient;
    private $prenomPatient;
    private $telDomicilePatient;
    private $cellulairePatient;
    private $adressePatient;
    private $dateNaissancePatient;
    private $emailPatient;
    
    function __construct($nCarteMaladie="", $nomPatient="", $prenomPatient="", $telDomicilePatient="", $cellulairePatient="", $adressePatient="", $dateNaissancePatient="", $emailPatient="") {
        $this->nCarteMaladie = $nCarteMaladie;
        $this->nomPatient = $nomPatient;
        $this->prenomPatient = $prenomPatient;
        $this->telDomicilePatient = $telDomicilePatient;
        $this->cellulairePatient = $cellulairePatient;
        $this->adressePatient = $adressePatient;
        $this->dateNaissancePatient = $dateNaissancePatient;
        $this->emailPatient = $emailPatient;
    }
    public function getNCarteMaladie() {
        return $this->nCarteMaladie;
    }

    public function getNomPatient() {
        return $this->nomPatient;
    }

    public function getPrenomPatient() {
        return $this->prenomPatient;
    }

    public function getTelDomicilePatient() {
        return $this->telDomicilePatient;
    }

    public function getCellulairePatient() {
        return $this->cellulairePatient;
    }

    public function getAdressePatient() {
        return $this->adressePatient;
    }

    public function getDateNaissancePatient() {
        return $this->dateNaissancePatient;
    }

    public function getEmailPatient() {
        return $this->emailPatient;
    }

    public function setNCarteMaladie($nCarteMaladie) {
        $this->nCarteMaladie = $nCarteMaladie;
    }

    public function setNomPatient($nomPatient) {
        $this->nomPatient = $nomPatient;
    }

    public function setPrenomPatient($prenomPatient) {
        $this->prenomPatient = $prenomPatient;
    }

    public function setTelDomicilePatient($telDomicilePatient) {
        $this->telDomicilePatient = $telDomicilePatient;
    }

    public function setCellulairePatient($cellulairePatient) {
        $this->cellulairePatient = $cellulairePatient;
    }

    public function setAdressePatient($adressePatient) {
        $this->adressePatient = $adressePatient;
    }

    public function setDateNaissancePatient($dateNaissancePatient) {
        $this->dateNaissancePatient = $dateNaissancePatient;
    }

    public function setEmailPatient($emailPatient) {
        $this->emailPatient = $emailPatient;
    }

 public function loadFromRecord($ligne) {
     
        $this->nCarteMaladie = $ligne["nCarteMaladie"];
        $this->nomPatient = $ligne["nomPatient"];
        $this->prenomPatient = $ligne["prenomPatient"];
        $this->telDomicilePatient =$ligne["telDomicilePatient"];
        $this->cellulairePatient = $ligne["cellulairePatient"];
        $this->adressePatient = $ligne["adressePatient"];
        $this->dateNaissancePatient = $ligne["dateNaissancePatient"];
        $this->emailPatient =$ligne["emailPatient"];
}
}