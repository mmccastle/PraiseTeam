//Scrolling to page sections
$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing');
	});
});


$(".btn-drop").click(function(){
    $("#drop-down").toggleClass("menu-displayed");
  });


  // media player

  var audio;

//Hide pause button
$('#pause').hide();

//Initialize

initAudio($('#playlist li:first-child'));

function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var artist = element.attr('artist');
    var cover = element.attr('cover');
	
	//Create audio object
	audio = new Audio(song);
	
	if(!audio.currentTime){
		$('#duration').html('0:00');
	}
	
	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
        $('img.cover').attr('src', 'assets/img/covers/' + cover);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
}

//Play button
$('#play').click(function() {
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Pause button
$('#pause').click(function() {
	audio.pause();
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Stop button
$('#stop').click(function() {
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
	showDuration();
});

//Next button
$('#next').click(function() {
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0){
		next = $('#playlist li:first-child');
	}
        $('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
	$('#duration').fadeIn(400);
	showDuration();
});

//Fast Forward
$('#forward').click(function() {
	if (audio.currentTime > 0){
		audio.currentTime += 5;
	}
});

//Rewind
$('#rewind').click(function() {
        audio.currentTime -= 5;
});

//Prev button
$('#prev').click(function() {
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		next = $('#playlist li:last-child');
	}
        $('#play').hide();
	$('#pause').show();
	initAudio(prev);
	audio.play();
	$('#duration').fadeIn(400);
	showDuration();
});

//Volume Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

//Time Duration
function showDuration (){
	$(audio).bind('timeupdate', function(){
		//Get hours
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime) / 60) % 60;
		//Add 0 if less than 10
		if (s < 10){
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
		var value =  0;
		if(audio.currentTime > 0){
			value = Math.floor((100 /audio.duration) * audio.currentTime) - 20;
		}
		$('#progress').css('width', value + '%');
                
                if (audio.currentTime === audio.duration){
                    autoplay();
                }
                 
	});
       
};

//Make playlist clickable
$('#playlist li').click(function() {
	audio.pause();
	var track = $(this);
	initAudio(track);
	audio.play();
    $('#play').hide();
	$('#pause').show();
    $('#duration').fadeIn(400);
	showDuration();
});

//Autoplay
function autoplay(){
        if( audio.currentTime >= audio.duration ) {
                var next = $('#playlist li.active').next();
                initAudio(next);
                audio.play();
                showDuration();
        }
};
        