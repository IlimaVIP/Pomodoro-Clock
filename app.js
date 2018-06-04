$(document).ready(function(){
  var displayBreak = $('.displayBreak').attr('value');
  var displaySession = $('.displaySession').attr('value');
  var display = $('.time');
  
  var alarm = document.createElement('audio');
  alarm.setAttribute("src", "https://res.cloudinary.com/dbtrc2jyb/video/upload/v1527863888/Ringtone-for-alarm_l1kqpa.mp3");

 /* increment and decrement break and session value when buttons clicked. */
 $('#minBreak').click(function(){
    if(displayBreak>1){
      displayBreak-=1;
      $('.displayBreak').html(displayBreak);
    }
  });
  $('#plusBreak').click(function(){
    displayBreak++;
    $('.displayBreak').html(displayBreak);
  });
  $('#minSession').click(function(){
    if(displaySession>1){
      displaySession-=1;
      $('.displaySession').html(displaySession);
      $('.time').html(displaySession + ':00');
    }
  });
  $('#plusSession').click(function(){
    displaySession++;
    $('.displaySession').html(displaySession);
    $('.time').html(displaySession + ':00');
  });
  
  
  
  
  /* timer section */
  var currentTime, deadline, timeLeft, timeinterval;
  
  function RemainingTime(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor( (t/1000) % 60 );
	  var minutes = Math.floor( (t/1000/60) % 60 );
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
	  return {'total':t, 'minutes':minutes, 'seconds':seconds};
  }
  
  function initializeClock(display, endtime){
    timeinterval = setInterval(function(){
      var t = RemainingTime(endtime);
      display.html(t.minutes + ':' + t.seconds);
      if(t.total<=0){
        alarm.currentTime = 0;
        alarm.play();
        //alarm.pause();
        clearInterval(timeinterval);
        currentTime = Date.parse(new Date());
        deadline = new Date(currentTime + displayBreak*60*1000);
        BkeakTime(display, deadline);
        $('.circle').animate({
           dur: t.total
        });
        $('.brand').animate({'opacity': 0}, 200, function(){
          $(this).html('Break').animate({'opacity': 1}, 600);    
        });
      }
    },1000);
  }
  function BkeakTime(display, endtime){
    timeinterval = setInterval(function(){
      var t = RemainingTime(endtime);
      display.html(t.minutes + ':' + t.seconds);
      if(t.total<=0){
        clearInterval(timeinterval);
        currentTime = Date.parse(new Date());
        deadline = new Date(currentTime + displaySession*60*1000);
        initializeClock(display, deadline);
        $('.circle').animate({
          dur: t.total
        });
        $('.brand').animate({'opacity': 0}, 200, function(){
          $(this).html('Focus').animate({'opacity': 1}, 600);    
        });
      }
    },1000);
  }
  
  /* functions to display on UI */
  $('.fa-cog').on('click', function(){
    clearTimeout(timeinterval);
    timeLeft=undefined;
    display.html(displaySession + ':00');
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
  
  $('.fa-play-circle').click(function(){
    $('.fa-play-circle').hide();
    $('.fa-pause-circle').show();
    $('.brand').animate({'opacity': 0}, 200, function(){
      $(this).html('Focus').animate({'opacity': 1}, 600);    
    });
    if(timeLeft==undefined){
      currentTime = Date.parse(new Date());
      deadline = new Date(currentTime + displaySession*60*1000);
      initializeClock(display, deadline);
    }else{
      currentTime = Date.parse(new Date());
      deadline = new Date(Date.parse(new Date()) + timeLeft);
      initializeClock(display, deadline);
    }
  });
  
  $('.fa-pause-circle').click(function(){
    $('.fa-play-circle').show();
    $('.fa-pause-circle').hide();
    $('.brand').animate({'opacity': 0}, 200, function(){
      $(this).html('Pomodoro').animate({'opacity': 1}, 600);    
    });
		clearTimeout(timeinterval);
		timeLeft = RemainingTime(deadline).total;
  });
  
 
});

