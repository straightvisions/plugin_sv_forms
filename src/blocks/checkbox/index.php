<?php
namespace sv_gutenform;

class checkbox extends sv_gutenform {
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
		
		require( $this->get_path( 'lib/frontend/tpl/checkbox.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'checkbox' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-checkbox', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					'inputId' => array(
						'type' => 'string',
					),

					// Input Settings
					'isChecked' => array(
						'type' => 'bool',
					),
					'label' => array(
						'type' => 'string',
						'default' => __( 'Checkbox Label', 'sv_posts' ),
					),
					'name' => array(
						'type' => 'string',
					),
					'type' => array(
						'type' => 'string',
						'default' => 'checkbox',
					),
					'value' => array(
						'type' => 'string',
					),

					// Validation Settings
					'required' => array(
						'type' => 'bool',
					),

					// Color Settings
					'labelColor' => array(
						'type' => 'string',
					),
					'labelColorClass' => array(
						'type' => 'string',
					),

					// Advanced Settings
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
		$attr = array();

		// Type
		$attr[]	= 'type="' . $this->block_attr['type'] . '"';

		// ID
		if ( isset( $this->block_attr['value'] ) && ! empty( $this->block_attr['value'] ) ) {
			$attr[]	= 'id="' . $this->block_attr['value'] . '"';
		}

		// Name
		if ( isset( $this->block_attr['name'] ) ) {
			$attr[] = 'name="' . $this->block_attr['name'] . '"';
		}

		// Value
		if ( isset( $this->block_attr['value'] ) && ! empty( $this->block_attr['value'] ) ) {
			$attr[]	= 'value="' . $this->block_attr['value'] . '"';
		}

		// Checked
		if ( isset( $this->block_attr['isChecked'] ) && $this->block_attr['isChecked'] ) {
			$attr[]	= 'checked';
		}

		// Required
		if ( isset( $this->block_attr['required'] ) && $this->block_attr['required'] ) {
			$attr[] = 'required';
		}

		// Disabled
		if ( isset( $this->block_attr['disabled'] ) && $this->block_attr['disabled'] ) {
			$attr[] = 'disabled';
		}

		return implode( ' ', $attr );
	}
}