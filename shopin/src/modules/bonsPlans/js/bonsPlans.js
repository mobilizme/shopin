function displayAllBonsPlans(start,nbToBeDisplayed){
	if(nbToBeDisplayed == undefined){
		nbToBeDisplayed = "";
	}	
	if(start == undefined){
		start = "";
	}
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getBlogsList.php?start="+start+"&step="+nbToBeDisplayed,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
        var appendHtml = "";	

		$(list).find('blog').each(function(){
				var id = $(this).find('id').text();
		        var title = $(this).find('title').text();
		        var date = $(this).find('date').text();
		        var site = $(this).find('site').text();
		        var nbSponsors = $(this).find('nbSponsors').text();
		        var menu = $(this).find('menu').text();
		        var user = $(this).find('user').text();
		        var lang = $(this).find('lang').text();
		        var content = $(this).find('content').text();
		        var meta_title = $(this).find('meta_title').text();
		        var meta_description = $(this).find('meta_description').text();
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
		          appendHtml += "<td><a onclick='addBlogToFavorite("+id+")'>favorit</a></td>";
		          appendHtml += "<td><a onclick=''>Share</a></td>";
		        appendHtml += "</tr>";*/


				appendHtml += '<div class="itemBonplan" style="background-image:url(images/bananabread.jpg);"><div class="content">';		
				appendHtml += '<h3>'+title+'</h3>'
									//<p class="categories">CUPCAKES</p>
				appendHtml += '<div class="remise">';

				dateStart = dateStart.split("-").reverse().join("/");
				dateEnd = dateEnd.split("-").reverse().join("/");

				appendHtml += '<p>'+content+'<span class="dates">'+dateStart+' - '+dateEnd+'</span></p></div></div></div>';
				if(localStorage.getItem("connected")=='true'){
					appendHtml += '<div><a href="#"  onclick="addBlogToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a></div>';
				}
				appendHtml += '</div>';
				
      });
      $("#moncompte_bonsplans #bonsPlans").append(appendHtml);
      $("#home #right-column-mobile #bonsPlans").append(appendHtml);
	}});
}

/*
function displayBonsPlansByCategory(categoryId){
$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getBlogsByCategory.php?categoryId="+categoryId,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
        var appendHtml = "";	
		$(list).find('blog').each(function(){
			var id = $(this).find('id').text();
	        var title = $(this).find('title').text();
	        var date = $(this).find('date').text();
	        var site = $(this).find('site').text();
	        var nbSponsors = $(this).find('nbSponsors').text();
	        var menu = $(this).find('menu').text();
	        var user = $(this).find('user').text();
	        var lang = $(this).find('lang').text();
	        var content = $(this).find('content').text();
	        var meta_title = $(this).find('meta_title').text();
	        var meta_description = $(this).find('meta_description').text();

	        appendHtml += "<tr>";
	          appendHtml += "<td>" + title + "</td>";
	          appendHtml += "<td>" + date + "</td>";
	          appendHtml += "<td>" + site + "</td>";
	          appendHtml += "<td>" + menu + "</td>";
	          appendHtml += "<td>" + user + "</td>";
	          appendHtml += "<td>" + lang + "</td>";
	          appendHtml += "<td>" + content + "</td>";
	          appendHtml += "<td>" + meta_title + "</td>";
	          appendHtml += "<td>" + meta_description + "</td>";
	          appendHtml += "<td><a onclick='addBlogToFavorite("+id+")'>favorit</a></td>";
	          appendHtml += "<td><a onclick=''>Share</a></td>";
	        appendHtml += "</tr>";

      });
      $("#page-bonsPlans #list").append(appendHtml);
	}});
}*/