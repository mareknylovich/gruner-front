$(document).ready(function() {

if(history.length<=1){
  $('p.back a[title="Zurück"]').hide();
}
	
//LP PROCESSING
if(page_type=="Landing Page"){
$('a').each(function(){
  var link = $(this).attr('href');  
  if (typeof(link)!="undefined"){
  $(this).attr('href',link.replace('link.formlink', $('#topbox .greenbtn  a').attr('href')));
  }
});
if(page_step=="Form 1"){
var type = window.location.hash.substr(1);
if(typeof(type)!="undefined"){
switch(type){
  case 'std':
break;
  case 'magnifier':
$('h1').after('<center class="dynamic_icon"><img src="/files/landingpages/books/t1_prognose.png"><span style="margin-left:-35px">Fundamentale Sorgen: Sind Rezessionsängste gerechtfertigt?</span></center>');$('h2').hide();
break;
  case 'bulls':
$('h1').after('<center class="dynamic_icon"><img src="/files/landingpages/books/t2_prognose.png"><span style="margin-left:10px">Fundamentale Sorgen: Sind Rezessionsängste gerechtfertigt?</span></center>'); $('h2').hide();
break;
  case 'map':
$('h1').after('<center class="dynamic_icon"><img src="/files/landingpages/books/Europe Map GBgreen.png"><span style="margin-left:0px">Fundamentale Sorgen: Sind Rezessionsängste gerechtfertigt?</span></center>'); $('h2').hide();
break;
}
}
}
}
  //mobile_build_nav();
    $('img[src*="googleadservices"]').hide();
    $('iframe[src*="googleads"]').hide();


  form_prepare();
  menu_prepare();
$('#main_nav >ul>li.trail,#main_nav >ul>li.active ').next().addClass('noline');
$('#moreinfo').unbind().click(function(){
  if($(this).hasClass('show')){
    $(this).animate({'height':'145px'},500);
    $(this).removeClass('show');


  }else{
  $(this).addClass('show');
    $(this).css('height','auto');
    var h = $(this).outerHeight();
    $(this).css('height','145px');

    $(this).animate({'height':h},500,function(){
      $(this).css('height','auto');
    });


  }
});



  if ($('body').hasClass('standard')) {
    var html = $('aside#right').html();
    $('aside#right').html('<div id="stick">' + html + '</div>');
    $('#textcontroll').insertBefore('#stick');

    if($('body').hasClass('media_archive')){
var h = $('#stick').height();
console.log(h);
$('.green_section').css({'min-height':parseInt(h)+100+"px"});
}

    $("#stick").sticky({
      topSpacing : 10
    });
    setPiontsInMap();
  //  setPiontsInMap();
  }


    $('aside#right').prepend('<div id="textcontroll"><div><p class="zoomout">A</p><p class="zoomin">A</p></div></div>');


  $('#right p.zoomin').unbind().click(function() {
    $('body').addClass('zommed');
    document.cookie = "zoommode=big;path=/";
  });
  $('#right p.zoomout').unbind().click(function() {
    $('body').removeClass('zommed');
    document.cookie = "zoommode=normal;path=/";
  });

  if (getCookie("zoommode") == "big") {
    $('div#textcontroll p.zoomin').click();
  }

$(window).scroll(function (event) {
     validPos();
});
$(window).resize(function (event) {
     validPos();
     tabletswitch();
});
$('form input[type="submit"]').unbind().click(function(){if ( $(this).parent().parent().parent().hasClass("mod_search")==true ) return true;
return mark_invalid_fields($('form'));
});


if($('input.volmodal').length>0){
  $('form input[type="submit"]').unbind().click(function(){

    if( mark_invalid_fields($('form'))){

      $('#modalx').show();
      jQuery('#modalx h3').html('Vielen Dank!');
      
	  if (country_code=="CH"){
		  jQuery('#modalx p').html('Nur noch schnell diese kurze Umfrage beantworten, dann kommen Sie zu Ihrer angeforderten Studie.<br/><br/><b>Wie hoch ist Ihr Gesamtvermögen (exkl. Immobilien)?</b>');
	  }else{
		jQuery('#modalx p').html('Bitte geben Sie Informationen zu Ihrem Vermögen an.<br/><br/><b>Wie hoch ist Ihr Gesamtvermögen (exkl. Immobilien)?</b>');  
	  }
	  

      var vol=['unter 250.000 €','250.000 € bis 500.000 €','500.000 € bis 750.000 €','mehr als 750.000 €'];
	  if (country_code=="CH"){
		  vol=['unter CHF 300‘000','CHF 300‘000 – CHF 600‘000','CHF 600‘000 – CHF 800‘000','mehr als CHF 800‘000'];
	  }

      ///for (var i = 0; i < vol.length; i++) {
        //$('#modalx > div').append('<a href="#" class="button" text-data="'+vol[i]+'">'+vol[i]+'</a>');
      //}

      for (var i = 0; i < vol.length; i++) {
        $('#modalx > div').append('<input type="radio" name="modal_vac" id="vac'+i+'" value="'+vol[i]+'"><label for="vac'+i+'">'+vol[i]+'</label><br/>');
      }
      $('#modalx > div').append('<br/><a href="#" class="button">Jetzt herunterladen »</a>');



      $('#modalx > div a').click(function(){
        if ($(this).hasClass('close')){
            $('input[name="modal_vac"]').prop('checked', false);
        }
        var radioval = $("input:radio[name ='modal_vac']:checked").val();
        if (typeof radioval == 'undefined') radioval="ka";

        $('input.volmodal').val(radioval);
        $('form').submit();
        return false;
      });
    }

    return false;
  });
}
if ($('body').hasClass("5stepsform")){
$('form input[name="telefonnummer"]').val('0000000000');
$('form input[name="postleitzahl"]').val('00000');
$('form input[name="ort"]').val('xxxxx');
$('.step1').show();
$('.step2').hide();
$('.step3').hide();
$('form input[type="submit"]').unbind().click(function(){
   //store action
   var action = $('form').attr('action');
   var redirection = '/';
   console.log("bind for step2");
   if( mark_invalid_fields($('form'))){
     
      $.ajax({
          url: "/"+$('form').attr('action'),
          type: "POST",
          data: $( "form" ).serialize(),
          context: this,
          dataType: "json", // this is important
          success: function (data,t1,t2) {
             $('html, body').animate({
              scrollTop: $('#topbox').offset().top-10
            }, 200);
            $('input[name="Nutzungsbedingungen"]').prop( "checked", false );
            
            /*relayout*/
           $('#topbox > h1').hide();
            $('#topbox > h2').hide();
            $('#topbox > .ce_text').hide();
            
            
            
            redirection = t2.getResponseHeader("X-Ajax-Location");
            $('.step2').show(); 
            
            //assync
            setTimeout(function(){$('form input[name="telefonnummer"]').attr('type','tel');$('form input[name="postleitzahl"]').attr('type','number');},500);
            setTimeout(function(){$('form input[name="telefonnummer"]').attr('type','tel');$('form input[name="postleitzahl"]').attr('type','number');},1000);
            setTimeout(function(){$('form input[name="telefonnummer"]').attr('type','tel');$('form input[name="postleitzahl"]').attr('type','number');},1500);
            
            //$('form input[name="postleitzahl"]').attr('type','');
            $('.step2 input').attr('type','text').val("").parent().show();
            $('.step1').hide();
            $('.step3').hide();
            $('form input[name="ort"]').val('xxxxx');
            console.log("bind for step3");
            $('form input[type="submit"]').unbind().click(function(){
               if( mark_invalid_fields($('form'))){
              /*   $.ajax({
          url: "/ajaxformupdater.php",
          type: "POST",
          data: $( "form" ).serialize(),
         });*/
          
                $.ajax({
                  url: "/ajaxformupdater.php",
                    type: "POST",
                    data: $( "form" ).serialize(),
                    //context: this,
                    //dataType: "json", // this is important
                    success: function (data,t1,t2) {
                             $('html, body').animate({
              scrollTop: $('#topbox').offset().top-10
            }, 200);
            $('div.widget-checkbox').hide();
                        $('.step3').show();
                        $('.datenschutzbox').parent().parent().hide();
                       $('form input[type="submit"]').val('Jetzt herunterladen »');
                    $('form input[name="ort"]').val('xxxxx');
                       $('.step2').hide();
                       $('.step1').hide();    ;}});
                       $('form input[type="submit"]').unbind().click(function(){
                       /*                   $.ajax({
          url: "/ajaxformupdater.php",
          type: "POST",
          data: $( "form" ).serialize(),
         });*/
                          $.ajax({
                    url: "/ajaxformupdater.php",
                    type: "POST",
                    data: $( "form" ).serialize(),
                    //context: this,
                    //dataType: "json", // this is important
                    success: function (data,t1,t2) {
                      window.location.href = redirection;
                    }});return false;
                       });
    }
     return false;
    });
    },
    
});
   }
  
  return false;
});
}
tabletswitch();
depotBuild();


if($('body').hasClass('mobile')){
$('input[name="email"]').prev().find('span.mandatory').show();
$('input[name="Telefonnummer"]').prev().find('span.mandatory').show();
$('input[name="telefonnummer"]').prev().find('span.mandatory').show();

}


if($('body').find('p.error').length>0){

  setTimeout(function(){


  $('html, body').animate({
        scrollTop:  $('body').find('p.error:first').offset().top
    }, 500);
  },1000);
}


});

