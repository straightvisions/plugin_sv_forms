<?php
namespace sv_gutenform;

class select extends sv_gutenform {
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
		
		require( $this->get_path( 'lib/frontend/tpl/select.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'select' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-select', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					'inputId' => array(
						'type' => 'string',
					),
					
					// Input Settings
					'defaultValue' => array(
						'type' => 'string',
					),
					'label' => array(
						'type' => 'string',
						'default' => __( 'Select Label', 'sv_posts' ),
					),
					'name' => array(
						'type' => 'string',
					),
					'type' => array(
						'type' => 'string',
						'default' => 'select',
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

					// Border Radius
					'borderRadius' => array(
						'type' => 'number',
					),

					// Advanced Settings
					'autofocus' => array(
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

	// Returns a string with all attributes for the select
	protected function get_select_attr(): string {
		return $this->get_root()->sv_gutenform->get_default_input_attr( $this->block_attr );
	}

	protected function get_options(): string {
		$options = array();

		foreach( json_decode( $this->block_attr['options'] ) as $option ) {
			$el	= '<option value="' . $option->value .'"';

			if ( 
				isset( $this->block_attr['defaultValue'] ) 
				&& $this->block_attr['defaultValue'] === $option->value 
			) {
				$el .= ' selected';
			}

			if ( isset( $option->disabled ) && $option->disabled ) {
				$el .= ' disabled';
			}

			$el .= '>' . $option->label . '</option>';

			$options[] = $el;
		}

		return implode( ' ', $options );
	}
}