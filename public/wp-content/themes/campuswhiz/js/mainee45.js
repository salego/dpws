(function ($) {
 "use strict";
  
	var $tabs = $('.nav-year li');
	var flagscroll=true;
	
	$('.about-count').each(function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
			}, {
			duration: 4000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			}
		});
	});

	$('.calendar_periods').each(function () {

		var calendar_id = $(this).data('id');
		var period_from = $(this).data('from');
		var period_till = $(this).data('till');
		var period_color = $(this).data('color');
		var i = 0, loop = true;
		var period_from_arr = period_from.split("/");
		var period_till_arr = period_till.split("/");
		var loop_date = new Date(period_from_arr[2],period_from_arr[0]-1,period_from_arr[1]);
		var loop_date_break = new Date(period_till_arr[2],period_till_arr[0]-1,period_till_arr[1]);

		while(loop){

			var day_id = calendar_id+'_'+loop_date.getDate()+'_'+loop_date.getMonth()+'_'+loop_date.getFullYear();
			var day = $('#calendar_'+day_id).html();
			//console.log(day_id + " | " + day + " | " + loop_date + " | " + loop_date_break);

			if(loop_date+""==loop_date_break+""){

				loop = false;
				if ( i == 0 ){
					$('#calendar_'+day_id).addClass("event-1-day").css('background',period_color);
				}else{
					$('#calendar_'+day_id).addClass("event-1-end").css('background',period_color);
				}
			}else{

				if ( i == 0 ){
					$('#calendar_'+day_id).addClass("event-1-start").css('background',period_color);
				}else{
					$('#calendar_'+day_id).addClass("event-1").css('background',period_color);
				}
			}

			loop_date.setDate(loop_date.getDate()+1);

			i++;
			if(i>31)
				loop = false;
		}
	});	
	
	$(".events-list .row > div").slice(0, 8).show();
	$(".excursions-list .row > div").slice(0, 8).show();
	$(".teachers-list .row > div").slice(0, 8).show();
	$(".gallery-list .container > .row").slice(0, 4).show();
	$(".academics-content .container > .row").slice(0, 6).show();
	
	$(".timetable_select").on("change", function(){	

		//alert("timetable_select");
		$( "#form_timetable" ).submit();
	});

	$("div").on("mouseleave", function(){	
	
		if ($(this).hasClass("events-single-location")) { 
			$('.events-single-location iframe').css("pointer-events", "none"); 
		}
		
		if ($(this).hasClass("excursions-single-location")) { 
			$('.excursions-single-location iframe').css("pointer-events", "none"); 
		}	  
	});
	
	$(window).on("scroll", function(){

		var y = $(window).scrollTop();
		if(  y > 2000 && flagscroll === true ) {
			flagscroll=false;
			$('.home-count').each(function () {
				$(this).prop('Counter',0).animate({
					Counter: $(this).text()
					}, {
					duration: 4000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}
				});
			});
		}
	});

	//fix menu cart new line problem
	if ( $(".navbar-primary").outerHeight() > 60 && $(window).width() > 991 ) {

		var liItems = $(".navbar-primary > .menu-item").get();
		//iterate through this array in reverse order    
		for(var i = liItems.length - 1; i >= 0; --i){

		  	//do Something
		  	if ( $(".navbar-primary").outerHeight() < 60 ){
			
			}else{	
				$("#"+liItems[i].id).remove();
			}	
		}
	}
	
	$("a,section,div,span,li,input[type='text'],input[type='button'],tr,button,i").on("click", function(){
		
		if ($(this).hasClass("events-single-location")) { 
			$('.events-single-location iframe').css("pointer-events", "auto");
		}
		
		if ($(this).hasClass("excursions-single-location")) { 
			$('.excursions-single-location iframe').css("pointer-events", "auto");
		}
		
		if ($(this).hasClass("yr-prev")) { 
			$tabs.filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
			return false;
		}
		
		if ($(this).hasClass("yr-next")) { 
			$tabs.filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
			return false;
		}
		
		if ($(this).hasClass("events-load-more")) { 
			$(".events-list .row > div:hidden").slice(0, 4).slideDown();
			if ($(".events-list .row > div:hidden").length === 0) {
				$(".events-load-more").fadeOut('slow');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top-600
			}, 1500);
		}
		
		if ($(this).hasClass("excursions-load-more")) { 
			$(".excursions-list .row > div:hidden").slice(0, 4).slideDown();
			if ($(".excursions-list .row > div:hidden").length === 0) {
				$(".excursions-load-more").fadeOut('slow');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top-600
			}, 1500);
		}
		
		if ($(this).hasClass("teachers-load-more")) { 
			$(".teachers-list .row > div:hidden").slice(0, 4).slideDown();
			if ($(".teachers-list .row > div:hidden").length === 0) {
				$(".teachers-load-more").fadeOut('slow');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top-600
			}, 1500);
		}
		
		if ($(this).hasClass("gallery-load-more")) { 
			$(".gallery-list .container > .row:hidden").slice(0, 1).slideDown();
			if ($(".gallery-list .container > .row:hidden").length === 0) {
				$(".gallery-load-more").fadeOut('slow');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top-200
			}, 1500);
		}
		
		if ($(this).hasClass("academics-load-more")) { 
			$(".academics-content .container > .row:hidden").slice(0, 6).slideDown();
			if ($(".academics-content .container > .row:hidden").length === 0) {
				$(".academics-load-more").fadeOut('slow');
			}
			//alert($("#calendar_rowid_7").offset().top);
			$('html,body').animate({
				scrollTop: $("#calendar_rowid_7").offset().top //$(this).offset().top-calendar_rowid_7  1100
			}, 1500);
		}
		
		if ($(this).hasClass("closecanvas")) { 
			$("body").removeClass("offcanvas-stop-scrolling");
		}
		
		if ($(this).hasClass("play-youtube")) {

			$(".featherlight-close-icon").remove();
			window.setTimeout( 
	        function() {   
	          $(".featherlight-close-icon").remove();
	          $("iframe.featherlight-inner").css("height",(parseInt($("iframe.featherlight-inner").width())/16*8+60)+"px");
	        }, 1000);
		} 
		
		if ($(this).hasClass("fa-search")) {

			window.setTimeout( 
	        function() {   

	        	$("#sekolah_search").focus();
	        }, 2000);
		}
	});
	
	 $('.datepicker').datepicker({
		format: 'mm/dd/yyyy',
		todayHighlight: true,
		autoclose: true
	});

	$('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},2000);
	});  
	  
})(jQuery);