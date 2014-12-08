function searchAll(string){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/search.php?search="+string,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
        var appendHtml = "";	

		appendHtml += '<div id="right-column" class="boutiquesTrouvees col-sm-3"><a href="#" class="print"></a><h3 id="titre-parcours">Boutiques<br/><img src="images/menu-magasins.png" alt="nos parcours" /></h3></div>';
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

			appendHtml += '<div class="item" style="width:100px important!;"><a href="#"><img src="images/search-results.jpg" alt="" /></a><div class="content">';
			appendHtml += '<h2><a href="#" onclick="window.location.href=\'magasin.html?boutiqueId='+id+'\'">'+name+'</a></h2>';
			if(localStorage.getItem("connected")=='true'){
				//appendHtml += 'aaaa';
				appendHtml += '<div style="float:right;"><a href="#"  onclick="addRepertoryToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a></div>';
			}
			appendHtml += '<p>'+address+'<br/>Tel. '+phone+'</p>';

			appendHtml +='</div></div>';

        });


		appendHtml += '<div id="right-column" class="boutiquesTrouvees col-sm-3"><a href="#" class="print"></a><h3 id="titre-parcours">Bons Plans<br/><img src="images/menu-bonsplans.png" alt="nos parcours" /></h3></div>';
		
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
	        
			appendHtml += '<div class="bonsPlans">';
			appendHtml += '<div class="itemBonplan" style="background-image:url(images/bananabread.jpg);"><div class="content">';		
			appendHtml += '<h3>'+title+'</h3>'
								//<p class="categories">CUPCAKES</p>
			appendHtml += '<div class="remise">';

			dateStart = dateStart.split("-").reverse().join("/");
			dateEnd = dateEnd.split("-").reverse().join("/");

			appendHtml += '<p>'+content+'<span class="dates">'+dateStart+' - '+dateEnd+'</span></p></div></div></div>';

			if(localStorage.getItem("connected")=='true'){
				appendHtml += '<br/><a href="#"  onclick="addBlogToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a></div>';
			}else{
				appendHtml += '</div>';
			}
			appendHtml += '</div>';

      });
		document.getElementById("displayResults").innerHTML = appendHtml;

	}});
}