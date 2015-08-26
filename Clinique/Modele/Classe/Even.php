<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Even {
    //put your code here
    private $id_even;  
    private $chemin_even;
    private $text_even;
  
    function __construct($text_even="") {
        //$this->chemin_even = $chemin_even;
        $this->text_even = $text_even;
    }

    public function loadFromRecord($ligne) {
        $this->id_even=$ligne["id_even"];
        $this->text_even = $ligne["text_even"];
        $this->chemin_even = $ligne["chemin_even"];
       
       
    }
    public function getId_even() {
        return $this->id_even;
    }

    public function getChemin_even() {
        return $this->chemin_even;
    }

    public function getText_even() {
        return $this->text_even;
    }

    public function setId_even($id_even) {
        $this->id_even = $id_even;
    }

    public function setChemin_even($chemin_even) {
        $this->chemin_even = $chemin_even;
    }

    public function setText_even($text_even) {
        $this->text_even = $text_even;
    }



}

?>