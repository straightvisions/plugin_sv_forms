<?php
namespace sv_gutenform;

class url extends sv_gutenform {
	public function init() {
		$this->register_block();
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-url', array(
				'style'			=> 'sv-gutenform-style',
				'editor_script' => 'sv-gutenform-block',
				'editor_style'  => 'sv-gutenform-block-editor',
			)
		);
	}
}