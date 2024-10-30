<?php
/*
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.1
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */

add_action('admin_menu', 'ml_timeline_plugin_settings');
function ml_timeline_plugin_settings() {

	global $ml_timeline_plugin_page;
	$ml_timeline_plugin_page = add_plugins_page(
		'MLR Timeline settings', 
		'MLR Timeline Settings', 
		'administrator', 
		'mlrg', 
		'ml_timeline_plugin_display'
		);
}

function ml_timeline_plugin_help($contextual_help, $screen_id, $screen) {

	global $ml_timeline_plugin_page;
	if ($screen_id == $ml_timeline_plugin_page) {
		$contextual_help = '<h2>' .__('Shortcode Parameters','ML').'</h2>';
		$contextual_help .= '<b>' .__('The standard shortcode','ML').'</b><br />';
		$contextual_help .= '[ml_timeline] will display all posts.<br />';
		$contextual_help .= '<b>' .__('Category Name','ML').'</b><br />';
		$contextual_help .= __('Specify the category-name-slug of the category you would like to display.<br />You can specify as many categories as you want separated with the , delimiter.','ML').'<br />';
		$contextual_help .= __('Example: ','ML'). '[ml_timeline category_name="sweet, savoury"]';
		$contextual_help .= '<h3>' .__('Other Info','ML').'</h3>';
		$contextual_help .= '<b>' .__('Grid Scroll Setup','ML').'</b><br />';
		$contextual_help .= __('The Grid Scroll method needs / enqueues a more recent version of jquery-masonry which may alter the display of plugins using the default version of masonry included in Wordpress.','ML').'<br />';
		$contextual_help .= __('This does not mean that the plugins using the default Wordpress version of masonry won\'t work but there are a few differences in the parameters used to define the masonry grid which might affect the layout.','ML').'<br />';
		$contextual_help .= __('Example: The "gutterWidth" parameter, which spaces the blocks in the grid in the default version, if set should be changed to "gutter" to comply with the newer version.','ML').'<br />';
		$contextual_help .= __('For more info about masonry go to the masonry website: ','ML'). '<a href="http://masonry.desandro.com/" target="_blank" title="opens in new window">http://masonry.desandro.com/</a><br />';
	}
	return $contextual_help;
}

add_filter('contextual_help', 'ml_timeline_plugin_help', 10, 3);

function ml_timeline_plugin_display() { ?>
<div class="wrap">
	<div id="ml_icon" class="pretty_icon"></div>
	<h2>MLR Timeline Options</h2>

<?php settings_errors(); ?> 

<form method="post" action="options.php">
<?php settings_fields('mlrg'); ?>
<?php do_settings_sections('mlrg'); ?>
<?php submit_button(); ?>
</form>


</div><!----End Wrap---->

<?php }  // End plugin display


//== Register section ==//
add_action( 'admin_init', 'ml_timeline_options_mlsettings' );

function ml_timeline_default_select_setting() {
	array(
		'method' => 'default'
		);
	}

function ml_timeline_options_mlsettings() {
if(false == get_option('mlrg')) {
	add_option('mlrg',apply_filters( 'ml_timeline_default_select_setting', ml_timeline_default_select_setting() ) );
	} //endif

//== Add our one and only section ==//
add_settings_section(
	'mlrg_general_section', //ID
	__('Options','mlrg'),	//Name
	'ml_timeline_options_callback',		//Callback funtion for description purposes
	'mlrg'					//Page to add section to
	);
				
//== Add our settings field to be included in our section ==//
add_settings_field(
	'select_display_method',			//ID
	__('Choose Display','mlrg'),		//Name of field renders left
	'ml_timeline_select_display_method_callback',	//Callback function renders actual field
	'mlrg',								//Page to add field to
	'mlrg_general_section'				//Section field renders in
	);


//== Add our settings field to be included in our section ==//

add_settings_field(
	'select_reverse_method',			//ID
	__('Reverse Timeline?','mlrg'),		//Name of field renders left
	'ml_timeline_reverse_callback',	//Callback function renders actual field
	'mlrg',								//Page to add field to
	'mlrg_general_section'				//Section field renders in
	);
	
	
//== Add our settings field to be included in our section ==//
add_settings_field(
	'select_position_method',			//ID
	__('Initialise timeline where?','mlrg'),		//Name of field renders left
	'ml_timeline_select_position_method_callback',	//Callback function renders actual field
	'mlrg',								//Page to add field to
	'mlrg_general_section'				//Section field renders in
	);

	



//== Register our settings ==//
register_setting(
	'mlrg',
	'mlrg'
	);
	
}

//== Section Callback ==//
function ml_timeline_options_callback() {
	echo '<p>'.__('Your options for the Timeline.','ML').'</p>';
	}

	
//== Callback function for the display method field ==//
function ml_timeline_select_display_method_callback() {
	$options = get_option( 'mlrg' );
        
        $html = '<select id="method" name="mlrg[method]">';
                $html .= '<option value="default">' . __( 'Which display for the timeline...', 'mlrg' ) . '</option>';
                $html .= '<option value="normal"' . selected( $options['method'], 'normal', false) . '>' . __( 'Normal', 'mlrg' ) . '</option>';
                $html .= '<option value="alternative"' . selected( $options['method'], 'alternative', false) . '>' . __( 'Alternative', 'mlrg' ) . '</option>'; 
				$html .= '<option value="rotary"' . selected( $options['method'], 'rotary', false) . '>' . __( 'Rotary', 'mlrg' ) . '</option>';
				$html .= '<option value="hybrid"' . selected( $options['method'], 'hybrid', false) . '>' . __( 'Hybrid', 'mlrg' ) . '</option>';
				$html .= '<option value="grid"' . selected( $options['method'], 'grid', false) . '>' . __( 'Grid Scroll', 'mlrg' ) . '</option>';
				$html .= '</select>';
				$html .= '<label id="ml_message" style="margin-left:10px; cursor:default;">Will initialise at the beginning.</label>';
		echo $html;

}

//== Callback function for the position method field ==//
function ml_timeline_select_position_method_callback() {
	$options = get_option( 'mlrg' );
        
        $html = '<select id="position" name="mlrg[position]">';
                $html .= '<option value="default">' . __( 'Which position for the timeline...', 'mlrg' ) . '</option>';
                $html .= '<option value="oldest"' . selected( $options['position'], 'oldest', false) . '>' . __( 'Beginning', 'mlrg' ) . '</option>';
                $html .= '<option value="most_recent"' . selected( $options['position'], 'most_recent', false) . '>' . __( 'End', 'mlrg' ) . '</option>'; 
				$html .= '</select>';
		echo $html;

}

function ml_timeline_reverse_callback() {
	
	$options = get_option( 'mlrg' );
	
	$html = '<input type="checkbox" id="reverse" name="mlrg[reverse]" value="1"' . checked( 1, $options['reverse'], false ) . '/>';
	$html .= '&nbsp;';
	$html .= '<label for="reverse" style="margin-left:10px;">Timeline runs Newest &#8594; Oldest</label>';
	
	echo $html;
	
}


 ?>