function CheckUserExists(){
	var login = document.getElementById("login").value;
	var pwd = document.getElementById("pwd").value;

	//checker en bd (server side)

	serverSide_CheckUserExists(login, pwd);
}

function serverSide_CheckUserExists(login, pwd){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/checkUserExists.php?login="+login+"&pwd="+pwd,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;
		var exist = $(list).find('exist').text();
		var user_id = $(list).find('user_id').text();


		var username = $(list).find('username').text();
		var lastname = $(list).find('lastname').text();
		var firstname = $(list).find('firstname').text();
		var address = $(list).find('address').text();
		var phone = $(list).find('phone').text();
		var newsletter = $(list).find('newsletter').text();	

		var birthday = $(list).find('birthday').text();	
		var picture = $(list).find('picture').text();	

		if(exist == "true"){

			//Saving user's info
			var infos = new Array();
			infos['email'] = login;
			infos['pwd'] = pwd;
			infos['connected'] = "true";
			infos['user_id'] = user_id;
			infos['username'] = username;
			infos['userlastname'] = lastname;
			infos['userfirstname'] = firstname;
			infos['useraddress'] = address;
			infos['userphone'] = phone;
			infos['newsletter'] = newsletter;
			infos['birthDate'] = birthday;
			infos['picture'] = picture;
			infos['birthDate'] = birthday.split("-").reverse().join("/");
			
			//SAVING FAVORITES -> modifier userExists pour qu'il retourne les favorit de l'user

			saveData(infos);

			//hideConnection();
			window.location.href='index.html';
		}else if(exist == "disabled"){ //user account has been disabled
			alert("Votre de compte a été désactivé.");
		}else{
			alert("Login ou mot de passe incorrect");
		}
	}});
}