function displayAllBoutiques(){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getRepertoriesList.php",
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
			appendHtml += "<a href='#' onclick=\"location.href='magasin.html?boutiqueId="+id+"'\"><img src='images/logo.png' /></a>";
			appendHtml += "<div class=\"content\">";
			appendHtml += "<h4><a href='#' onclick=\"location.href='magasin.html?boutiqueId="+id+"'\">"+name+"</a></h4>";
			appendHtml += '<p>'+address+'</p>';

			appendHtml += '<a href="#"  onclick="location.href=\'magasin.html?boutiqueId='+id+'\'" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Consulter</a>';
			if(localStorage.getItem("connected")=='true'){
				appendHtml += '<br/><a href="#"  onclick="addRepertoryToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a>';
			}
			appendHtml += '</div></div>';
	      /*  appendHtml += "<tr>";
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


function displayBoutiqueById(boutiqueId){
	$.ajax({
	url: "http://mobile.antibes-juanlespins-commerces.com/getRepertoriesList.php?id="+boutiqueId,
	dataType: "xml",
	complete : function(data){
		var list = data.responseXML;	
        var appendHtml = "";	
        var appendDesc = "";	
        var appendTitle = "";


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



			/*if(localStorage.getItem("connected")=='true'){
				appendHtml += '<br/><a href="#"  onclick="addRepertoryToFavorite('+id+')" class="readmore"><span class="glyphicon glyphicon-chevron-right"></span> Ajouter aux favoris</a>';
			}*/
			appendHtml += "<h2><span>Contact</span></h2>";
			appendHtml += "<p>"+address+"<br/>"+postalcode+"<br/>"+town+"<span class='bleuClair'>Tel. " +phone+"</span><br/>"
			appendHtml += email+"<br/>";	

			appendHtml+='</p><a href="#contactModal" class="bouton" data-rel="popup" data-position-to="window" data-transition="fade">Contactez-nous !</a><div class="partage"><a href="#" class="facebook-mobile"></a><a href="#" class="twitter-mobile"></a><a href="#" class="gplus-mobile"></a></div>';


			appendDesc += "<h2><span>Informations</span></h2><p>"+description+"</p>"; 

			appendTitle += name; 




	      /*  appendHtml += "<tr>";
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
		$("#home #magasin #content #sectionContact").append(appendHtml);
		$("#home #magasin #content #sectionInformations").append(appendDesc);

		$("#home #magasin #left-column #top_left #titrePage").append(appendTitle);


		loadMapBoutiques(locations);
	}});
}



function loadMapBoutiques(locations) {
    var map = new google.maps.Map(document.getElementById('googlemaps'), {
		zoom: 13,
		center: new google.maps.LatLng(43.5795147,7.111199),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false, 
		panControl: true,
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) {  
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		  infowindow.setContent("<button onclick='loadBoutiqueItinerary("+locations[i][1]+","+ locations[i][2]+");'>Itineraire</button><br>"+locations[i][0]);
		  infowindow.open(map, marker);
		}
      })(marker, i));
    }

	// Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

			    var lineSymbol = {
				    path: google.maps.SymbolPath.CIRCLE,
				    scale: 8,
				    strokeColor: '#00cd00'
				  };

				    var infowindow = new google.maps.InfoWindow({
				      content: "Vous êtes ici"
				  });

			marker = new google.maps.Marker({
		        position: pos,
		        icon: lineSymbol,
		        map: map
		      });

			  google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(map,marker);
			  });

		});
	}
	//document.getElementById("map").style.display = "block";
}

//Calculate boutique itinerary
function loadBoutiqueItinerary(PosLat, PosLong) {
	var coords = new google.maps.LatLng(PosLat, PosLong);
	var options = {
        zoom: 14,
        center: coords,
        mapTypeControl: false,	
        scrollwheel: false, 
	panControl: true,
	zoomControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	map = new google.maps.Map(document.getElementById('googlemaps'),
	  options);

	// Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			var travel = {
				origin : new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
				//destination : "Antibes, France",
				destination : coords,
				travelMode : google.maps.DirectionsTravelMode.DRIVING
				// Exchanging DRIVING to WALKING above can prove quite amusing :-)
			};
			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById("map-directions"));
			directionsService.route(travel, function(result, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
				}
			});
		  	map.setCenter(pos);
		});
	} else {
	// Browser doesn't support Geolocation
	//handleNoGeolocation(false);
	}
	//document.getElementById('map').style.display = "block";
}