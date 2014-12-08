/**
 * Module inscription
 */
function registration(){
    var email = document.getElementsByName("mail")[0].value;

    //TODO : verifier que l'email est bien un email!
    if(email == "" || email == null){
        alert("Veuillez rentrer un email svp.");
    }else{
        serverSide_CheckEmailExists(email);
    }
}

function serverSide_CheckEmailExists(newEmail){
    $.ajax({
    url: "http://mobile.antibes-juanlespins-commerces.com/checkEmailExists.php?email="+newEmail,
    dataType: "xml",
    complete : function(data){
        var list = data.responseXML;
        exist = $(list).find('exist').text();
        if(exist == "false"){
            //L'user n'existe pas -> on peu le créer
            var infos = new Array();
            infos['email'] = newEmail;
            infos['pwd'] = document.getElementsByName("password")[0].value;
            infos['userlastname'] = document.getElementsByName("Nom")[0].value;
            infos['userfirstname'] = document.getElementsByName("Prenom")[0].value;
            infos['useraddress'] = document.getElementsByName("Adresse")[0].value;
            infos['cp'] = document.getElementsByName("cp")[0].value;
            infos['champ-ville'] = document.getElementsByName("ville")[0].value;

            if($('#abonnementNewsletter').is(':checked')){
                infos['newsletter'] = '1';
            }else{
                infos['newsletter'] = '0';
            }

            /*var pwd = "Antibes06"
            infos['pwd'] = pwd;*/
            infos['connected'] = "true";

            serverSide_SaveNewUser(newEmail, infos['pwd']);

            //saving user infos
            saveData(infos);
        }else{
            alert("Cet email existe déja.");
        }
    }});
}

function serverSide_SaveNewUser(email, password){
    $.ajax({
    url: "http://mobile.antibes-juanlespins-commerces.com/SaveNewUser.php?email="+email+"&pwd="+password,
    dataType: "xml",
    complete : function(data){
        var list = data.responseXML;
        var user_id = $(list).find('user_id').text();
        if(user_id != "false"){
            var infos = new Array();
            infos['user_id'] = user_id;

            saveData(infos); 
            //user saved & connected

            UpdateUserInfosInDB();
            //hideConnection();
        }else{
            alert("Un probleme est survenu lors de votre enregistrement.");
        }
    }});
}