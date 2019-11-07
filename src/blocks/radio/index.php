<?php
namespace sv_gutenform;

class radio extends sv_gutenform {
	public function init() {
		$this->register_block();
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-radio', array(
				'style'			=> 'sv-gutenform-style',
				'editor_script' => 'sv-gutenform-block',
				'editor_style'  => 'sv-gutenform-block-editor',
			)
		);
	}
}