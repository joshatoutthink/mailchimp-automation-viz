<?php
/**
 * this is for the Automation Visualizer dashboard
 * loads the js and css just for this page
 */
function load_custom_wp_admin_settings_style($hook) {

  if($hook != 'index.php') {
          return;
  }
  
  wp_enqueue_style( 'va_widget_styles', plugin_dir_url( dirname(__FILE__) ) . 'dist/dashboard.css');
  wp_enqueue_script( 'va_widget_js', plugin_dir_url( dirname(__FILE__) ) . 'dist/dashboard.js', array('admin-widgets'), true );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_settings_style',0, 100 );


/**
 * this is for the Automation Visualizer Plugin page
 * loads the js and css just for this page
 */
function load_custom_wp_admin_page_style($hook) {

  if($hook != "toplevel_page_mailchimp-automations") {
          return;
  }
  
  wp_enqueue_style( 'va_page_styles', plugin_dir_url( dirname(__FILE__) ) . 'dist/visual.css');
  wp_enqueue_script( 'va_page_js', plugin_dir_url( dirname(__FILE__) ) . 'dist/visual.js',  true );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_page_style',0, 100 );