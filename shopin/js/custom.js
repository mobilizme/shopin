$(document).ready(function() {

    // Sous-menu : masquer quand on reclique dessus
    $('.navBoutiquesContainer .nav > li').find('> a').click(function() {
        $('.navBoutiquesContainer .nav > li > a').not(this).parent().find('ul').slideUp();
        $('.navBoutiquesContainer .nav > li > a').not(this).parent().removeClass('active');
        var hauteurSousMenu = $(this).parent().find('ul').height();
        $(this).parent().find('ul').stop(true, true).slideToggle(400);
        $(this).parent().addClass('active');
        return false;
    });

    // Mobile : affichage du formulaire de recherche
    $('.loupeMobile').click(function() {
         $('.navbar-search').slideToggle();
     });

    // Carousel 
    $(".carousel").owlCarousel({ 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 1,
        itemsTablet : [768,2],
        itemsMobile : [479,1]
    });
    // Carousel bons plans
    $(".carouselBonsPlans").owlCarousel({ 
        pagination: false,
        items : 3,
        itemsTablet : [768,3],
        itemsMobile : [479,3]
    });    

});

$( document ).on( "pageinit", "#home", function() {$
    $( document ).on( "swipeleft swiperight", "#home", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#sidr" ).panel( "open" );
            }
        }
    });
});


$( "#button-search" ).click(function() {
    if($("#input-search").val() != ""){
        window.location.href='search-results.html?search='+$("#input-search").val();
    }
});