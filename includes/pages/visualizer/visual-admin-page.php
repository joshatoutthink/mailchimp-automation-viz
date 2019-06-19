<?php


use \DrewM\MailChimp\MailChimp;

add_action('admin_menu', 'va_setup_admin_page');
 
function va_setup_admin_page(){
        add_menu_page( 'Automaiton Visualizer', 'Automaiton Visualizer', 'manage_options', 'mailchimp-automations', 'create_automations_page' );
}
 
function create_automations_page(){
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
  
  function cmp_pos($a, $b){
    return strcmp($a['position'], $b['position']);
  }
  
  ob_start();
  ?>
  <ul id="va-widget" class="automations" data-state='list'>
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
        <div class="automation-nav">
        <span class="back" title="view all"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path fill="black" d="M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"/></svg>
        </span>
        <span class="toggle-automation-view" title="switch view"> toggle </span>
        </div>
        <div data-action="view" class="automation-name"  data-show=<?php echo '"automation-'. $id .'"';?> >
          <h3><?php echo $name ?></h3>
        </div>
        <div class="automation-details">
          <span class="detail" data-detail="status"><span class="label">Status:</span> <?php echo $status ;?></span>
          <span class="detail" data-detail="email-count"><span class="label">Email Count:</span> <?php echo count($emails);?></span>
          <span class="detail" data-detail="emails-sent"><span class="label">Emails Sent:</span> <?php echo $automation['emails_sent'];?></span>
        </div>
      </div>
      <ul class="automation-emails" >
      <?php
      //sorts those emails based on position
      usort($emails, 'cmp_pos');

      foreach($emails as $email){
        $workflow_id= $email['workflow_id'];
        $title= $email['settings']['title'];
        $subject= $email['settings']['subject_line'];
        $list = $email['recipients']['list_name'];
        $segment_text = $email['recipients']['segment_text'];
        $preview = $email['archive_url'];
        $position = $email['position'];
        $delay_amount = $email['delay']['amount'];
        $delay_type = $email['delay']['type'];
        if(!$delay_amount){
         $delay_amount = ''; 
        }
        if($delay_amount > 1 ){
          $delay_type = $delay_type.'s';
        }
        $delay = $delay_amount.' '.$delay_type;
        ?>
          <li class="email">
            <span class="position"> <?php echo $position ; ?> </span>
            <h4 class="email-title"><?php echo $title ;?></h4>
            <div class="email-info">
              <h5 class="email-subject">
                <span class="label">Subject Line:</span>
                <?php echo $subject ;?>
              </h5>
              <p class="additional-info">
                <span class="label">trigger:</span>
                <?php echo $email['delay']['full_description']; ?>
              </p>
              <p class="additional-info">
              <span class="label">Delay:</span>
              <?php echo $delay ;?>
              </p>
              <p class="additional-info">
                <span class="label">Sending To List:</span>
                <?php echo $list; ?>
              </p>
              <div class="additional-info">
                <span class="label">Preview</span>
                <iframe style="width:100%; border:1px solid var(--color)" src=<?php echo $preview ?>></iframe>
              </div>
              <div class="email-automation-filter">
                <span>filter group:</span>
                <?php echo $segment_text; ?>
              </div>
            </div>
          </li>
        <?php
      }
      ?>
      </ul>
      <ul class="automation-stats">
        <li class="stat">
          <span class="stat__label">Opens</span><?php echo $automation['report_summary']['opens']; ?>
        </li>
        <li class="stat">
        <span class="stat__label">Unique Opens</span><?php echo $automation['report_summary']['unique_opens']; ?>
        </li> 
        <li class="stat">
        <span class="stat__label">Open Rate</span><?php echo number_format((float)$automation['report_summary']['open_rate'] * 100, 2, '.', '') . '%'; ?>
        </li>
        <li class="stat">
        <span class="stat__label">Clicks</span><?php echo $automation['report_summary']['clicks']; ?>
        </li>
        <li class="stat">
        <span class="stat__label">Subscriber Clicks</span><?php echo $automation['report_summary']['subscriber_clicks']; ?>
        </li>
        <li class="stat">
        <span class="stat__label">Click Rate</span><?php echo number_format((float)$automation['report_summary']['click_rate'] * 100, 2, '.', '') . '%'; ?>
        </li>
      </ul>  
    </li>
    <?php
  }
  ?>  
  </ul>
  <?php
  ob_end_flush();
}
 
