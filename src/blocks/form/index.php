<?php
namespace sv_gutenform;

class form extends sv_gutenform {	
	protected $block_attr 	= array();

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
		return $this->load_scripts( $attr['formId'] )->render_block( $attr, $content );
	}

	public function render_block( array $attr, string $content ): string {
		$this->block_attr = $attr;
		
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
					'postId' => array(
						'type' 		=> 'number',
					),
					'formId' => array(
						'type' 		=> 'string',
					),
					'saveSubmits' => array(
						'type'		=> 'bool',
						'default'	=> true,
					),
					'spamGuardLevel' => array(
						'type' 		=> 'number',
						'default'	=> 0,
					),

					// Mail Settings
					// Admin Mails
					'adminMail' 		=> array(
						'type'		=> 'string',
						'default'	=> 'disabled',
					),
					'adminMailUser' 	=> array(
						'type'		=> 'number',
					),
					'adminMailAdress'	=> array(
						'type'		=> 'string',
					),
					'adminMailSubject'	=> array(
						'type'		=> 'string',
					),
					'adminMailFromTitle'=> array(
						'type'		=> 'string',
					),
					'adminMailFromMail'	=> array(
						'type'		=> 'string',
					),
					'adminMailContent'	=> array(
						'type'		=> 'string',
					),

					// User Mails
					'userMail' => array(
						'type'		=> 'bool',
					),
					'userMailInputName' => array(
						'type'		=> 'string',
					),
					'userMailSubject' 	=> array(
						'type'		=> 'string',
					),
					'userMailFromTitle' => array(
						'type'		=> 'string',
					),
					'userMailFromMail' 	=> array(
						'type'		=> 'string',
					),
					'userMailContent' 	=> array(
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

	// Returns a string with all attributes for the form
	public function get_form_class(): string {
		$class 			= array();
		$class[]		= 'wp-block-straightvisions-sv-gutenform';

		// Alignment
		if ( isset( $this->block_attr['align'] ) ) { 
			$class[] 	= 'align' . $this->block_attr['align'];
		}

		// Additional Classes
		if ( isset( $this->block_attr['className'] ) ) { 
			$class[] 	= $this->block_attr['className'];
		}

		return implode( ' ', $class );
	}
}