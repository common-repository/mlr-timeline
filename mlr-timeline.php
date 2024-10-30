<?php
/**
 * Plugin Name: MLR Timeline
 * Plugin URI: http://matthewlillistone.co.uk/
 * Description: This plugin displays a horizontal timeline of posts in your page/post..
 * Version: 1.4
 * Author: Matthew Lillistone
 * Author URI: http://matthewlillistone.co.uk
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU 
 * General Public License as published by the Free Software Foundation; either version 2 of the License, 
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 *
 * @package   MLRTimeline
 * @version   1.4
 * @since     1.1
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * @copyright Copyright (c) 2012 - 2013, Matthew Lillistone
 * @link      http://matthewlillistone.co.uk
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

/**
 * Sets up the ML Timeline plugin.
 *
 * @since  1.1
 */
final class MLR_Timeline_Plugin {

        /**
         * Holds the instance of this class.
         *
         * @since  1.1
         * @access private
         * @var    object
         */
        private static $instance;

        /**
         * Stores the directory path for this plugin.
         *
         * @since  1.1
         * @access private
         * @var    string
         */
        private $directory_path;

        /**
         * Stores the directory URI for this plugin.
         *
         * @since  1.1
         * @access private
         * @var    string
         */
        private $directory_uri;

        /**
         * Plugin setup.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function __construct() {

                /* Set the properties needed by the plugin. */
                add_action( 'plugins_loaded', array( $this, 'setup' ), 1 );

                /* Internationalize the text strings used. */
                add_action( 'plugins_loaded', array( $this, 'i18n' ), 2 );

                /* Load the functions files. */
                add_action( 'plugins_loaded', array( $this, 'includes' ), 3 );

                /* Load the admin files. */
                add_action( 'plugins_loaded', array( $this, 'admin' ), 4 );

                /* Enqueue scripts and styles. */
                add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 15 );
				
				/* Enqueue general admin script. */
				add_action( 'admin_init', array( $this, 'enqueue_admin_scripts' ), 5 );
        }

        /**
         * Defines the directory path and URI for the plugin.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function setup() {
                $this->directory_path = trailingslashit( plugin_dir_path( __FILE__ ) );
                $this->directory_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

                /* Legacy */
                define( 'MLR_TIMELINE_DIR', $this->directory_path );
                define( 'MLR_TIMELINE_URI', $this->directory_uri  );
        }

        /**
         * Loads the initial files needed by the plugin.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function includes() {

                require_once( "{$this->directory_path}inc/timeline.php"         );
        }

        /**
         * Loads the translation files.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function i18n() {

                /* Load the translation of the plugin. */
                load_plugin_textdomain( 'mlr-timeline', false, 'mlr-timeline/languages' );
        }

        /**
         * Loads the admin functions and files.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function admin() {

                if ( is_admin() )
                        require_once( "{$this->directory_path}inc/options.php" );
        }

        /**
         * Enqueues scripts and styles on the front end.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function enqueue_scripts() {
		
			

			$mlmethod = get_option('mlrg');
			
			if( $mlmethod['method'] == 'normal' ) { 
				wp_enqueue_script( 'jquery-normal-timeline', "{$this->directory_uri}js/jquery-ml-timeline1.js", array('jquery'), '1.4', true );
				wp_enqueue_style( 'ml-normal-style', "{$this->directory_uri}css/ml_timeline_css.css", false, '1.4', 'all' );
				}	
			elseif( $mlmethod['method'] == 'alternative' ) {
				wp_enqueue_script( 'jquery-alternative-timeline', "{$this->directory_uri}js/jquery-ml-timeline2.js", array('jquery'), '1.4', true );
				wp_enqueue_style( 'ml-alternative-style', "{$this->directory_uri}css/ml_timeline_alt_css.css", false, '1.4', 'all' );
				}
			elseif( $mlmethod['method'] == 'rotary' ) {
				wp_enqueue_script( 'jquery-rotary-timeline', "{$this->directory_uri}js/jquery-ml-timeline3.js", array('jquery'), '1.4', true );
				wp_enqueue_style( 'ml-rotary-style', "{$this->directory_uri}css/ml_timeline_rotary_css.css", false, '1.4', 'all' );
				}
			elseif( $mlmethod['method'] == 'hybrid' ) {
				wp_enqueue_script( 'jquery-hybrid-timeline', "{$this->directory_uri}js/jquery-ml-timeline4.js", array('jquery'), '1.4', true );
				wp_enqueue_style( 'ml-hybrid-style', "{$this->directory_uri}css/ml_timeline_hybrid.css", false, '1.4', 'all' );
				}
			elseif( $mlmethod['method'] == 'grid' ) {
				wp_enqueue_script( 'jquery-images-timeline', "{$this->directory_uri}js/jquery-ml-timeline5.js", array('jquery'), '1.4', true );				
				wp_enqueue_script( 'jquery-ml-init-masonry', "{$this->directory_uri}js/jquery.masonry.min.js", array('jquery'), '3.1.1', true );
				wp_enqueue_style( 'ml-images-style', "{$this->directory_uri}css/ml_timeline_images.css", false, '1.4', 'all' );
				}
            else { 
				wp_enqueue_script( 'jquery-normal-timeline', "{$this->directory_uri}js/jquery-ml-timeline1.js", array('jquery'), '1.4', true );
				wp_enqueue_style( 'ml-normal-style', "{$this->directory_uri}css/ml_timeline_css.css", false, '1.4', 'all' );
				}
        }
		
		/**
         * Enqueues admin scripts and styles on the front end.
         *
         * @since  1.1
         * @access public
         * @return void
         */
		 
		public function enqueue_admin_scripts() {
				wp_enqueue_script( 'jquery-general-timeline', "{$this->directory_uri}js/jquery.general.js", array('jquery'), '1.4', false );
		}
				
        /**
         * Returns the instance.
         *
         * @since  1.1
         * @access public
         * @return object
         */
        public static function get_instance() {

                if ( !self::$instance )
                        self::$instance = new self;

                return self::$instance;
        }
}

MLR_Timeline_Plugin::get_instance();

?>