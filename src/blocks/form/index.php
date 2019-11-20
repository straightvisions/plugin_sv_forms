<?php
namespace sv_gutenform;

class form extends sv_gutenform {	
	public function init() {
		$this->register_block();
	}

	public function load_scripts( string $form_id ): form {
		if ( did_action( 'wp_enqueue_scripts' ) ) {
			$this->load_block_assets();
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'load_block_assets' ), 999 );
		}

		$this->get_parent()->get_script( 'form_js' )->set_localized( 
			array_merge(
				$this->get_parent()->get_script( 'form_js' )->get_localized(),
				array(
					'post_id' => get_the_ID(),
					'form_id' => $form_id,
				)
			)
		);

		return $this;
	}

	public function init_block( array $attr, string $content ): string {
		return $this->load_scripts( $attr['blockId'] )->render_block( $attr, $content );
	}

	public function render_block( array $attr, string $content ): string {
		ob_start();

		require( $this->get_path( 'lib/frontend/tpl/form.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'common' )->set_is_enqueued();
			$this->get_parent()->get_script( 'form' )->set_is_enqueued();
			$this->get_parent()->get_script( 'form_js' )
				->set_is_enqueued()
				->set_localized( 
					array_merge(
						$this->get_parent()->get_script( 'form_js' )->get_localized(),
						array(
							'ajaxurl' 	=> admin_url( 'admin-ajax.php' ),
							'nonce' 	=> \wp_create_nonce( 'sv_gutenform_submit' ),
						)
					)
				);
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'init_block' ),
				'attributes'		=> array(
					// Hidden
					'blockId' => array(
						'type' 		=> 'string',
					),

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