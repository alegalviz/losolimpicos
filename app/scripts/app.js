'use strict';

/**
 * @ngdoc overview
 * @name losolimpicosApp
 * @description
 * # losolimpicosApp sitio para los juegos olímpicos
 *
 * Main module of the application.
 */
angular
  .module('losolimpicosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'duScroll',
    'angular-chartist',
    'slickCarousel',
    'estadisticasOlimpiadas',
    'graficosOlimpiadas'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
        /*resolve:{
          'MyServiceData':function(miServicio){
              // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
              return miServicio.promise;
          }
        }*/})
      .otherwise({
        redirectTo: '/'
      });
});

$(".lazy").recliner({
    attrib: "data-src", // selector for attribute containing the media src
    throttle: 300,      // millisecond interval at which to process events
    threshold: 50,     // scroll distance from element before its loaded
    printable: true,    // be printer friendly and show all elements on document print
    live: true          // auto bind lazy loading to ajax loaded elements
});

$(document).ready(function() {

  if($(window).width() < 480) {
    $('.prev-page').hide();
    $('.next-page').hide();
  } else {
    // do all your cool stuff here for larger screens
    $('#fullpage').fullpage({
      slidesNavigation: true,
      anchors: ['inicio', 'elproyecto', 'unoxuno', 'estadisticas', 'juegosymedios', 'blog', 'creditos'],
      scrollingSpeed: 1000,
      css3: true,
      scrollOverflow: true,
      responsiveWidth: 900,
      scrollOverflowOptions: {
        scrollbars: true,
        mouseWheel: true,
        hideScrollbars: false,
        fadeScrollbars: false,
        disableMouse: true,
        interactiveScrollbars: true
      }
    });
    $('.prev-page').show();
    $('.next-page').show();
    $('.prev-page i').on('click', function(){
      $.fn.fullpage.moveSectionUp();
    });
    $('.next-page i').on('click', function(){
      $.fn.fullpage.moveSectionDown();
    });


      $('#seccion3').on('change', 'select', function () {
          $.fn.fullpage.reBuild();
      });
      $('#seccion3').on('change', '.agregarpais button', function () {
          $.fn.fullpage.reBuild();
      });

  }

});

Pace.on('done', function(){
  $('.layer .aros').css('opacity', 1);
    $('.mujerescontenido').fadeOut();
    $('.participantescontenido').fadeOut();
    $('.anioxaniocontenido').fadeIn();
    if ($.isFunction($.fn.fullpage.reBuild)){
        $.fn.fullpage.reBuild();
    }
});

var MYBLOG_LIMIT = 6;
var MYWRAPPER_CLASS = 'blogposts';
var elblog = 'http://www.losolimpicos.com.ar/blog/';

var WP={open:function(b){var a={posts:function(){var d=MYBLOG_LIMIT;var e=0;var c={all:function(g){var f=b+"/api/get_recent_posts/";f+="?count="+d+"&page="+e+"&callback=?";jQuery.getJSON(f,function(l){var k=l.posts;for(var j=0;j<k.length;j++){var h=k[j];h.createComment=function(i,m){i.postId=h.id;a.comments().create(i,m)}}g(k)})},findBySlug:function(f,h){var g=b+"/api/get_post/";g+="?slug="+f+"&callback=?";jQuery.getJSON(g,function(i){h(i.post)})},limit:function(f){d=f;return c},page:function(f){e=f;return c}};return c},pages:function(){var c={findBySlug:function(d,f){var e=b+"/api/get_page/";e+="?slug="+d+"&callback=?";jQuery.getJSON(e,function(g){f(g.page)})}};return c},categories:function(){var c={all:function(e){var d=b+"/api/get_category_index/";d+="?callback=?";jQuery.getJSON(d,function(f){e(f.categories)})}};return c},tags:function(){var c={all:function(e){var d=b+"/api/get_tag_index/";d+="?callback=?";jQuery.getJSON(d,function(f){e(f.tags)})}};return c},comments:function(){var c={create:function(f,e){var d=b+"/api/submit_comment/";d+="?post_id="+f.postId+"&name="+f.name+"&email="+f.email+"&content="+f.content+"&callback=?";jQuery.getJSON(d,function(g){e(g)})}};return c}};return a}};

