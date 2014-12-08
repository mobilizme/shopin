function displayBoutiquesCategories(){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getCategoriesList.php",
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
        var appendHtml = "";	
		$(list).find('category').each(function(){
			var id = $(this).find('id').text();
	        var name = $(this).find('name').text();
	        var alias = $(this).find('alias').text();
	        var type = $(this).find('type').text();
	        var parent = $(this).find('parent').text();
	        var picture = $(this).find('picture').text();
	        var site = $(this).find('site').text();


			if(parent == 0){

	          	appendHtmlList = '';
				$(list).find('category').each(function(){
					if($(this).find('parent').text() == id){
		        		appendHtmlList += '<li><a href="#" onclick="window.location.href=\'shop.html?categoryId='+$(this).find('id').text()+'\'">'+$(this).find('name').text()+'</a></li>';
		        	}
		    	});


				appendHtml += '<li>';

				if(appendHtmlList != ''){
		          	appendHtml += '<a href="#">' + name + '</a>';
		          	appendHtml += '<ul>';
		          	appendHtml += appendHtmlList;				
			        appendHtml += '</ul>';
		    	}else{
		          	appendHtml += '<a href="#"  onclick="window.location.href=\'shop.html?categoryId='+id+'\'">' + name + '</a>';
		    	}
		        appendHtml += '</li>'; 
	    	}
      });

		document.getElementById("boutiquesCategories").innerHTML = appendHtml;


		//Sous-menu : masquer quand on reclique dessus
	    $('.navBoutiquesContainer .nav > li').find('> a').click(function() {
	        $('.navBoutiquesContainer .nav > li > a').not(this).parent().find('ul').slideUp();
	        $('.navBoutiquesContainer .nav > li > a').not(this).parent().removeClass('active');
	        var hauteurSousMenu = $(this).parent().find('ul').height();
	        $(this).parent().find('ul').stop(true, true).slideToggle(400);
	        $(this).parent().addClass('active');
	        return false;
	    });

	}});
}



function displayBoutiquesByCategory(categoryId){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getRepertoriesByCategory.php?categoryId="+categoryId,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
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


	        appendHtml += "<div class=\"itemSearch\">";
			appendHtml += "<a href=\'location.href='magasin.html?boutiqueId="+id+"'\''><img src='images/logo.png' /></a>";
			appendHtml += "<div class=\"content\">";
			appendHtml += "<h4><a href='#' onclick=\"location.href='magasin.html?boutiqueId="+id+"'\">"+name+"</a></h4>";
			appendHtml += '<p>'+address+'</p>';

			appendHtml += '<a href="#"  onclick="location.href=\'magasin.html?boutiqueId='+id+'\'" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Consulter</a>';
			

			if(localStorage.getItem("connected")=='true'){
				appendHtml += '<br/><a href="#"  onclick="addRepertoryToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a>';
			}
			appendHtml += '</div></div>';

			/*
	        appendHtml += "<tr>";
	          appendHtml += "<td>" + name + "</td>";
	          appendHtml += "<td>" + address + "</td>";
	          appendHtml += "<td>" + postalcode + "</td>";
	          appendHtml += "<td>" + town + "</td>";
	          appendHtml += "<td>" + latitude + "</td>";
	          appendHtml += "<td>" + longitude + "</td>";
	          appendHtml += "<td>" + phone + "</td>";
	          appendHtml += "<td>" + email + "</td>";
	          appendHtml += "<td>" + website + "</td>";
	          appendHtml += "<td>" + contact + "</td>";
	          appendHtml += "<td>" + description + "</td>";
	          appendHtml += "<td onclick='addRepertoryToFavorite("+id+")'>favoris</td>";
	        appendHtml += "</tr><hr>";*/
		});
		$("#home #shop #right-column").append(appendHtml);

		loadMapBoutiques(locations);
	}});
}