/*
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.4
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */

jQuery(document).ready(function($) {

		if($('.form-table #method option:selected').val() == 'grid'){
			$('#position').prop('disabled', 'disabled');
			}
		if($('.form-table #method option:selected').val() != 'grid'){
			$('#ml_message').hide();
			$('#reverse').closest('tr').hide();
			}
			

	$('#method').change(function(){
		if ($('.form-table #method option:selected').val() == 'grid'){		
			$('#ml_message').fadeIn(500);
			$('#position').prop('disabled', 'disabled');
			$('#reverse').closest('tr').fadeIn(500);
			}
			else {
			$('#ml_message').fadeOut(500);
			$('#position').prop('disabled', false);
			$('#reverse').closest('tr').fadeOut(500);
			}
		});
		
		var selectField = $("#method");
		var gridField = $("#ml_message");
		var gridInit = $('#reverse').closest('tr');
		var handle = setInterval(watchForChange, 250); // Every quarter second
		function watchForChange() {
			gridField.toggle(selectField.val() === "grid");
			gridInit.toggle(selectField.val() === "grid");
			}
		
		clearInterval(handle);
		handle = 0;
		
	});
		
			