var blog = WP.open(elblog);
blog.posts().all(function(posts){
  for(var i = 0; i < posts.length; i++){
    jQuery('.'+MYWRAPPER_CLASS).append(function(){
      var categorias = ''; var keywords = '';
      posts[i].categories.forEach(function(entry){categorias +=  '<a href="' + elblog +'categoria/'+ entry.slug + '" target="_blank">' + entry.title + '</a>, ';});
      posts[i].tags.forEach(function(entry){keywords +=  '<a href="' + elblog +'tags/'+ entry.slug + '" target="_blank">' + entry.title + '</a>, ';});
      return (posts[i].attachments[0]) ? '' +
      '<div class="blogpost col-sm-4">' +
        '<div class="blogimagen">' +
          '<a target="_blank" href="'+posts[i].url+'"><img class="imagen" src="'+posts[i].attachments[0].url+'"/></a>' +
        '</div>' +
        '<div class="blogtitulo"><a target="_blank" href="'+posts[i].url+'"><h4>'+posts[i].title+'</h4></a></div>' +
        '<div class="blogautor">'+posts[i].author.name+'</div>' +
        '<div class="blogcategorias">'+ categorias.replace(/,\s*$/, "") +'</div>' +
        '<div class="blogpalabrasclave"><i class="fa fa-tags" aria-hidden="true"></i> '+ keywords.replace(/,\s*$/, "") +'</div>' +
      '</div>' :
      '<div class="blogpost  col-sm-4">' +
        '<div class="blogimagen">' +
          '<img class="imagen" src="images/postsinimagen.jpg"/>' +
        '</div>' +
        '<div class="blogtitulo"><a target="_blank" href="'+posts[i].url+'"><h4>'+posts[i].title+'</h4></a></div>' +
        '<div class="blogautor">'+posts[i].author.name+'</div>' +
        '<div class="blogcategorias">'+ categorias.replace(/,\s*$/, "") +'</div>' +
        '<div class="blogpalabrasclave"><i class="fa fa-tags" aria-hidden="true"></i> '+ keywords.replace(/,\s*$/, "") +'</div>' +
      '</div>';
    });
  }
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
$('#superMenuTrigger').on('click', function(event){
    $('.desplegableWrapper').toggleClass( "active" );
    $('body').toggleClass( 'menuabierto');
    event.stopPropagation();
});
$('html').click(function() {
    $('.desplegableWrapper').removeClass( "active" );
    $('body').removeClass( 'menuabierto');
});


$('.anioxanioheader h2').on('click', function(){
    $('.mujerescontenido').fadeOut(100);
    $('.participantescontenido').fadeOut(100);
    $('.anioxaniocontenido').fadeIn(100);

    $('.anioxaniocontenido').addClass( "activo" );
    $('.anioxanioheader').addClass( "activo" );
    $('.participantesheader').removeClass( "activo" );
    $('.mujeresheader').removeClass( "activo" );

    if ($.isFunction($.fn.fullpage.reBuild)){
        $.fn.fullpage.reBuild();
    }
});
$('.mujeresheader h2').on('click', function(){
    $('.mujerescontenido').fadeIn(100);
    $('.anioxaniocontenido').fadeOut(100);
    $('.participantescontenido').fadeOut(100);

    $('.mujerescontenido').addClass( "activo" );
    $('.participantesheader').removeClass( "activo" );
    $('.anioxanioheader').removeClass( "activo" );
    $('.mujeresheader').addClass( "activo" );

    if ($.isFunction($.fn.fullpage.reBuild)){
        $.fn.fullpage.reBuild();
    }

});
$('.participantesheader h2').on('click', function(){
    $('.mujerescontenido').fadeOut(100);
    $('.anioxaniocontenido').fadeOut(100);
    $('.participantescontenido').fadeIn(100);

    $('.participantescontenido').addClass( "activo" );
    $('.participantesheader').addClass( "activo" );
    $('.anioxanioheader').removeClass( "activo" );
    $('.mujeresheader').removeClass( "activo" );

    if ($.isFunction($.fn.fullpage.reBuild)){
        $.fn.fullpage.reBuild();
    }

});