function menu_prepare() {
  var counter = 0;
  $('#main_nav > ul > li').each(function() {
    $(this).addClass('segment_' + counter);
    counter++;
  });

  var fastaccess = $('#mobile_nav');
$.get("/mobilecustom.html", function(data) {
  $(fastaccess).append(data);
  $('#header .mod_customnav ul li.last').append(data);
      $( "section.subcolumns div.col_1>div>  nav > ul > li.last > a" ).replaceWith( "<span>Schnellzugriff</span>" );
});





}

function form_prepare() {
  var fieldsetlist = $('form fieldset.stage');
  if ($(fieldsetlist).length > 0) {

    var counter = 0;

    $(fieldsetlist).each(function() {

      $(this).attr('step', counter);
      counter++;

    });
    $('form fieldset.stage:first').addClass('first current');
    $('form fieldset.stage:last').addClass('last');

    $(fieldsetlist).hide();
    $('form fieldset.stage.first').parent().addClass('multiple_form');
    $('form fieldset.stage:not(.first)').append('<a class="button prevstep" href="#" onclick="form_prev($(\'form\')); return false">&laquo;  zurück</a>');
    $('form fieldset.stage:not(.last)').append('<a class="button nextstep" href="#" onclick="form_next($(\'form\')); return false">weiter &raquo; </a>');
      $('fieldset.stage.last .button.prevstep').insertBefore('.submit_container input');
  }

}
function form_prev(e) {
  mark_invalid_fields($(e));

    var current = $(e).find('fieldset.current');
    $(current).removeClass('current');
    $(current).prev().addClass('current');
  updateDepotStep();
}
function form_next(e) {
  mark_invalid_fields($(e));
  var validation_result = form_valid($(e).find('fieldset.current'));
  if (validation_result == true) {
    var current = $(e).find('fieldset.current');
    $(current).removeClass('current');
    $(current).next().addClass('current');
  }
}

