/*
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.3
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */

jQuery(document).ready(function($){

	// Function: Parse the Date

	function parseDate(str) {
if(typeof(str) !== 'undefined') {
		var mdy = str.split('-')

		return new Date(mdy[2], mdy[1]-1, mdy[0]);
}
		}

    // Function: Find the amount of days in between the two dates

	function daydiff(first, second) {

		return (second-first)/(1000*60*60*24)

	}

	function yeardiff(first, second) {

		return (second-first)/(1000*60*60*24*365)

		}	

	

	// Assign the amount of days to a var

	var size = $('.times li').length - 1;

	// Find start date

     var startDate = parseDate($('li:first','.times').attr('data-date'));

	// Add start year to timeline

	// $('div.time-increments').append('<ul class="time-increment" id="' + startDate.getFullYear() + '" style="width:auto; height:auto;"><p class="pyear">' + startDate.getFullYear() + '</p></div>' );
	// Find end date

    var endDate = parseDate($('.times li:eq(' + size + ')').attr('data-date'));
	var endTitle = $('.times li:eq(0)').attr('data-title');

	// Extras not used 

	 var getYearDiff = yeardiff(startDate, endDate);

	// $('.datep').html(endDate.getFullYear());
	
	

	



// Set up Increment Markers

	var incMarkers;



    // Determine the marker increments

    // If the amount of days is less than 31...

	if(getYearDiff < 10){

        // ... Show each day as a marker increment

		var incMarkers = 1;

		var totalMarkers = getYearDiff;

    // If the amount of days is greater than 31...

	} else if(getYearDiff >= 10) {

        // ... Show markers as every 7 days

		var incMarkers = 1;

		var totalMarkers = getYearDiff;

	}



    // Function: Round the markers to the nearest decimal

	function roundNum(num,decimals){

		return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);

	}

    

    function ordinal(num){

        if (num % 10 == 1 && num != 11) return num + 'st';

        if (num % 10 == 2 && num != 12) return num + 'nd';

		if (num % 10 == 3 && num != 13) return num + 'rd';

        return num + 'th';

    }



    // Assign the rounded number of markers to a var (last argument is 0 which means no decimal places)

	var roundedIncs = roundNum(totalMarkers,0);



    // Determine the spacing percentage

	var spacingPercent = 100/roundedIncs;

	var monthSpacing = 100/12;

    // Log the end result to the console

	console.log('Total Increments: ' + roundedIncs + '. Increments of: ' + incMarkers);

$('.datee').html(roundedIncs);

    

	// Insert each timeline marker

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var markerDate = startDate;

	var monthMarker = 0;

	

	for(var i = 1; i <= roundedIncs; i++) {

		if(getYearDiff < 10){

            markerDate.setDate(markerDate.getDate()+365);

		} else if(getYearDiff >= 10) {

			markerDate.setDate(markerDate.getDate()+365);

		}
		}
		
	// Find start date depending on options
	if($('.timelinediv').attr('data-position') == 'oldest' || !!$('.timelinediv').attr('data-position')) {
		var startDate = parseDate($('li:first','.times').attr('data-date'));
		var altStartDate = $('li:first','.times').attr('data-month');
		
		var startTitle = $('li:eq(1)','.times').attr('data-title');
		var startEndTitle = $('li:last','.times').attr('data-title');
	}
	if($('.timelinediv').attr('data-position') == 'most_recent') {
		var startDate = parseDate($('li:last','.times').attr('data-date'));
		var altStartDate = $('li:last','.times').attr('data-month');	
	}
	
	var parent_div_width = roundNum($('.timeline-container').width(),2);
	console.log('parent div width = ' + parent_div_width);
	var margin_half = roundNum((parent_div_width / 2),2);
	
	

	// Append extra div for year and month
	
	$('<div id="dates_left"></div>').insertBefore($('.time-increments'));

	
	
	// Add start year and month to timeline
if(typeof(str) !== 'undefined' || typeof(startDate) !== 'undefined') {
	$('div#dates_left').prepend('<div class="year-increment" id="' + startDate.getFullYear() + '" style="width:auto; height:auto;"><p class="pyear">' + startDate.getFullYear() + '</p></div>' );
	$('div#dates_left').append('<div class="month-increment" id="' + altStartDate + '" style="width:auto; height:auto;"><p class="pmonth">' + altStartDate + '</p></div>' );

	var yearWidth = $('div.year-increment').width();
	var initDatesCenter = margin_half - yearWidth;
	console.log(yearWidth);
	$('div#dates_left').css({'margin-left':''+initDatesCenter+'px'});
	$('#button-right').attr('title', startTitle);
	$('#button-right-end').attr('title', startEndTitle);
	
	
	

	//== Add a post marker for each date (day & time) as an <li> element ==//

    var i=0;
	
	
	$('.time-increments').append('<ul id="day_list"></ul>').css({'margin-left':''+margin_half+'px'});
		console.log(margin_half);
	var postMarker = startDate;

    $('li', '.times').each(function(){

        $('.time-increments #day_list').append('<li class="post-marker" id="' + $(this).attr('data-date') +'" data-date="'+$(this).attr('data-date')+'" data-hour="' +$(this).attr('data-hour')+'" title="@ ' + $(this).attr('data-hour') + '" style="width:' +margin_half+ 'px;"><p class="pday">'+ordinal($(this).attr('data-day'))+'</p></li>');

        i++;

    });
	
	$('.time-increments #day_list li:first').css({'left':0 + 'px'});
	
	var scrollWidth = $('.post-marker').outerWidth();
	console.log(scrollWidth);
	

    

		//== Simple scrolling marginLeft with previous and next buttons ==//		

		

	//== Function to show arrows or not depending on the VALUES of the margin css ==//

	function scrollArrowShow() {

	var x = $('.time-increments').css('left');

	var maxScroll = $('.timeline-container').width() - $('.time-increments').width();

        if (parseInt(x) >= -5) {

            $('#button-left, #button-left-end').css({visibility: 'hidden'});

        }else{

            $('#button-left, #button-left-end').css({visibility: 'visible'});

        }

        if (parseInt(x) < maxScroll) {

            $('#button-right, #button-right-end').css({visibility: 'hidden'});	

        }else{

            $('#button-right, #button-right-end').css({visibility: 'visible'});

        }

    }
	
	
	//== Function to find data from each post item depending on it's position in the list (count) ==//
	
	function countShowDetails() {
		if((count == parseInt(size) + 1) || (count == -1)) {
			$('.year-increment').empty(); 
			$('.month-increment').empty().append('<p class="pmonth" style="margin:60px 0 0 -20px;">You are out of time.</p><p class="phour">Please go back</p>');
			}
		else {
		// var listDetailYear = $('ul#day_list li').eq(count).attr('id');
		
		var listDetailYear = $('ul.times li').eq(count).attr('data-year');
		var listDetailMonth = $('ul.times li').eq(count).attr('data-month');
		
		if(listDetailYear != $('.year-increment').text()) {
			var newDetailYear = listDetailYear; 
			$('.year-increment').fadeOut(20).empty().append('<p class="pyear">' +newDetailYear+ '</p>').fadeIn(2000);
			}
		if(listDetailMonth != $('.month-increment').text()) {
			var newDetailMonth = listDetailMonth; 
			$('.month-increment').fadeOut(20).empty().append('<p class="pmonth">' +newDetailMonth+ '</p>').fadeIn(1000);
			}
		
		
		
		
		}
	}
	
	

	var completeWidth = $('.time-increments').width() - ($('.timeline-container').width() - margin_half);
	
	//================= Initialise margin at the start depending on options =================//
		
		if($('.timelinediv').attr('data-position') == 'oldest' || !!$('.timelinediv').attr('data-position')) {
		$('.time-increments').css({'left':'0px'});
		
		//== Hide left button at start ==//
		$('#bleft').css({visibility: 'hidden'});
		
		//== Hide right button at start if the time-increments div is smaller than the timeline div ==// 

		if ($('.time-increments').width() <= $('#timeline').parent().width()) {

			$('#bright').css({visibility: 'hidden'});

			} else {

			$('#bright').css({visibility: 'visible'});

			}
		var count = 0;
		console.log(count);
		}
		
		if($('.timelinediv').attr('data-position') == 'most_recent') {
		$('.time-increments').css({'left':'-'+ completeWidth + 'px'});
		$('#bleft').css({visibility: 'visible'});
		var lastInList = $('.times li.date-node:last');
		
		
		lastInList.show();
		
		//== Hide right button at start ==//
		
		$('#bright').css({visibility: 'hidden'});
		
		var count = size;
		console.log(count);
		}
		
		
		//== Add attribute target blank to all a elements in timelinediv ==//
	
		$('.timelinediv a[href^="http://"]').attr('target','_blank');
	
	
		//== Initialise css for li count element ==//
		$('.post-marker','#day_list').css({'opacity':'0'});	
		$('.post-marker').eq(count).addClass('active').css({'opacity':'1'});
		$('.date-node','ul.times').css({'opacity':'0'});
		$('ul.times li.date-node').eq(count).addClass('active').css({'opacity':'1'});
		$('.times .active').css({'z-index':'50','position':'relative'});
	
	
	//============================ Button Events ============================//

	//== End Right Button event ==//

	$('#button-right-end').click(function(event) {

      event.preventDefault();
	  if(!$('#timeline .time-increments').is(':animated')) {
	  $('.times .active').css({'z-index':'','position':'absolute'});
		$('.post-marker').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 1500);
		$('.date-node').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 500);
					
            $('.time-increments').stop().animate({

                left: "-" + completeWidth + "px"

            }, 2000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());

                scrollArrowShow();

            });
		count = size;
		console.log(count);
		countShowDetails();
		countShowTitles();
		$('.post-marker').eq(count).addClass('active').animate({
					'opacity':'1'
					}, 1000);
		$('.date-node').eq(count).addClass('active').stop().animate({
					'opacity':'1'
					}, 1000);
					$('.times .active').css({'z-index':'50','position':'relative'});
        }

        });

		

	//== End Left Button event ==//

	$('#button-left-end').click(function(event) {
		
      event.preventDefault();
	  if(!$('#timeline .time-increments').is(':animated')) {
	  $('.times .active').css({'z-index':'','position':'absolute'});
			$('.post-marker').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 1000);
			$('.date-node').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 500);
					
            $('.time-increments').stop().animate({

                left: 0 + "px"

            }, 2000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());

                scrollArrowShow();
			
            });
		count = 0;
		console.log(count);
		countShowDetails();
		countShowTitles();
		$('.post-marker').eq(count).addClass('active').animate({
					'opacity':'1'
					}, 1000);
		$('.date-node').eq(count).addClass('active').animate({
					'opacity':'1'
					}, 1000);
					$('.times .active').css({'z-index':'50','position':'relative'});
        }

        });

	



	//== Right Button event ==//

	$('#button-right').click(function(event) {

      event.preventDefault();
	  if(!$('#timeline .time-increments').is(':animated')) {
	  $('.times .active').css({'z-index':'','position':'absolute'});
	  $('.post-marker').eq(count).removeClass('active').stop().animate({
				'opacity':'0'
					}, 1000);
					
		
		$('.date-node').eq(count).removeClass('active').stop().animate({
				'opacity':'0'
					}, 500);
					
	  
			
			$('#timeline .time-increments').stop().animate({

                left: "-=" +scrollWidth+"px"

            }, 1000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());

                scrollArrowShow();

            });
		
        count++;
		console.log(count);
		countShowDetails();
		countShowTitles();
		$('.post-marker').eq(count).addClass('active').stop().animate({
					'opacity':'1'
					}, 1000);
		$('.date-node').eq(count).addClass('active').stop().animate({
					'opacity':'1'
					}, 1000);
					$('.times .active').css({'z-index':'50','position':'relative'});
		}

        });

	

	//== Left Button Event ==//

	$('#button-left').click(function(event) {

      event.preventDefault();
	  if(!$('#timeline .time-increments').is(':animated')) {
	  $('.times .active').css({'z-index':'','position':'absolute'});
	 $('.post-marker').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 1000);
		$('.date-node').eq(count).removeClass('active').animate({
				'opacity':'0'
					}, 500); 
	  
			
            $('#timeline .time-increments').stop().animate({

                left: "+=" +scrollWidth+"px"

            }, 1000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());

                scrollArrowShow();

            });
		
		count--;
		console.log(count);
		countShowDetails();
		countShowTitles();
		$('.post-marker').eq(count).addClass('active').animate({
					'opacity':'1'
					}, 1000);
		$('.date-node').eq(count).addClass('active').stop().animate({
					'opacity':'1'
					}, 1000);
					$('.times .active').css({'z-index':'50','position':'relative'});
        }

        });

		function countShowTitles() {
		if(count < 0) {
		
		var endedTitle = $('.times li:first').attr('data-title');
		$('#button-right').attr('title', endedTitle);
		}
		else if(count > parseInt(size)) {
		var startEndedTitle = $('.times li:last').attr('data-title');
		$('#button-left').attr('title', startEndedTitle);
		}
		else {
		$('#button-left-end').attr('title', endTitle);
		$('#button-right-end').attr('title', startEndTitle);
		
		var prevTitle = $('ul.times li').eq(count - 1).attr('data-title');
		var nextTitle = $('ul.times li').eq(count + 1).attr('data-title');
		
		$('#button-right').attr('title', nextTitle);
		$('#button-left').attr('title', prevTitle);
		
		}
		
	}

} // End of type of

});