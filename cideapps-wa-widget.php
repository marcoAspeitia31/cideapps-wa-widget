<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://cideapps.com
 * @since             1.0.0
 * @package           Cideapps_Wa_Widget
 *
 * @wordpress-plugin
 * Plugin Name:       WhatsApp Floating Chat for WordPress by CIDEAPPS
 * Plugin URI:        https://cideapps.com
 * Description:       Widget flotante de WhatsApp con chat, tooltip, badge y mensajes personalizables. Selector de país internacional, avatar del agente y 100% rebrandable.
 * Version:           1.0.0
 * Author:            CIDEAPPS
 * Author URI:        https://cideapps.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cideapps-wa-widget
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CIDEAPPS_WA_WIDGET_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cideapps-wa-widget-activator.php
 */
function activate_cideapps_wa_widget() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cideapps-wa-widget-activator.php';
	Cideapps_Wa_Widget_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cideapps-wa-widget-deactivator.php
 */
function deactivate_cideapps_wa_widget() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cideapps-wa-widget-deactivator.php';
	Cideapps_Wa_Widget_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_cideapps_wa_widget' );
register_deactivation_hook( __FILE__, 'deactivate_cideapps_wa_widget' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-cideapps-wa-widget.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_cideapps_wa_widget() {

	$plugin = new Cideapps_Wa_Widget();
	$plugin->run();

}
run_cideapps_wa_widget();
