<?php
namespace sv_gutenform;

class confirmation_mail extends sv_gutenform {
	protected $block_attr 	= array();
	private $mail_content 	= '';

	public function init() {
		$this->register_block();
	}

	private function set_mail_content( string $mail_content ): confirmation_mail {
		$this->mail_content = $mail_content;

		return $this;
	}

	public function get_mail_content(): string {
		return $this->mail_content;
	}

	public function save_block_content( array $attr, string $content ) {
		if ( ! is_admin() ) return;

		$this->set_mail_content( $content );
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-confirmation-mail', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'save_block_content' ),
			)
		);
	}
}