var t;
var tID = null; /* Our timeout ID */
var startTimeout = new Date(); /* When the timer starts */
var timeLeft = 0; /* How much time is left */
function setTimer(duration, display){
    var timer = duration, minutes, seconds;
    t = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.html(minutes + ':' + seconds);
      if (--timer < 0) {
            timer = duration;
      }
    }, 1000);
    
  }

$(document).ready(function(){
  
  /* basic functions for UI */
  $('.fa-cog').on('click', function(){
    if( $('.settings').is(":hidden") ){
      $('.home').hide();
      $('.settings').fadeIn('slow');
      $('.brand').animate({'opacity': 0}, 200, function(){
        $(this).html('Settings').animate({'opacity': 1}, 600);    
      });
      
      $('.fa-play-circle').is(":hidden")? $('.fa-pause-circle').hide() : $('.fa-play-circle').hide();
    }else{
      $('.home').fadeIn('slow');
      $('.settings').hide();
      $('.brand').animate({'opacity': 0}, 200, function(){
        $(this).html('Pomodoro').animate({'opacity': 1}, 600);    
      });
      
      $('.fa-pause-circle').is(":hidden")? $('.fa-play-circle').fadeIn('slow') : $('.fa-pause-circle').fadeIn('slow');
    }
  });
  $('.brand').click(function(){
    
  });
  $('.fa-play-circle').click(function(){
    $('.fa-play-circle').hide();
    $('.fa-pause-circle').show();
    $('.brand').animate({'opacity': 0}, 200, function(){
        $(this).html('Focus').animate({'opacity': 1}, 600);    
      });
    var display = $('.time');
    setTimer(displaySession*60, display);
  });
  $('.fa-pause-circle').click(function(){
    $('.fa-play-circle').show();
    $('.fa-pause-circle').hide();
    $('.brand').animate({'opacity': 0}, 200, function(){
        $(this).html('Pomodoro').animate({'opacity': 1}, 600);    
      });
    clearTimeout(t);
  });
  
  /* increment and decrement break and session value when buttons clicked. */
  
  var displayBreak = $('.displayBreak').attr('value');
  var displaySession = $('.displaySession').attr('value');
  var timeBreak = 0, timeSession = 0;
  $('#minBreak').click(function(){
    if(displayBreak>1){
      displayBreak-=1;
      $('.displayBreak').html(displayBreak);
      timeBreak = displayBreak;
    }
  });
  $('#plusBreak').click(function(){
    displayBreak++;
    $('.displayBreak').html(displayBreak);
    timeBreak = displayBreak;
  });
  $('#minSession').click(function(){
    if(displaySession>1){
      displaySession-=1;
      $('.displaySession').html(displaySession);
      $('.time').html(displaySession + ':00');
      timeSession = displaySession;
    }
  });
  $('#plusSession').click(function(){
    displaySession++;
    $('.displaySession').html(displaySession);
    $('.time').html(displaySession + ':00');
    timeSession = displaySession;
  });
  
  
});