function form_valid(e) {
  var score = 0;
  $(e).find('input,select').each(function() {

    if ( typeof ($(this).attr('required')) != "undefined") {
      var elementType = $(this).prop('tagName');
      elementType = elementType.toLowerCase();
      if (elementType == 'input') {
        if ($(this).val() == '') {
          $(this).val('e');
          $(this).val('');
          $(this).click();
          $(this).click();
        }
        if (document.getElementById($(this).attr('id')).checkValidity() == false)
          score++;
      }

      if (elementType == 'select') {
        if ($(this).val() == '') {
          $(this).val('e');
          $(this).val('');
        }
        if (document.getElementById($(this).attr('id')).checkValidity() == false)
          score++;
      }
    }
  });
  if (score > 0)
    return false;
  return true;
}
function mark_invalid_fields(area){

if($('fieldset.stage').length>0) {

area = $('fieldset.stage.current');
}
 $('.validError').removeClass('validError');
 var score = 0;
  $(area).find('select,input,textarea').each(function(){

   if(   $(area).find('select[name="anrede"]').val()=='-'  ){
     $(area).find('select[name="anrede"]').addClass('validError');
     score++;
   }


    if($(this).attr('id') && $(this).attr('required')){

      if (document.getElementById($(this).attr('id')).checkValidity() == false){
      score++;
       $(this).addClass('validError');
      }
    }
  });

  if(score>0) {
    if(!$('body').hasClass('depotform')){
     $('html, body').animate({
        scrollTop: $('.validError:first').offset().top-20
    }, 200);
    }
    return false;

  }
  return true;



}


