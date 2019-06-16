<?php


use \DrewM\MailChimp\MailChimp; 



//adds stuff to wp-admin dashboard
function add_custom_dashboard_widgets() {

  wp_add_dashboard_widget(
               'visualize_automations_widget', // Widget slug.
               'Visualize Your Mailchimp Automations', // Title.
               'custom_dashboard_widget_content' // Display function.
      );
}

add_action( 'wp_dashboard_setup', 'add_custom_dashboard_widgets' );


//Create the function to output the contents of your Dashboard Widget.
function custom_dashboard_widget_content() {
  $api_key=get_option('va_api_key');
  $MailChimp = new MailChimp( $api_key );

  $automations = $MailChimp->get('/automations')['automations'];
  
  //sorts buy status of automation
  //this may not be necessary depends if you want sending>paused>saved
  function cmp_status($a, $b){
    if($a['status'] == $b['status']){
      return 0;
    }
    if($a['status']=='sending'){
      return -1;
    }
    if($b['status']=='sending'){
      return 1;
    }
    if($a['status']=='paused' and $b['status']== 'save'){
      return -1;
    }
    if($a['status']=='save' and $b['status']== 'paused'){
      return 1;
    }
  }
  
  ob_start();
  ?>
  <ul id="va-widget" class="automations" data-state="list">
  <?php
  usort($automations, 'cmp_status');
  foreach($automations as $automation){
    $name = $automation['settings']['title'];
    $id = $automation['id'];
    $status = $automation['status'];
    $emails = $MailChimp->get('/automations/'.$id.'/emails')['emails'];
    ?>
    <li class="automation" data-status= <?php echo '"'. $status .'"';?>  data-automationview="emails">
      <div class="bg" data-key=<?php echo '"automation-'. $id .'"';?>></div>
      
      <div class="automation-overview">
        <div data-action="view" class="automation-name"  data-show=<?php echo '"automation-'. $id .'"';?> >
          <h3><?php echo $name ?></h3>
        </div>
        <div class="automation-details">
          <span class="detail" data-detail="status"><span class="label">Status:</span> <?php echo $status ;?></span>
          <span class="detail" data-detail="email-count"><span class="label">Email Count:</span> <?php echo count($emails);?></span>
          <span class="detail" data-detail="emails-sent"><span class="label">Emails Sent:</span> <?php echo $automation['emails_sent'];?></span>
        </div>
      </div>
    </li>
    <?php
  }
  ?>  
  </ul>
  <?php
  ob_end_flush();
}