/*
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.1
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
	
	// Find end date

    var endDate = parseDate($('.times li:eq(' + size + ')').attr('data-date'));
	var endTitle = $('.times li:eq(0)').attr('data-title');

	// Extras not used 

	var getYearDiff = yeardiff(startDate, endDate);
if(typeof(str) !== 'undefined' || typeof(endDate) !== 'undefined') {
	$('.datep').html(endDate.getFullYear());
	
	// Initialise list element width
	
	var impDiv = $('.timelinediv').parent().width();
	$('.timelinediv').width(impDiv);
	$('ul.times li').width(impDiv - 20);
	console.log(impDiv);
	

	



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
	
	var listLen = $('ul.times li').length -1;
	console.log(listLen);
	
	// Find start date depending on options
	if($('.timelinediv').attr('data-position') == 'oldest' || !!$('.timelinediv').attr('data-position')) {
		var startDate = parseDate($('li:first','.times').attr('data-date'));
		var altStartDate = $('li:first','.times').attr('data-month');
		var startDay = $('li:first','.times').attr('data-day');
		var startHour = $('li:first','.times').attr('data-hour');
		var startTitle = $('li:eq(1)','.times').attr('data-title');
		var startEndTitle = $('li:last','.times').attr('data-title');
	}
	if($('.timelinediv').attr('data-position') == 'most_recent') {
		var startDate = parseDate($('li:last','.times').attr('data-date'));
		var altStartDate = $('li:last','.times').attr('data-month');
		var startDay = $('li:last','.times').attr('data-day');
		var startHour = $('li:last','.times').attr('data-hour');	
	}

	var marginHalf = (($('div.time-increments').width()) / 2) - 60;
	// Add start dates to timeline

	$('div.time-increments').prepend('<div class="year-increment" id="' + startDate.getFullYear() + '" style="width:auto; height:auto;"><p class="pyear">' + startDate.getFullYear() + '</p></div>' );
	$('div#small-dates').append('<div class="month-increment" id="' + altStartDate + '" style="width:auto; height:auto;"><p class="pmonth">' + altStartDate + '</p></div>' );
	$('div#small-dates').append('<div class="day-increment" id="' + startDay + '" style="width:auto; height:auto;"><p class="pday">' + ordinal(startDay) + '</p></div>' );
	$('div#small-dates').append('<div class="ml-time-increment" id="' + startHour + '" style="width:auto; height:auto;"><p class="phour">@ ' + startHour + '</p></div>' );
	
	$('div#small-dates').css({'margin-left':''+marginHalf+'px'});

	$('#button-right').attr('title', startTitle);
	$('#button-right-end').attr('title', startEndTitle);
	
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

		//== Simple scrolling marginLeft with previous and next buttons ==//

		

		
		

	//== Function to show arrows or not depending on the VALUES of the margin css ==//
	
	function scrollArrowShow() {
	
	
	var x = $('.times').css('left');
		var maxScroll = $('.timelinediv').width() - $('.times').width();
	
	
        if (parseInt(x) >= 0) {

            $('#button-left, #button-left-end').css({visibility: 'hidden'});

        }else{

            $('#button-left, #button-left-end').css({visibility: 'visible'});

        }

        if (parseInt(x) <= maxScroll) {

            $('#button-right, #button-right-end').css({visibility: 'hidden'});	

        }else{

            $('#button-right, #button-right-end').css({visibility: 'visible'});

        }
		
    }
	
	
	
	//== Function to find data from each post item depending on it's position in the list (count) ==//
	
	function countShowDetails() {
		if((count == parseInt(listLen) + 1) || (count == -1)) {
			$('.year-increment, .month-increment, .ml-time-increment').empty(); 
			$('.day-increment').empty().append('<p class="pmonth" style="margin:60px 0 0 -20px;">You are out of time.</p><p class="phour">Please go back</p>');
			}
		else {
		var listDetailYear = $('ul.times li').eq(count).attr('data-year');
		var listDetailMonth = $('ul.times li').eq(count).attr('data-month');
		var listDetailDay = $('ul.times li').eq(count).attr('data-day');
		var listDetailHour = $('ul.times li').eq(count).attr('data-hour');
		
		if(listDetailYear != $('.year-increment').text()) {
			var newDetailYear = listDetailYear; 
			$('.year-increment').fadeOut(20).empty().append('<p class="pyear">' +newDetailYear+ '</p>').fadeIn(2000);
			}
		if(listDetailMonth != $('.month-increment').text()) {
			var newDetailMonth = listDetailMonth; 
			$('.month-increment').fadeOut(20).empty().append('<p class="pmonth">' +newDetailMonth+ '</p>').fadeIn(1000);
			}
		if(listDetailDay != $('.day-increment').text()) {
			var newDetailDay = ordinal(listDetailDay); 
			$('.day-increment').fadeOut(20).empty().append('<p class="pday">' +newDetailDay+ '</p>').fadeIn(1000);
			}
		if(listDetailHour != $('.ml-time-increment').text()) {
			var newDetailHour = listDetailHour; 
			$('.ml-time-increment').fadeOut(20).empty().append('<p class="phour">@ ' +newDetailHour+ '</p>').fadeIn(700);
			}
		}
	}
		
	
	
	
	var completeWidth = $('.times').width() - $('.timelinediv').width();
	
	//================= Initialise margin at the start depending on options =================//
		
		if($('.timelinediv').attr('data-position') == 'oldest' || !!$('.timelinediv').attr('data-position')) {
		$('.times').css({'left':'0px'});
		
		//== Hide left button at start ==//
		$('#bleft').css({visibility: 'hidden'});
		
		//== Hide right button at start if the time-increments div is smaller than the timeline div ==// 

		if ($('.times').width() <= $('.timelinediv').parent().width()) {

			$('#bright').css({visibility: 'hidden'});

			} else {

			$('#bright').css({visibility: 'visible'});

			}
		
		var count = 0;
		}
		
		if($('.timelinediv').attr('data-position') == 'most_recent') {
		$('.times').css({'left':'-'+ completeWidth + 'px'});
		$('#bleft').css({visibility: 'visible'});
		
		//== Hide right button at start ==//
		
		$('#bright').css({visibility: 'hidden'});
		
		var count = listLen;
		console.log(count);
		}
		
	//== Add attribute target blank to all a elements in timelinediv ==//
	
	$('.timelinediv a[href^="http://"]').attr('target','_blank');
	
	
	//============================ Button Events ============================//

	//== End Right Button event ==//

	$('#button-right-end').click(function(event) {

      event.preventDefault();
			if(!$('.times').is(':animated')) {
            $('.times').stop().animate({

                left: "-" + completeWidth + "px"

            }, 2000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());
				
                scrollArrowShow();
				
            });
       
	count = parseInt(listLen);
	console.log(count);
	countShowDetails();
	countShowTitles();	
	}
        });

		

	//== End Right Button event ==//

	$('#button-left-end').click(function(event) {

      event.preventDefault();
			if(!$('.times').is(':animated')) {
            $('.times').stop().animate({

                left: 0 + "px"

            }, 2000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());
			
                scrollArrowShow();
				
            });

        
	count = 0;
	console.log(count);
	countShowDetails();
	countShowTitles();
		}
        });

	



	//== Right Button event ==//

	$('#button-right').on('click', function(event) {

      event.preventDefault();
			if(!$('.times').is(':animated')) {
            $('.times').stop().animate({

                left: "-=" + impDiv + "px"

            }, 1000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());
				
                scrollArrowShow();
				
            });
		
        
	count++;
	console.log(count);
	countShowDetails();
	countShowTitles();
		}
        });

	

	//== Left Button Event ==//

	$('#button-left').on('click', function(event) {

      event.preventDefault();
			if(!$('.times').is(':animated')) {
            $('.times').stop().animate({

                left: "+=" +impDiv + "px"

            }, 1000, function(){

                // createCookie('scrollPos', $('#slide-wrap').scrollLeft());
				
                scrollArrowShow();
				
            });
		
        
	count--;
	console.log(count);
	countShowDetails();
	countShowTitles();
	}	
        });

	function countShowTitles() {
		if(count < 0) {
		var endedTitle = $('.times li:first').attr('data-title');
		$('#button-right').attr('title', endedTitle);
		}
		else if(count > parseInt(listLen)) {
		var startEndedTitle = $('.times li:last').attr('data-title');
		$('#button-left').attr('title', startEndedTitle);
		}
		else {
		var prevTitle = $('ul.times li').eq(count - 1).attr('data-title');
		var nextTitle = $('ul.times li').eq(count + 1).attr('data-title');
		
		$('#button-right').attr('title', nextTitle);
		$('#button-left').attr('title', prevTitle);
		$('#button-left-end').attr('title', endTitle);
		$('#button-right-end').attr('title', startEndTitle);
		}
	}

	
} // End type of
});