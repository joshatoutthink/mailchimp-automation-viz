<?php

/**
 * Plugin Name: Visualize automations for mailchimp
 * Description: visualize your automations
 * Author: 
 * Author URI: 
 * Version: 0.1
 * Plugin URI: 
 */

define( 'PLUGIN_NAME_VERSION', '1.0.0' );  


function va_setup(){
  require plugin_dir_path( __FILE__ ) . 'includes/class-visualize-automations.php';
}
add_action('plugins_loaded', 'va_setup',10,0);