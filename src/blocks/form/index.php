<?php
namespace sv_gutenform;

class form extends sv_gutenform {	
	public function init() {
		$this->register_block();
	}

	public function render_block( array $attr, string $content ): string {
		if ( did_action( 'wp_enqueue_scripts' ) ) {
			$this->load_block_assets();
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'load_block_assets' ), 999 );
		}

		ob_start();
		
		require_once( $this->get_path( 'lib/frontend/tpl/form.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'common' )->set_is_enqueued();
			$this->get_parent()->get_script( 'form' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Form Settings
					'adminMail' => array(
						'type'		=> 'string',
						'default'	=> 'disabled',
					),
					'adminMailUser' => array(
						'type'		=> 'number',
					),
					'adminMailCustom' => array(
						'type'		=> 'string',
					),
					'confirmationMail' => array(
						'type'		=> 'boolean',
						'default'	=> false,
					),
					'confirmationMailContent' => array(
						'type'		=> 'string',
					),

					// Advanced
					'className' => array(
						'type'		=> 'string',
					),
				),
			)
		);
	}
}