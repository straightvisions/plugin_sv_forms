<?php
namespace sv_forms;

if ( ! class_exists( '\sv_core\core_plugin' ) ) {
	require_once( dirname( __FILE__ ) . '/core_plugin/core_plugin.php' );
}

class init extends \sv_core\core_plugin {
	const version 				= 1812;
	const version_core_match 	= 8000;

    public function load() {
        if ( ! $this->setup( __NAMESPACE__, __FILE__ ) ) {
            return false;
        }

        $info = get_file_data($this->get_path('../'.$this->get_name().'.php'), array(
            'name'	=> 'Plugin Name',
            'desc'	=> 'Description'
        ));

        $this->set_section_title( $info['name'] )
			->set_section_desc( $info['desc'] )
			->set_section_type('')
			->set_section_privacy( '<p>' . $this->get_section_title() . __(' is a forms builder. Admin has total control about data handling.',  'sv_forms').'</p>' );
    }
}

$GLOBALS[ __NAMESPACE__ ] = new init();
$GLOBALS[ __NAMESPACE__ ]->load();