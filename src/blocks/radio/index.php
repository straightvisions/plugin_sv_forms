<?php
namespace sv_gutenform;

class radio extends sv_gutenform {
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
		
		require( $this->get_path( 'lib/frontend/tpl/radio.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'radio' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-radio', array(
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
						'default' => __( 'Radio Button Label', 'sv_posts' ),
					),
					'name' => array(
						'type' => 'string',
					),
					'type' => array(
						'type' => 'string',
						'default' => 'radio',
					),
					'options' => array(
						'type' => 'string',
					),

					// Color Settings
					'labelColor' => array(
						'type' => 'string',
					),
					'labelColorClass' => array(
						'type' => 'string',
					),

					// Advanced Settings
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
	protected function get_input_attr( object $option ): string {
		$attr = array();

		// Type
		$attr[] = 'type="' . $this->block_attr['type'] . '"';

		// ID
		$attr[]	= 'id="' . $option->value . '"';

		// Name
		if ( isset( $this->block_attr['name'] ) ) {
			$attr[]	= 'name="' . $this->block_attr['name'] . '"';
		}

		// Value
		$attr[]	= 'value="' . $option->value . '"';

		// Checked
		if ( isset( $this->block_attr['defaultValue'] ) && $this->block_attr['defaultValue'] === $option->value ) {
			$attr[]	= 'checked';
		}

		// Disabled
		if ( isset( $option->disabled ) && $option->disabled ) {
			$attr[]	= 'disabled';
		}

		return implode( ' ', $attr );
	}

	// Returns the radio options as html string
	protected function get_options(): string {
		$options = array();

		foreach( json_decode( $this->block_attr['options'] ) as $option ) {
			$output = '<div class="wp-block-straightvisions-sv-gutenform-radio-option">';
			$output .= '<input ' . $this->get_input_attr( $option ) . ' />';
			$output .= '<label ' . $this->get_label_attr( $option->value ) . '>' . $option->label . '</label>';
			$output .= '</div>';

			$options[] = $output;
		}

		return implode( '', $options );
	}
}