<?php
/*
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.0
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */

function ml_timeline_activation() {
register_activation_hook(__FILE__, 'ml_timeline_activation');
}
function ml_timeline_deactivation() {
register_deactivation_hook(__FILE__, 'ml_timeline_deactivation');
}


add_action( 'wp_enqueue_scripts', 'prefix_enqueue_awesome' );
if ( !function_exists( 'prefix_enqueue_awesome' ) ) {
function prefix_enqueue_awesome() {
$plugins_url = plugins_url();
wp_enqueue_style( 'prefix-new-font-awesome', $plugins_url . '/mlr-timeline/font-awesome-4.0.3/css/font-awesome.min.css', array(), '4.0.3' );
}
}


function ml_insert_timeline($atts, $content=null){
	global $post;
	
	$mlmethod = get_option('mlrg');
	
	if($mlmethod[method] == 'grid') {
		if(!$mlmethod['reverse'] || $mlmethod['reverse'] == '') {
			$order = 'ASC';
			}
		elseif($mlmethod['reverse'] == '1' || $mlmethod['reverse'] == 1) {
			$order = 'DESC';
			}
	} 
	else {
		$order = 'ASC';
		}
 
$ml_timeline_options = shortcode_atts( array (
        'type' => 'post',
		'posts_per_page' => '-1',
        'order' => $order,
        'orderby' => 'date',
        'category_name' => '' 
    ), $atts );	
	
	
		

	$mltimeline = '<div class="timeline-container">';
	
	$mltimeline.= '<div id="timeline">
						<div id="timeline-title"><h2><i class="fa fa-play"></i> ' .$ml_timeline_options['category_name']. '</h2></div>
						<div class="time-increments">
							<div id="small-dates"></div>
						</div>
						<div id="but-container">
					<div id="bleft"><a href="#" id="button-left-end" title="oldest"><i class="fa fa-fast-backward"></i></a><a href="#" id="button-left"><i class="fa fa-backward"></i></a></div>
					<div id="bright"><a href="#" id="button-right"><i class="fa fa-forward"></i></a><a href="#" id="button-right-end"><i class="fa fa-fast-forward"></i></a></div>
						</div>
					</div>
					';
	
	$ml_position_method = get_option('mlrg');
	
	$mltimeline.= '<div class ="timelinediv" data-position="' .$ml_position_method['position']. '">
				
				<ul class="times">';
   
$query = new WP_Query( $ml_timeline_options );



     if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post();

		$ml_title = get_the_title();

		$img_time= get_the_post_thumbnail( $post->ID ,'large-thumb');

		$cap= get_the_excerpt();
		
		$ml_month = get_the_date('m');
		$ml_name_months = array(
						'Jan' => '01', 
						'Feb' => '02', 
						'Mar' => '03', 
						'Apr' => '04',
						'May' => '05',
						'Jun' => '06', 
						'Jul' => '07', 
						'Aug' => '08', 
						'Sep' => '09', 
						'Oct' => '10',
						'Nov' => '11',
						'Dec' => '12'
						);
		$search = array_search($ml_month, $ml_name_months);
				
		$ml_day = get_the_date('j');
		$ml_hour = get_the_date('H');
		$ml_name_hours = array(
						'Midnight' => '00', 
						'1am' => '01',
						'2am' => '02', 
						'3am' => '03', 
						'4am' => '04',
						'5am' => '05',
						'6am' => '06', 
						'7am' => '07', 
						'8am' => '08', 
						'9am' => '09', 
						'10am' => '10',
						'11am' => '11',
						'Noon' => '12',
						'1pm' => '13', 
						'2pm' => '14',
						'3pm' => '15', 
						'4pm' => '16', 
						'5pm' => '17',
						'6pm' => '18',
						'7pm' => '19', 
						'8pm' => '20', 
						'9pm' => '21', 
						'10pm' => '22', 
						'11pm' => '23'
						);
		
		$search_time = array_search($ml_hour, $ml_name_hours);
		
		
		$ml_year = get_the_date('Y');
		$ml_date = get_the_date('d-m-Y');
	
		$ml_link= get_permalink($post->ID);
		$ml_author= get_the_author();
		$ml_get_category = get_the_category_list(', ', $post->ID);
		
		$ml_read_more= '<a href="'. get_permalink($post->ID) . '" class="clear_read" title="more"> '. __( 'Read More','ML' ) .' </a>';
		
		$mltimeline.='<li class="date-node" data-date="' . $ml_date . '" data-day="' .$ml_day. '" data-month="' .$search. '" data-year="' .$ml_year. '" data-title="' .$ml_title. '" data-hour="' .$search_time. '">'; 

		$mltimeline.='<a href="' .$ml_link. '" title="' .$ml_title. '">';

		$mltimeline.='<h2 class="timeline-caption">'.$ml_title.'</h2>';
		
		$mltimeline.=$img_time; 

		$mltimeline.='</a>';
		
		$mltimeline.='<p class="li_body">' .$cap. $ml_read_more. '</p>';
		
		$mltimeline.='<p class="li_meta"><i class="fa fa-calendar-o"></i> ' .$ml_date. ' <i class="fa fa-user"></i> ' .$ml_author.' <i class="fa fa-folder-open"></i> ' .$ml_get_category. '</p>';
		
		$mltimeline.='</li>';

	endwhile; endif; wp_reset_query();

	$mltimeline.= '</ul>
		
		</div>

	</div>';

return $mltimeline;



}



add_shortcode('ml_timeline', 'ml_insert_timeline');


	
?>