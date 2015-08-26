/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function() {
     if($(document).width()<1500){
         //alert($(document).width());
         $(".droit_h").css({"font-size":"50%"});
        
         
     }

     $("#1p").hide();
     $("#2p").hide();
     $("#3p").hide();
     $("#4p").hide();
     $("#5p").hide();
     $("#6p").hide();
     $("#7p").hide();
     $("#8p").hide();
     $("#9p").hide();
    $("#1").click(function(){
          $("#1p").toggle("slow"); 
      });
     $("#2").click(function(){
          $("#2p").toggle("slow");
      });
     $("#3").click(function(){
         $("#3p").toggle("slow");
      });
     $("#4").click(function(){
            $("#4p").toggle("slow");
      });
      $("#5").click(function(){
            $("#5p").toggle("slow");
      });
       $("#6").click(function(){
            $("#6p").toggle("slow");
      });
       $("#7").click(function(){
            $("#7p").toggle("slow");
      });
       $("#8").click(function(){
            $("#8p").toggle("slow");
      });
       $("#9").click(function(){
            $("#9p").toggle("slow");
      });
      
     $("#1fp").hide();
     $("#2fp").hide();
      $("#3fp").hide();
     $("#4fp").hide();
      $("#5fp").hide();
     $("#6fp").hide();
      $("#7fp").hide();
     $("#8fp").hide();
    
    $("#1f").click(function(){
          $("#1fp").toggle("slow"); 
      });
     $("#2f").click(function(){
          $("#2fp").toggle("slow");
      });
     $("#3f").click(function(){
          $("#3fp").toggle("slow"); 
      });
     $("#4f").click(function(){
          $("#4fp").toggle("slow");
      });
     $("#5f").click(function(){
          $("#5fp").toggle("slow"); 
      });
     $("#6f").click(function(){
        $("#6fp").toggle("slow");
      });
     $("#7f").click(function(){
          $("#7fp").toggle("slow"); 
      });
     $("#8f").click(function(){
          $("#8fp").toggle("slow");
      });
         
        
     
});
