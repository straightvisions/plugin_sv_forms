<?php
namespace sv_gutenform;

if ( ! class_exists( '\sv_core\core_plugin' ) ) {
	require_once( dirname( __FILE__ ) . '/core_plugin/core_plugin.php' );
}

class init extends \sv_core\core_plugin {
	const version 				= 1400;
	const version_core_match 	= 4020;
	
	public function load() {
		if ( ! $this->setup( __NAMESPACE__, __FILE__ ) ) {
			return false;
		}
		
		$section_privacy_text =
			'';
		
		$this->set_section_title( __( 'SV Gutenform', 'sv_gutenform' ) )
			 ->set_section_desc( __( '', 'sv_gutenform' ) )
			 ->set_section_privacy( $section_privacy_text );
		
		return $this;
	}	
}

$GLOBALS[ __NAMESPACE__ ] = new init();
$GLOBALS[ __NAMESPACE__ ]->load();