function mobile_build_nav() {
  if ($("#mobile_nav div.mm-search").length == 0) {
    setTimeout(function() {
      mobile_build_nav();
    }, 200);
    return false;
  }
  var lastul = $("#mobile_nav>ul:last");
  var searchbar = $("#mobile_nav div.mm-search:last");
  $(searchbar).insertAfter(lastul);

  $.get("/mobilecustom.html", function(data) {
    $(data).insertAfter("#mobile_nav>ul:last");
    mobile_fit_custom();
    $('a[href="#mobile_nav"]').click(function() {
      mobile_fit_custom();
    });

  });

  $("#mobile_nav>ul").click(function() {
    mobile_fit_custom();
  });

}

function mobile_fit_custom() {
  setTimeout(function() {
    var current_element = $("nav#mobile_nav ul.mm-current");
    $('#mobilecustom').animate({
      'top' : $(current_element).outerHeight()
    }, 250);
    $("#mobile_nav div.mm-search").animate({
      'top' : $('#mobilecustom').height() + $(current_element).outerHeight()
    }, 250);
  }, 10);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
    c = c.substring(1);
    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length);
  }
  return "";
}

function setPiontsInMap(){
$('#interactive-map div.point').each(function(){
  var data = $(this).attr("title");
  $(this).removeAttr('title');
  data = data.split("x");

  data[1] = (data[1]-5)*100/646;
  data[0] = (data[0]-5)*100/521;



  $(this).css('top',data[1]+'%');
  $(this).css('left',data[0]+'%');
  if(!$(this).hasClass('norad'))
    $(this).prepend('<div class="radius"></div>');
    $(this).bind('mouseover',function(){$(this).addClass('light');});
    $(this).bind('mouseout',function(){$(this).removeClass('light');});
});
resizeMapPoints();
$( window ).resize(function() {
resizeMapPoints();
});
}

function resizeMapPoints(){
  if($('#interactive-map').length>0){
    $('#interactive-map').css('width','auto');
    var ww = $('#interactive-map').width();
    $('#interactive-map').css('height',ww*646/521);
  }
  var acc = parseInt($('#interactive-map').width());
  var p =   acc*100/521;
  $('#interactive-map >div').css('width',20*(p/100)+'px');
  $('#interactive-map >div').css('height',20*(p/100)+'px');
  //$('#interactive-map >div').css('margin',p/200+'%');
}
function validPos(){

var winPos = parseInt($('html').scrollTop());
if(winPos==0){
  winPos = parseInt($('body').scrollTop());
}
var totalH = parseInt($('body').height());
var boxH = parseInt($('#stick').height());
var footerH = parseInt($('footer').outerHeight());
var padding = 110;//2* parseInt($('.green_section').css('padding-bottom'));

if(winPos+boxH>totalH-footerH-padding){
  $("#stick").addClass('stop');
  $("#stick").unstick();
  $("#stick").css({'top':totalH-footerH-boxH-padding,'position':'absolute','width':$('#right').width()});

}else{
 // $("#stick").css({'top':10,'position':'fixed'});
  if($('#stick').hasClass('stop')){
    $('#stick').removeClass('stop');
  $("#stick").sticky({
      topSpacing : 10
    });
}
}
}




