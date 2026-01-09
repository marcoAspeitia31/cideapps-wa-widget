<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://cideapps.com
 * @since      1.0.0
 *
 * @package    Cideapps_Wa_Widget
 * @subpackage Cideapps_Wa_Widget/admin/partials
 */

// Si no hay permisos, salir
if ( ! current_user_can( 'manage_options' ) ) {
	return;
}

// Mostrar mensajes de actualización
if ( isset( $_GET['settings-updated'] ) ) {
	$updated = sanitize_text_field( wp_unslash( $_GET['settings-updated'] ) );
	if ( $updated === 'true' ) {
		add_settings_error( 'cwaw_messages', 'cwaw_message', __( 'Settings Saved', 'cideapps-wa-widget' ), 'updated' );
	}
}
settings_errors( 'cwaw_messages' );
?>

<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<form action="options.php" method="post">
		<?php
		settings_fields( 'cwaw_settings' );
		do_settings_sections( $plugin_name );
		submit_button( __( 'Save Settings', 'cideapps-wa-widget' ) );
		?>
	</form>
</div>
