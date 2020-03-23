<?php
namespace sv_gutenform;

class email extends sv_gutenform {
	protected $block_attr 	= array();

	public function init() {
		$this->register_block();
	}

	public function render_block( array $attr ): string {
		$this->block_attr = $attr;

		if ( did_action( 'wp_enqueue_scripts' ) ) {
			$this->load_block_assets();
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'load_block_assets' ), 999 );
		}

		ob_start();
		
		require( $this->get_path( 'lib/frontend/tpl/email.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'email' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-email', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(					
					// Input Settings
					'defaultValue' => array(
						'type' => 'string',
					),
					'label' => array(
						'type' => 'string',
					),
					'name' => array(
						'type' => 'string',
					),
					'type' => array(
						'type' => 'string',
						'default' => 'email',
					),
					'placeholder' => array(
						'type' => 'string',
						'default' => __( 'E-Mail', 'sv_gutenform' ),
					),

					// Validation Settings
					'required' => array(
						'type' => 'bool',
					),
					'minlength' => array(
						'type' => 'number',
					),
					'maxlength' => array(
						'type' => 'number',
					),

					// Color Settings
					'labelColor' => array(
						'type' => 'string',
					),
					'labelColorClass' => array(
						'type' => 'string',
					),
					'inputColor' => array(
						'type' => 'string',
					),
					'inputColorClass' => array(
						'type' => 'string',
					),
					'inputBackgroundColor' => array(
						'type' => 'string',
					),
					'inputBackgroundColorClass' => array(
						'type' => 'string',
					),

					// Border Settings
					'borderRadius' => array(
						'type' => 'number',
					),

					// Advanced Settings
					'autofocus' => array(
						'type' => 'bool',
					),
					'autocomplete' => array(
						'type' => 'bool',
					),
					'disabled' => array(
						'type' => 'bool',
					),
					'className' => array(
						'type' => 'string',
					),
				),
			)
		);
	}

	// Returns a string with all classes for the input wrapper
	protected function get_wrapper_class(): string {
		return $this->get_root()->sv_gutenform->get_default_wrapper_class( $this->block_attr, $this->get_module_name() );
	}

	// Returns a string with all attributes for the label
	protected function get_label_attr(): string {
		return $this->get_root()->sv_gutenform->get_default_label_attr( $this->block_attr );
	}

	// Returns a string with all attributes for the input
	protected function get_input_attr(): string {
		return $this->get_root()->sv_gutenform->get_default_input_attr( $this->block_attr );
	}
}