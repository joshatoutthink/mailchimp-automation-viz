<?php

class Visualize_Automations {
  public function __construct() {
    $this->load_dependencies();
  }
  private function load_dependencies(){
    include_once(plugin_dir_path(dirname( __FILE__) ) . 'includes/enqueue_scripts.php');
    include_once(plugin_dir_path(dirname( __FILE__) ) . 'includes/pages/settings/admin-settings.php');
    include_once(plugin_dir_path(dirname( __FILE__) ) . 'includes/pages/dashboard/visual-dashboard-widget.php');
    include_once(plugin_dir_path(dirname( __FILE__) ) . 'includes/pages/visual/visual-admin-page.php');
  }
}

new Visualize_Automations();