/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){ 
   
    
    
    $( ".datepicker" ).change(function() {
  // alert("ooo");
// window.location.reload();
   $( "#Formdate" ).submit();
  });
  $( "input" ).click(function() {
 //alert("ooo");
     // window.location.reload();
   val_input_sel=$(this).val();
  });
   
     $( "select" ).change(function() {
   // var str = "";
    $( "select option:selected" ).each(function() {
      slt_medecin=$(this).text();
      var_slt_medecin =$(this).val();
     $(location).attr('href', '?action=rendez_vous&medecin='+var_slt_medecin+'&nMedecin='+slt_medecin+'&date='+document.getElementsByClassName("datepicker")[0].value);
    });
   
  });
  
 
  $(".opener").click(function(){
      
    $(".ht").html("<h3>C&#233;dule :"+document.getElementsByName("nMedecin")[0].value+"   Heure:"+val+
            "   </h3><h3>Date :"+document.getElementsByClassName("datepicker")[0].value)+"</h3>";
    
  });
  
   $("#img800").click(function(){
      //alert('vai'+val);
    $(this).attr('src','images/ajt2.png');  
    
  });
  
});
$(function() {  
    $( "#dialog" ).dialog({
      autoOpen: false,
	  modal:true,
          width:700,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "drop",
        duration: 1000
      }
     
    });
 
    $( ".opener" ).click(function() {
        // alert($("input").val());
        
       if((document.getElementsByClassName("datepicker")[0].value).length>4&&val_input_sel==""){
      $("#formAjouterP").html("");
        $( "#dialog" ).dialog( "open" );
       
       }else{
        if((document.getElementsByClassName("datepicker")[0].value).length<=4){
              alert("il faut saisir une date");
        }
      
    }
     
    });
     $( ".imgAjt" ).click(function() {
          $(".ht").html("<h3>Cidule:"+document.getElementsByName("nMedecin")[0].value+"   Heure:"+val+
            "   </h3><h3>Date :"+document.getElementsByClassName("datepicker")[0].value)+"</h3>";
    
    
        // alert($("input").val());
        
       //if((document.getElementsByClassName("datepicker")[0].value).length>4&&val_input_sel==""){
     // $("#formAjouterP").html("");
        $( "#dialog" ).dialog( "open" );
       
       //}else{
      //  if((document.getElementsByClassName("datepicker")[0].value).length<=4){
            //  alert("il faut saisir une date");
      //  }
      
  //  }
     
    });
    
    
   
    
  });
 
