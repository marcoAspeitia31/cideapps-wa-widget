<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * When populating this file, consider the following flow
 * of control:
 *
 * - This method should be static
 * - Check if the $_REQUEST content actually is the plugin name
 * - Run an admin referrer check to make sure it goes through authentication
 * - Verify the output of $_GET makes sense
 * - Repeat with other user roles. Best directly by using the links/query string parameters.
 * - Repeat things for multisite. Once for a single site in the network, once sitewide.
 *
 * This file may be updated more in future version of the Boilerplate; however, this is the
 * general skeleton and outline for how the file should work.
 *
 * For more information, see the following discussion:
 * https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate/pull/123#issuecomment-28541913
 *
 * @link       https://cideapps.com
 * @since      1.0.0
 *
 * @package    Cideapps_Wa_Widget
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

/**
 * Verificar que el usuario tiene permisos para desinstalar plugins
 */
if ( ! current_user_can( 'activate_plugins' ) ) {
	return;
}

/**
 * Verificar que la solicitud viene de WordPress admin
 * Intentar verificar tanto para desinstalación individual como en bulk
 */
if ( function_exists( 'check_admin_referer' ) ) {
	// Para desinstalación en bulk
	if ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'delete-selected' ) {
		if ( ! check_admin_referer( 'bulk-plugins' ) ) {
			return;
		}
	}
	// Para desinstalación individual
	elseif ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'delete-plugin' ) {
		if ( ! check_admin_referer( 'delete-plugin_' . plugin_basename( WP_UNINSTALL_PLUGIN ) ) ) {
			return;
		}
	}
	// Si no hay acción definida, verificar que estamos en admin
	elseif ( ! is_admin() ) {
		return;
	}
}

/**
 * Verificar que se está desinstalando el plugin correcto
 */
if ( __FILE__ != WP_UNINSTALL_PLUGIN ) {
	return;
}

/**
 * Limpiar opciones de WordPress
 */
delete_option( 'cwaw_settings' );

/**
 * Si es multisite, limpiar opciones de todos los sitios
 */
if ( is_multisite() ) {
	global $wpdb;
	
	// Obtener todos los IDs de sitios en la red
	$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );
	
	foreach ( $blog_ids as $blog_id ) {
		switch_to_blog( $blog_id );
		
		// Eliminar la opción en cada sitio
		delete_option( 'cwaw_settings' );
		
		restore_current_blog();
	}
}

/**
 * Nota: No eliminamos archivos de medios subidos por el usuario
 * (imágenes del botón, avatar del agente, fondo del chat)
 * ya que estos pueden ser usados por otros plugins o contenido del sitio.
 * Solo eliminamos las opciones/configuraciones del plugin.
 */
