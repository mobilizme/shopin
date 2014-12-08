function logout(){
	if(localStorage.getItem("connected")){
		localStorage.clear();
		localStorage.setItem("email", "");
		localStorage.setItem("pwd", "");
		localStorage.setItem("user_id", "");
		localStorage.setItem("connected", "false");

		localStorage.setItem("username", "");
		localStorage.setItem("userlastname", "");
		localStorage.setItem("userfirstname", "");
		localStorage.setItem("useraddress", "");
		localStorage.setItem("newsletter", "0");


	    localStorage.setItem("usercp",""); 
	    localStorage.setItem("userville",""); 
	    localStorage.setItem("birthDate","");    
	    localStorage.setItem("usermobilephone","");
	    localStorage.setItem("userphone","");



		window.location.href='index.html';
		//loadData();
		//loadUserInfos();
	}//else -> already logged out
}