<?php


function register_admin_page() {
  add_options_page(
      __( 'Visualize Automations', 'va' ),
      'Visualize Automations',
      'manage_options',
      'visualizeautomation',
      'menu_page'  
  );
}
add_action( 'admin_menu', 'register_admin_page' );

function menu_page(){
  ob_start();
  if (!current_user_can('manage_options')) {
    wp_die('Unauthorized user');
  }

  wp_verify_nonce( 'wpshout_option_page_example_action' );

  if (isset($_POST['api_key'])) {
    $value = $_POST['api_key'];
    update_option('va_api_key', $value);
}
  $value= get_option('va_api_key', 'your api');
  ?>
    <div class="wrap">
    <h1>Add Your Mailchimp Information</h1>
    <form method="POST">
      <div><label>api key</label></div>
      <input type="text" name="api_key" style="width:300px" value=<?php echo '"'. $value.'"';?>>
      <?php wp_nonce_field( 'wpshout_option_page_example_action' ); ?>
      <div style="margin-top:20px;"><input type="submit" class="button button-primary button-large" value="Save"></div>
    </form> 
    </div>
  <?php
  ob_end_flush();
}
