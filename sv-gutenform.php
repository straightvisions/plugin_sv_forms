<?php
/**
 * Plugin Name: SV Gutenform
 * Plugin URI: 
 * Description: Build forms in Gutenberg with ease.
 * Author: adrianchudzynski
 * Author URI: https://profiles.wordpress.org/adrianchudzynski/
 * Version: 1.4.00
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

if ( ! class_exists( '\sv_dependencies\init' ) ) {
	require_once( 'src/core_plugin/dependencies/sv_dependencies.php' );
}

if ( $GLOBALS['sv_dependencies']->set_instance_name( 'SV Gutenform' )->check_php_version() ) {
	require_once( dirname( __FILE__ ) . '/src/init.php' );
} else {
	$GLOBALS['sv_dependencies']->php_update_notification()->prevent_plugin_activation();
}