/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready( function() {
//$("#spm").click(function() {
//  //  window.location.reload();
//});
        
            

$("#myForm").submit(function () {
    var valide="";
     //  alert("entree");
           $val=$(this).find("input[name=telephone]").val();
           if(!(/^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/.test($val))){
              alert("Format TEL ex:514-000-0000");
              return false;
          }
                    $.post("JavaScript/admin/valideRecherche.php",{telephone:$val},function(data){
                        valide=data;   
//                        alert("entree valide = "+data);
//                        alert("entree valide = "+valide.length);
//                        alert("valideof ="+valide.indexOf("ok"));
                     if(valide.length>10){
                         $("#myForm2").html(valide);
                           //  alert("yse");
                            //return false;
                        }else{
                            $("#myForm2").html("");
                            $("#formAjouterP").html( "*:Champs obligatoires</br>\
                             <table> \
                             <tr><td><label class=\"\">*Nom :</label></td><td><input type=\"text\" name=\"nomp\"></td></tr>\
                             <tr><td><label class=\"\">*prenom :</label></td><td><input type=\"text\" name=\"prenomp\"></td></tr>\
                             <tr><td><label class=\"\">Date de naissance :</label></td><td><input type=\"text\" name=\"daten\"></td></tr>\
                             <tr><td><label class=\"\">*Carte maladie:</label></td><td><input type=\"text\" name=\"cam\"></td></tr>\
                             <tr><td><label class=\"\">Adresse :</label></td><td><input type=\"text\" name=\"adressep\"></td></tr>\
                             <tr><td><label class=\"\">Email :</label></td><td><input type=\"text\" name=\"emailp\"></td></tr>\
                             <tr><td><label class=\"\">*Tel-D :</label></td><td><input type=\"text\" name=\"tel_d\"></td>\
                              </tr>\
                             <tr><td><label class=\"\">Tel-C :</label></td><td><input type=\"text\" name=\"tel_c\"></td></tr>\
                             <tr><td><button type=\"submit\" id=\"sbm\" class='' name=\"opener\" title=\"ajouter\"> Ajouter</button></td></tr>\
                              </table>");
                            // alert("no");
                             //return true;  
                        }
                    });
                    
            return false;         
                    
          // ne change pas de pagereturn false;  
  });
  $("#formAjouterP").submit(function () {   
      // alert("myform2");
 
           $cam=$(this).find("input[name=cam]").val();
           $nom=$(this).find("input[name=nomp]").val();
           $pre=$(this).find("input[name=prenomp]").val();
           $ad=$(this).find("input[name=adressep]").val();
           $date=$(this).find("input[name=daten]").val();
           $tel_d=$(this).find("input[name=tel_d]").val();
           $tel_c=$(this).find("input[name=tel_c]").val();
           $em=$(this).find("input[name=emailp]").val();
          if($cam==""||$nom==""||$pre==""||$tel_d=="") {
              alert("*:Champs obligatoires");
              return false;
          }
          if(!(/^[a-z-A-Z]{4}\ [0-9]{4}\ [0-9]{4}$/.test($cam))){
              alert("Format de la carte assurance maladie ex:aaaa 0000 0000");
              $(".erreur").text("Format de la carte assurance maladie ex:aaaa 0000 0000");
              return false;
          }
           if(!(/^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/.test($tel_d))){
              alert("Format TEL ex:514-000-0000");
              return false;
          }
      
           
         // alert("med"+$med+"\npat"+ajt_dailogue+"\ndate"+$date+"\nhe"+val);
                    $.post("JavaScript/admin/vldPatient.php",{cam:$cam,nom:$nom,pre:$pre,ad:$ad,date:$date,tel_d:$tel_d,tel_c:$tel_d,em:$em},function(data){
                         
                       // alert("entree valide = "+data+"valideof ="+data.indexOf("1"));
                        
                     if(data.indexOf("1")!=-1){
                         
                            // alert("no");
                            $med = $(".heurs").find("input[name=medecin]").val();
                                    // $pat=$(this).find("button[name=ajt_dailogue]").val();
                             $date1 = $(".heurs").find("input[name=date]").val();
                                    // alert("med"+$med+"\npat"+$cam+"\ndate"+$date1+"\nhe"+val);
                                    $.post("JavaScript/admin/vldRendez_vous.php", {med: $med, heur: val, pat: $cam, date: $date1}, function(data) {
                                                                    
                                        window.location.reload();
                                        return true;
                                       });
                        }else{
                            
                             
                        }
                             //window.location.reload();
                        
                    });
                    
            return false;         
                    
          // ne change pas de pagereturn false;  
  });
  
  $("#myForm2").submit(function () {   
      // alert("myform2");
           $med=$(".heurs").find("input[name=medecin]").val();
          // $pat=$(this).find("button[name=ajt_dailogue]").val();
           $date=$(".heurs").find("input[name=date]").val(); 
         // alert("med"+$med+"\npat"+ajt_dailogue+"\ndate"+$date+"\nhe"+val);
                    $.post("JavaScript/admin/vldRendez_vous.php",{med:$med,heur:val,pat:ajt_dailogue,date:$date},function(data){
                        $valide=data;   
                        //alert("entree valide = "+data);
                      //  alert("entree valide = "+valide.length);
//                        alert("valideof ="+valide.indexOf("ok"));
//                     if(valide.indexOf("ok")==-1){
//                             alert("no");
//                            //return false;
//                        }else{
//                             $(".test").text("Hello world!");
//                             alert("yes");
//                             //return true;  
//                        }
                             window.location.reload();
                        return true;
                    });
                    
            return false;         
                    
          // ne change pas de pagereturn false;  
  });
  $("#M_up").submit(function () {
      
     
    var valide="";
       //alert("entree");
           $val=$(this).find("input[name=Modifier]").val();
           $nom=$(this).find("input[name=nom]").val();
           $pre=$(this).find("input[name=prenom]").val();
           $ad=$(this).find("input[name=adresse]").val();
           $po=$(this).find("input[name=poste]").val();
           $tel=$(this).find("input[name=tel]").val();
                    $.post("JavaScript/admin/vldMedecin.php",{Modifier:$val,nom:$nom,prenom:$pre,adresse:$ad,tel:$tel,poste:$po},function(data){
                        valide=data;   
                       // alert("entree valide = "+data);
                       // alert("lenguer = "+valide.length);
                        
                     if(valide.length<5){
                         
                             alert(" la Modification est réussit");
                              window.location.reload();
                           // return true;
                        }else{
                            
                             alert(valide);
                            return false;  
                        }
                    });
                    
       //alert("fals");    
      return false;         
                    
          // ne change pas de pagereturn false;  
  });
   $("#M_cree").submit(function () {
      
     
    var valide="";
       
           $val=$(this).find("button[name=ajouter]").val();
           alert($val);
           $nom=$(this).find("input[name=nom]").val();
           $pre=$(this).find("input[name=prenom]").val();
           $ad=$(this).find("input[name=adresse]").val();
           $po=$(this).find("input[name=poste]").val();
           $tel=$(this).find("input[name=tel]").val();
           //alert($val+","+$nom+","+$pre+","+$ad+","+$tel);
                    $.post("JavaScript/admin/vldMedecin.php",{ajouter:$val,nom:$nom,prenom:$pre,adresse:$ad,tel:$tel,poste:$po},function(data){
                        valide=data;   
                       // alert("entree valide = "+data);
                        //alert("lenguer = "+valide.length);
                        
                     if(valide.length<5){
                         
                             alert(" la Modification est réussit");
                              window.location.reload();
                            //return true;
                        }else{
                            
                             alert(valide);
                            return false;  
                        }
                    });
                    
       //alert("fals");    
      return false;         
                    
          // ne change pas de pagereturn false;  
  });
  
  
  $("#EMP_up").submit(function () {
      
     
    var valide="";
      // alert("entree");
           $val=$(this).find("input[name=Modifier]").val();
           $nom=$(this).find("input[name=nom]").val();
           $pre=$(this).find("input[name=prenom]").val();
           $ad=$(this).find("input[name=adresse]").val();
           $po=$(this).find("input[name=poste]").val();
           $tel_d=$(this).find("input[name=tel_d]").val();
           $tel_c=$(this).find("input[name=tel_c]").val();
           $mdp=$(this).find("input[name=mdp]").val();
           $user=$(this).find("input[name=user]").val();
           //alert($val+","+$nom+","+$pre+","+$ad+","+$tel);
                    $.post("JavaScript/admin/vldEmployes.php",{Modifier:$val,nom:$nom,prenom:$pre,adresse:$ad,tel_d:$tel_d,tel_c:$tel_c,user:$user,mdp:$mdp,poste:$po},function(data){
                        valide=data;   
                        //alert("entree valide = "+data+" leng ="+valide.length);
                                            
                     if(valide.length<8){
                         
                             alert(" la Modification est réussit");
                              window.location.reload();
                            return true;
                        }else{
                            
                             alert(valide);
                            return false;  
                        }
                    });
                    
      //alert("fals");    
      return false;         
                    
          // ne change pas de pagereturn false;  
  });
   $("#EMP_cree").submit(function () {
      
     
    var valide="";
       //alert("entree");
           $val=$(this).find("button[name=ajouter]").val();
           $nom=$(this).find("input[name=nom]").val();
           $pre=$(this).find("input[name=prenom]").val();
           $ad=$(this).find("input[name=adresse]").val();
           $po=$(this).find("input[name=poste]").val();
           $tel_d=$(this).find("input[name=tel_d]").val();
           $tel_c=$(this).find("input[name=tel_c]").val();

                    $.post("JavaScript/admin/vldEmployes.php",{ajouter:$val,nom:$nom,prenom:$pre,adresse:$ad,tel_d:$tel_d,tel_c:$tel_c,poste:$po},function(data){
                        valide=data;   
                       // alert("entree valide = "+data+" leng ="+valide.length);                                            
                     if(valide.length<8){                         
                             alert(" la Modification est réussit");
                              window.location.reload();
                            //return true;
                        }else{
                            
                             alert(valide);
                            return false;  
                        }
                    });
                    
     // alert("fals");    
      return false;           
                    
          // ne change pas de pagereturn false;  
  });
//  $("#E_up").submit(function () {
//      
//     
//    var valide="";
//       alert("entree");
//           $val=$(this).find("input[name=Modifier]").val();
//           $tr=$(this).find("input[name=titre]").val();
////           $date=$(this).find("input[name=date]").val();
////           $ch=$(this).find("input[name=chemin]").val();
//           $af=$(this).find("input[name=afficher]").val();
//                    $.post("JavaScript/admin/vldOffres.php",{Modifier:$val,tr:$tr,af:$af},function(data){
//                        valide=data;   
//                        alert("entree valide = "+data);
//                       // alert("lenguer = "+valide.length);
//                        
//                     if(valide.length<5){
//                         
//                             alert(" la Modification est réussit");
//                              window.location.reload();
//                            return true;
//                        }else{
//                            
//                             alert(valide);
//                            return false;  
//                        }
//                    });
//                    
//       alert("fals");    
//      return false;         
//                    
//          // ne change pas de pagereturn false;  
//  });
//   $("#E_cree").submit(function () {
//      
//     
//    var valide="";
//       
//          
//          $tr=$(this).find("input[name=titre]").val();
//          $monfichier=$(this).find("input[name=monfichier]").val();
////          $ch=$(this).find("input[name=chemin]").val();
//           $af=$(this).find("select[name=afficher]").val();
//           alert($tr+","+$af);
//                     $.post("JavaScript/admin/vldOffres.php",{ajouter:'',tr:$tr,af:$af,monfichier:$monfichier},function(data){
//                        valide=data;   
//                        alert("entree valide = "+data);
//                        //alert("lenguer = "+valide.length);
//                        
//                     if(valide.length<5){
//                         
//                             alert(" la Modification est réussit");
//                             window.location.reload();
//                            
//                            return true;
//                        }else{
//                            
//                             alert(valide);
//                            return false;  
//                        }
//                    });
//                    
//      // alert("fals");    
//      return false;         
//                    
//          // ne change pas de pagereturn false;  
//  });
  
  
  
});