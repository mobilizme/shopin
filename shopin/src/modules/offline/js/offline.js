/**
 * Offline mode
 */
function saveData(dataToSave){
	// Check browser support
	if (typeof(Storage) != "undefined") {
	    // Store
		for(key in dataToSave){
	    	localStorage.setItem(key, dataToSave[key]);
		}
	} else {
	    displayError("Sorry, your phone does not support local Storage...");
	}
}

function loadData(){
	// Check browser support
	if (typeof(Storage) != "undefined") {
		if(localStorage.getItem("connected") == 'true'){ //l'user est déja connecté
			document.getElementById("login").value = localStorage.getItem("login");
			document.getElementById("pwd").value = localStorage.getItem("pwd");
			//CheckUserExists();
			//loadData();

			loadUserInfos();

			
			hideConnection();
		}else{
			displayConnection();
		}
	}else {
	    displayError("Sorry, your phone does not support local Storage...");
	}
}