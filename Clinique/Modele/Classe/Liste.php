<?php

class Liste{
    
    private $objet= array();
	private $current = -1;

	public function __construct()	//Constructeur
	{
		$this->objet = array();
	}
       
	
	public function add($id_ut)
	{
			array_push($this->objet,$id_ut);
	}
	
	public function previous()
	{
		if ($this->current>0)
		{
			$this->current--;
			return true;
		}
		return false;
	}
	public function next()
	{
		if ($this->current<count($this->objet)-1) 
		{
			$this->current++;
			return true;
		}
		return false;
	}
        public function setCurrent($current) {
            $this->current = $current;
        }

                
	public function printCurrent()
	{
			if (isset($this->objet[$this->current]))
				echo $this->objet[$this->current];
	}
        public function getObjet()
	{
			if (isset($this->objet[$this->current]))
				return $this->objet[$this->current];
	}
         public function getQCurrent()
	{
			if (isset($this->objet[$this->current]))
				return $this->objet[$this->current];
	}
            public function getTableau()
	{
			
				return $this->objet;
	}
        
        public function getQc($nb)
	{
			
				return $this->objet;
	}
        public function size()
	{		
	     return count($this->objet);
	}
    
}
?>