function depotBuild(){

  if($('body').hasClass('depotform')){

for(var i=0; i<=2; i++){


  $('.ce_form').before('<div class="depotcheckstep depot-'+(i+1)+'"><figure><img src="/files/web/gfx/layout/depot-0'+(1+i)+'.png"></figure></div>');

}

$('head').append('<script src="/files/web/js/lib/dropzone.js"></script>');

$('fieldset.stage[step="1"] .prevstep').before('<div id="uploader"></div>');

$("#uploader").dropzone({ url: "/depotcheck.html?upload=true",
                        complete:function(file){
                          console.log(file);
                          var removeButton = Dropzone.createElement('<a onclick="removeFile(\''+file.name+'\',$(this)); return false;">Entfernen</a>');
                           file.previewElement.appendChild(removeButton);
                        },
                         success: function(file, response){
               $('textarea.uploads').val(response);
            }
                        });




updateDepotStep(false);



$('.nextstep').click(function(){
  depotSummary();
  setTimeout(function(){ updateDepotStep();},100);
});

}

}


function updateDepotStep(anim){

 var stage = 1+parseInt($('fieldset.stage.current').attr('step'));

  $('.depotcheckstep').hide();
  $('.depot-'+stage).show();
  if(anim!=false){
 $('html, body').animate({
        scrollTop: $('.depot-'+stage).offset().top
    }, 200);
  }
}

function depotSummary(){
var summary = '';

var radioVal = $('form input.radio:checked').parent().find('label').html();
if(typeof(radioVal)!='undefined')
summary+='<p><span>Risikoprofil: </span>'+radioVal+'</p>';
summary+='<p><span class="dist">Anrede / Titel: </span>'+$('select[name="anrede"] option:selected').text()+' '+$('select[name="titel"] option:selected').text()+'</p>';
summary+='<p><span class="dist">Vorname, Name: </span>'+$('input[name="vorname"]').val()+' '+$('input[name="nachname"]').val()+'</p>';

summary+='<p><span class="dist">E-Mail: </span>'+$('input[name="email"]').val()+'</p>';

summary+='<p><span class="dist">Strasse / Nr.: </span>'+$('input[name="strasse_und_hausnr"]').val()+'</p>';

summary+='<p><span class="dist">PLZ / Ort: </span>'+$('input[name="postleitzahl"]').val()+' '+$('input[name="ort"]').val()+'</p>';

summary+='<p><span class="dist">Telefonnummer: </span>'+$('input[name="telefonnummer"]').val()+'</p>';

summary+='<p>&nbsp;</p><p><strong>Wann können wir Sie am besten erreichen um die Ergebnisse unserer Analyse mit Ihnen zu besprechen? .</strong></p><p>&nbsp;</p>';

summary+='<p><span class="dist">Wochentag: </span>'+$('select[name="wochentag"] option:selected').text()+'</p>';

summary+='<p><span class="dist">Uhrzeit: </span>'+$('input[name="uhrzeit"]').val()+'</p>';

summary+='<p><span class="dist">Nachricht: </span>'+$('textarea[name="nachricht"]').val()+'</p>';

//summary+='<p>&nbsp;</p><p><strong>Sie haben jetzt die Möglichkeit Ihre Depotauszüge  direkt hochzuladen, oder Sie übermitteln uns diese per Fax, E-Mail oder Post.</strong></p><p>&nbsp;</p>';
summary+='<p><span class="dist">Anlagevolumen: </span>'+$('input[name="anlagevolumen"]').val();

if ($('input[name="anlagevolumen"]').val()!='') summary+=' EURO</p>'; else summary+='</p>';

var fileList = $('textarea[name="uploads"]').val();

fileList = fileList.split("\n");

var listString ='';
for (index = 0; index < fileList.length; ++index) {
  listString+='<p><a target="_blank" href="'+fileList[index]+'">'+baseName(fileList[index])+'</a></p>';

}

summary+='<p><span class="dist">Dateianhang: </span>'+listString+'</p>'


$('#summary').html(summary);

}

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
  //  if(base.lastIndexOf(".") != -1)
      //  base = base.substring(0, base.lastIndexOf("."));
   return base;
}


function tabletswitch(){
if($(window).width()<=1024){

 $('.tabletswitch').parent().hide();
} else{
  $('.tabletswitch').parent().show();
}

}
function removeFile(e,el){ $(el).parent().css('opacity',0.5);$(el).parent().fadeOut(100);  $.ajax({url: '/depotcheck.html?delete='+e,success: function(data){  $('textarea.uploads').val(data);}});}