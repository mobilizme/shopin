function addRepertoryToFavorite(repertory_id){
	if(localStorage.getItem("connected") == 'true' && localStorage.getItem("user_id") != '') {
		var user_id = localStorage.getItem("user_id");
		$.ajax({
			url: "http://mobile.antibes-juanlespins-commerces.com/addRepertoryToFavorite.php?user_id=" + user_id + "&repertory_id=" + repertory_id,
			dataType: "xml",
			complete: function (data) {
				var list = data.responseXML;
				var isAdded = $(list).find('isAdded').text();

				if (isAdded == "true") {
					alert("Ajouté aux favoris");//notifier l'user que l'ajout à fonctionné
				} else {
					alert("false");
					//afficher une erreur
				}
			}
		});
	}else{
		alert("Vous n'etes pas connecté");
	}
}

function addBlogToFavorite(blog_id){
	if(localStorage.getItem("connected") == 'true') {
		var user_id = localStorage.getItem("user_id");
		//alert("http://mobile.antibes-juanlespins-commerces.com/addBlogToFavorite.php?user_id="+user_id+"&blog_id="+blog_id);
		$.ajax({
			url: "http://mobile.antibes-juanlespins-commerces.com/addBlogToFavorite.php?user_id=" + user_id + "&blog_id=" + blog_id,
			dataType: "xml",
			complete: function (data) {
				var list = data.responseXML;
				var isAdded = $(list).find('isAdded').text();

				if (isAdded == "true") {
					alert("Ajouté aux favoris");//notifier l'user que l'ajout à fonctionné
				} else {
					alert("false");
					//afficher une erreur
				}
			}
		});
	}else{
		alert("Vous n'etes pas connecté");
	}
}


function listRepertoriesFavorites(){
var user_id = localStorage.getItem("user_id");
$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getFavoriteList.php?user_id="+user_id,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;
		var error = $(list).find('error').text();

		if(error == "true"){
			alert("error : listFavorites");//notifier l'user que l'ajout n'a pas fonctionné
		}else{
//repertories display
			var appendHtml = "";			
			var locations = new Array();
			var i = 0;
			$(list).find('repertory').each(function(){
		        var id = $(this).find('id').text();
		        var name = $(this).find('name').text();
		        var address = $(this).find('address').text();
		        var postalcode = $(this).find('postalcode').text();
		        var town = $(this).find('town').text();
		        var latitude = $(this).find('latitude').text();
		        var longitude = $(this).find('longitude').text();
		        var phone = $(this).find('phone').text();
		        var email = $(this).find('email').text();
		        var website = $(this).find('website').text();
		        var contact = $(this).find('contact').text();
		        var description = $(this).find('description').text();


			   	locations[i] = new Array();
				locations[i][0] = name +"<br>"+address +"<br>"+phone +"<br>"+email +"<br>"+website +"<br>"+description +"<br>";
				locations[i][1] = latitude;
				locations[i][2] = longitude;
				i++;

		        appendHtml += "<div id="+id+" class=\"itemSearch\">";
				appendHtml += "<a href=\'location.href='magasin.html?boutiqueId="+id+"'\''><img src='' /></a>";
				appendHtml += "<div class=\"content\">";
				appendHtml += "<h4><a href='#' onclick=\"location.href='magasin.html?boutiqueId="+id+"'\">"+name+"</a></h4>";
				appendHtml += '<p>'+address+'</p>';

				appendHtml += '<a href="#"  onclick="location.href=\'magasin.html?boutiqueId='+id+'\'" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Consulter</a>';
				appendHtml += '<br/><a href="#"  onclick="deleteFavoriteRepertory('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Supprimer des favoris</a>';
				
				appendHtml += '</div></div>';
			});
		loadMapBoutiques(locations);
		$("#home #shop #right-column").append(appendHtml);
	}}});
}


function listBlogsFavorites(){
	var user_id = localStorage.getItem("user_id");
$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getFavoriteList.php?user_id="+user_id,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;
		var error = $(list).find('error').text();

		if(error == "true"){
			alert("error : listFavorites");//notifier l'user que l'ajout n'a pas fonctionné
		}else{
//repertories display
//Blogs display
			var appendHtml = "";	
			$(list).find('blog').each(function(){
		        var id = $(this).find('id').text();
		        var title = $(this).find('title').text();
		        var date = $(this).find('date').text();
		        var site = $(this).find('site').text();
		        var menu = $(this).find('menu').text();
		        var user = $(this).find('user').text();
		        var lang = $(this).find('lang').text();
		        var content = $(this).find('content').text();
		        var meta_title = $(this).find('meta_title').text();
		        var meta_description = $(this).find('meta_description').text();
		        var meta_keywords = $(this).find('meta_keywords').text();
		        var alias = $(this).find('alias').text();
		        var state = $(this).find('state').text();
		        var dateStart = $(this).find('dateStart').text();
		        var dateEnd = $(this).find('dateEnd').text();
		        /*appendHtml += "<tr>";
		          appendHtml += "<td>" + title + "</td>";
		          appendHtml += "<td>" + date + "</td>";
		          appendHtml += "<td>" + site + "</td>";
		          appendHtml += "<td>" + menu + "</td>";
		          appendHtml += "<td>" + user + "</td>";
		          appendHtml += "<td>" + lang + "</td>";
		          appendHtml += "<td>" + content + "</td>";
		          appendHtml += "<td>" + meta_title + "</td>";
		          appendHtml += "<td>" + meta_description + "</td>";
		          appendHtml += "<td>" + meta_keywords + "</td>";
		          appendHtml += "<td>" + alias + "</td>";
		          appendHtml += "<td>" + state + "</td>";
		          appendHtml += "<td onclick='deleteFavoriteBlog("+id+");'>delete</td>";
		        appendHtml += "</tr><hr>";*/


			appendHtml += '<div id='+id+' class="itemBonplan" style="background-image:url(images/bananabread.jpg);"><div class="content">';		
			appendHtml += '<h3>'+title+'</h3>'
								//<p class="categories">CUPCAKES</p>
			appendHtml += '<div class="remise">';

			dateStart = dateStart.split("-").reverse().join("/");
			dateEnd = dateEnd.split("-").reverse().join("/");

			appendHtml += '<p>'+content+'<span class="dates">'+dateStart+' - '+dateEnd+'</span></p></div></div>';


			appendHtml += '<br/><a href="#"  onclick="deleteFavoriteBlog('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Retirer des favoris</a></div>';
			


			});
      $("#moncompte_bonsplans #bonsPlans").append(appendHtml);
		}		
	}});

}


function deleteFavoriteRepertory(repertory_id){
	var user_id = localStorage.getItem("user_id");
	$.ajax({
		url: "http://mobile.antibes-juanlespins-commerces.com/deleteRepertoryFromFavorites.php?user_id="+user_id+"&repertory_id="+repertory_id,
	dataType: "xml",
	complete : function(data){
    	document.getElementById(repertory_id).parentNode.removeChild(document.getElementById(repertory_id));
	}});
}

function deleteFavoriteBlog(blog_id){
	var user_id = localStorage.getItem("user_id");
	$.ajax({
		url: "http://mobile.antibes-juanlespins-commerces.com/deleteBlogFromFavorites.php?user_id="+user_id+"&blog_id="+blog_id,
	dataType: "xml",
	complete : function(data){
		document.getElementById(blog_id).parentNode.removeChild(document.getElementById(blog_id));

	}});
}
