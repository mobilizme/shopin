function loadUserInfos(){
    //$("#editer-profil #username").val(localStorage.getItem("username"));
    $("#editer-profil #champ-email").val(localStorage.getItem("email"));
    $("#editer-profil #pwd").val(localStorage.getItem("pwd"));
    $("#editer-profil #Nom").val(localStorage.getItem("userlastname"));
    $("#editer-profil #Prenom").val(localStorage.getItem("userfirstname"));
    $("#editer-profil #Adresse").val(localStorage.getItem("useraddress"));
    $("#editer-profil #champ-cp").val(localStorage.getItem("usercp")); 
    $("#editer-profil #champ-ville").val(localStorage.getItem("userville"));   
    $("#editer-profil #telMobile").val(localStorage.getItem("usermobilephone"));
    $("#editer-profil #telFixe").val(localStorage.getItem("userphone"));

    if(localStorage.getItem("birthDate") != ""){
        $("#editer-profil #birth").val(localStorage.getItem("birthDate"));
    }
  

    if(localStorage.getItem("newsletter") == 1){
        $('#editer-profil #abonnementNewsletter').attr('checked', true);
    }else{
        $('#editer-profil #abonnementNewsletter').attr('checked', false);
    }
}

function saveUserInfos(){

    localStorage.setItem("email",$("#editer-profil #champ-email").val());
    localStorage.setItem("pwd",$("#editer-profil #pwd").val());
    localStorage.setItem("userlastname",$("#editer-profil #Nom").val());
    localStorage.setItem("userfirstname",$("#editer-profil #Prenom").val());
    localStorage.setItem("useraddress",$("#editer-profil #Adresse").val());
    localStorage.setItem("usercp",$("#editer-profil #champ-cp").val()); 
    localStorage.setItem("userville",$("#editer-profil #champ-ville").val());    
    localStorage.setItem("usermobilephone",$("#editer-profil #telMobile").val());
    localStorage.setItem("userphone",$("#editer-profil #telFixe").val());

    var date = $("#editer-profil #birth").val();
    var newdate = date.split("/").reverse().join("-");
    localStorage.setItem("birthDate", newdate); 

    localStorage.setItem("newsletter", "0");
    if($("#editer-profil #abonnementNewsletter").is(':checked')){
        localStorage.setItem("newsletter", "1");
    }
    loadUserInfos();

    UpdateUserInfosInDB();
}

function UpdateUserInfosInDB(){

    var username = localStorage.getItem("username") != null ? localStorage.getItem("username") : "";
    var email = localStorage.getItem("email")!= null ? localStorage.getItem("email") : "";
    var pwd = localStorage.getItem("pwd")!= null ? localStorage.getItem("pwd") : "";
    var lastname = localStorage.getItem("userlastname")!= null ? localStorage.getItem("userlastname") : "";
    var firstname = localStorage.getItem("userfirstname")!= null ? localStorage.getItem("userfirstname") : "";
    var address = localStorage.getItem("useraddress")!= null ? localStorage.getItem("useraddress") : "";
    var phone = localStorage.getItem("usermobilephone")!= null ? localStorage.getItem("usermobilephone") : "";
    var id = localStorage.getItem("user_id")!= null ? localStorage.getItem("user_id") : "";
    var newsletter = localStorage.getItem("newsletter")!= null ? localStorage.getItem("newsletter") : "";

    var birth = localStorage.getItem("birthDate")!= null ? localStorage.getItem("birthDate") : "";
    var cp = localStorage.getItem("usercp")!= null ? localStorage.getItem("usercp") : "";
    var ville = localStorage.getItem("userville")!= null ? localStorage.getItem("userville") : "";
    var phonefixe = localStorage.getItem("userphone")!= null ? localStorage.getItem("userphone") : "";

    $.ajax({
    url: "http://mobile.antibes-juanlespins-commerces.com/updateUserInfos.php?id="+id+"&username="+username+"&login="+email+"&pwd="+pwd+"&lastname="+lastname+"&firstname="+firstname+"&address="+address+"&phone="+phone+"&newsletter="+newsletter+"&birth="+birth+"&cp="+cp+"&ville="+ville+"&phonefixe="+phonefixe,
    dataType: "xml",
    complete : function(data){
        var list = data.responseXML;    
        var success = $(list).find('success').text();
        if(success){
            //msg success 
        }else{
            //msg error
        }
    }});

}

function DeleteUserAccount(){
    if (confirm('Etes-vous sûr de vouloir supprimer votre comtpe ?')) {
        DeleteUserAccountFromDB();
    }
}


function DeleteUserAccountFromDB(){
    var id = localStorage.getItem("user_id");
    $.ajax({
    url: "http://mobile.antibes-juanlespins-commerces.com/DisableUserAccount.php?id="+id,
    dataType: "xml",
    complete : function(data){
        var list = data.responseXML;    
        var success = $(list).find('success').text();
        if(success == "true"){
            logout();
        }else{
            //msg error
        }
    }});
}