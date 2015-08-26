<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->


        <?php 
       

           

try {
    if (isset($_REQUEST["utilisateur"])) {
        $dao = new Employes_DAO();
        //on retourne le nombre de role du benevole s il est connecté sinon elle retourne false
       // echo '' . $_REQUEST["utilisateur"] . $_REQUEST["motPasse"];
        $roles = $dao->login($_REQUEST["utilisateur"], $_REQUEST["motPasse"]);
       // echo 'role' . $roles;
        if ($roles) {
            $_SESSION ["connecter"] = $roles;
            header('Location:Connexion.php');
        } else {
            echo "<p style='color:red'>Le nom d'utilisateur ou le mot de passe saisi est incorrect. ?</p> ";
        }
    }
} catch (Exception $exc) {
    echo "<p style='color:red'>echec ! .contactez l'adminstrateur du site :" . $exc->getTraceAsString() . "</p>";
}
?>
<div class="menuLogin" align=center>
    <form id="" method="post" action="#" >
        <div id="login-box">

            <H2>Login</H2>
               
            <br />
            <br />
            <div id="login-box-name" style="margin-top:20px;">Email:</div><div id="login-box-field" style="margin-top:20px;"><input name="utilisateur" class="form-login" value="" size="30" maxlength="2048" /></div>
            <div id="login-box-name">Password:</div><div id="login-box-field"><input name="motPasse" type="password" class="form-login"  value="" size="30" maxlength="2048" /></div>
            <br />
           
            <br />
            <br />
           
            <button type="submit" id="submit" class="submit"  ></button>

        </div>

    </form >
  <div>
