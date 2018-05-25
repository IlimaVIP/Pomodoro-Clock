$(document).ready(function(){
    $('.fa-cog').on('click', function(){
      if( $('.settings').is(":hidden") ){
        $('.home').hide();
        $('.settings').fadeIn('slow');
        $('.brand').animate({'opacity': 0}, 200, function(){
          $(this).html('Settings').animate({'opacity': 1}, 600);    
        });
        //$('.brand').text('Settings');
        
        $('.fa-play-circle').is(":hidden")? $('.fa-pause-circle').hide() : $('.fa-play-circle').hide();
      }else{
        $('.home').fadeIn('slow');
        $('.settings').hide();
        $('.brand').animate({'opacity': 0}, 200, function(){
          $(this).html('Pomodoro').animate({'opacity': 1}, 600);    
        });
        //$('.brand').text('Pomodoro');
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
      //$('.brand').text('Session');
    });
    $('.fa-pause-circle').click(function(){
      $('.fa-play-circle').show();
      $('.fa-pause-circle').hide();
      $('.brand').animate({'opacity': 0}, 200, function(){
          $(this).html('Pomodoro').animate({'opacity': 1}, 600);    
        });
    });
  });
  
  