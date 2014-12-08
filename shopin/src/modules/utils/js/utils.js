function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function displayMenuConnected(){		
	if(localStorage.getItem("connected") != "true"){
		document.getElementById('menu-profil').style.display = "none";
		document.getElementById('menu-editer').style.display = "none";
	}else{			
		document.getElementById('userNames').innerHTML = localStorage.getItem("userfirstname")+" "+localStorage.getItem("userlastname");
		document.getElementById('menu-connexion').style.display = "none";
	}
}