<?php
namespace sv_gutenform;

class user_mail extends sv_gutenform {
	public function init() {
		$this->register_block();
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-user-mail', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> function() { return ''; },
			)
		);
	}
}