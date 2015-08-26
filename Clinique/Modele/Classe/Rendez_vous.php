<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Rendez_vous
 *
 * @author User
 */
class Rendez_vous {
    //put your code here
    
    
    private $pat="";
     private $med="";
     private $date="";
     private $heures="";
     function __construct($pat, $med, $date, $heures) {
         $this->pat = $pat;
         $this->med = $med;
         $this->date = $date;
         $this->heures = $heures;
     }
      public function loadFromRecord($ligne) {
        $this->pat = $ligne["$pat"];
         $this->med = $ligne["$med"];
         $this->date =$ligne["$date"];
         $this->heures =$ligne["$heures"];  
         
    }

     public function getPat() {
         return $this->pat;
     }

     public function getMed() {
         return $this->med;
     }

     public function getDate() {
         return $this->date;
     }

     public function getHeures() {
         return $this->heures;
     }

     public function setPat($pat) {
         $this->pat = $pat;
     }

     public function setMed($med) {
         $this->med = $med;
     }

     public function setDate($date) {
         $this->date = $date;
     }

     public function setHeures($heures) {
         $this->heures = $heures;
     }


}
