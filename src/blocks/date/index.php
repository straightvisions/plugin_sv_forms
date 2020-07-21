<?php
namespace sv_forms;

class date extends sv_forms {
	protected $block_attr = array();

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
		
		require( $this->get_path( 'lib/frontend/tpl/date.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'date' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-forms-date', array(
				'editor_script' 	=> 'sv-forms-block',
				'editor_style'  	=> 'sv-forms-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(					
					'defaultValue' => array(
						'type' => 'string',
					),

					// Input Settings
					'name' => array(
						'type' => 'string',
					),
					'type' => array(
						'type' => 'string',
						'default' => 'date',
					),
					'inputFontSize' => array(
						'type' => 'number',
					),

					// Label Settings
					'label' => array(
						'type' => 'string',
					),
					'labelFontSize' => array(
						'type' => 'number',
					),

					// Color Settings
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
					'labelColor' => array(
						'type' => 'string',
					),
					'labelColorClass' => array(
						'type' => 'string',
					),
					'inputBorderColor' => array(
						'type' => 'string',
					),

					// Border Settings
					'borderRadius' => array(
						'type' => 'number',
						'default' => 0,
					),
					'borderWidthTop' => array(
						'type' => 'number',
						'default' => 0,
					),
					'borderWidthRight' => array(
						'type' => 'number',
						'default' => 0,
					),
					'borderWidthBottom' => array(
						'type' => 'number',
						'default' => 0,
					),
					'borderWidthLeft' => array(
						'type' => 'number',
						'default' => 0,
					),

					// Validation Settings
					'required' => array(
						'type' => 'bool',
					),

					// Advanced Settings
					'autofocus' => array(
						'type' => 'bool',
					),
					'autocomplete' => array(
						'type' => 'bool',
					),
					'readonly' => array(
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
		return $this->get_root()->sv_forms->get_default_wrapper_class( $this->block_attr, $this->get_module_name() );
	}

	// Returns a string with all attributes for the label
	protected function get_label_attr(): string {
		return $this->get_root()->sv_forms->get_default_label_attr( $this->block_attr );
	}

	// Returns a string with all attributes for the input
	protected function get_input_attr(): string {
		return $this->get_root()->sv_forms->get_default_input_attr( $this->block_attr );
	}
}