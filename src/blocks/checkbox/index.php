<?php
namespace sv_forms;

class checkbox extends sv_forms {
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
			'straightvisions/sv-forms-checkbox', array(
				'editor_script' 	=> 'sv-forms-block',
				'editor_style'  	=> 'sv-forms-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Input Settings
					'isChecked' => array(
						'type' => 'boolean',
					),
					'label' => array(
						'type' => 'string',
						'default' => __( 'Checkbox', 'sv_forms' ),
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

					// Color Settings
					'labelColor' => array(
						'type' => 'string',
					),
					'labelColorClass' => array(
						'type' => 'string',
					),
					'inputBackgroundColor' => array(
						'type' => 'string',
						'default' => '#FFFFFF'
					),
					'inputBackgroundColorClass' => array(
						'type' => 'string',
					),
					'inputBorderColor' => array(
						'type' => 'string',
						'default' => '#000000'
					),

					// Border Settings
					'borderStyle' => array(
						'type' => 'string',
						'default' => 'solid'
					),
					'borderWidthTop' => array(
						'type' => 'number',
						'default' => 1,
					),
					'borderWidthRight' => array(
						'type' => 'number',
						'default' => 1,
					),
					'borderWidthBottom' => array(
						'type' => 'number',
						'default' => 1,
					),
					'borderWidthLeft' => array(
						'type' => 'number',
						'default' => 1,
					),
					'borderRadius' => array(
						'type' => 'number',
						'default' => 0,
					),

					// Validation Settings
					'required' => array(
						'type' => 'boolean',
					),

					// Advanced Settings
					'disabled' => array(
						'type' => 'boolean',
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

		// Class
		$class = array();

		// Input Background Color
		if ( 
			isset( $this->block_attr['inputBackgroundColor'] ) 
			&& $this->block_attr['inputBackgroundColorClass'] 
		) {
            $class[] = $this->block_attr['inputBackgroundColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[]	= 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		$style = array();

		// Input Background Color
		if ( 
			isset( $this->block_attr['inputBackgroundColor'] ) 
			&& ! $this->block_attr['inputBackgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $this->block_attr['inputBackgroundColor'];
		}
		
		// Border Color
		if ( isset( $this->block_attr['inputBorderColor'] ) ) {
			$style[] = 'border-color:' . $this->block_attr['inputBorderColor'];
		}

		// Border Style
		if ( isset( $this->block_attr['borderStyle'] ) ) {
			$style[] = 'border-style:' . $this->block_attr['borderStyle'];
		}

		// Border Width Top
		if ( isset( $this->block_attr['borderWidthTop'] ) ) {
			$style[] = 'border-top-width:' . $this->block_attr['borderWidthTop'] . 'px';
		}

		// Border Width Right
		if ( isset( $this->block_attr['borderWidthRight'] ) ) {
			$style[] = 'border-right-width:' . $this->block_attr['borderWidthRight'] . 'px';
		}

		// Border Width Bottom
		if ( isset( $this->block_attr['borderWidthBottom'] ) ) {
			$style[] = 'border-bottom-width:' . $this->block_attr['borderWidthBottom'] . 'px';
		}

		// Border Width Left
		if ( isset( $this->block_attr['borderWidthLeft'] ) ) {
			$style[] = 'border-left-width:' . $this->block_attr['borderWidthLeft'] . 'px';
		}

		// Border Radius
		if ( isset( $this->block_attr['borderRadius'] ) ) {
			$style[] = 'border-radius:' . $this->block_attr['borderRadius'] . 'px';
		}

		if ( ! empty( $style ) ) {
			$attr[] = 'style="' . implode( ';', $style ) . '"';
		}

		return implode( ' ', $attr );
	}
}