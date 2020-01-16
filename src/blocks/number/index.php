<?php
namespace sv_gutenform;

class number extends sv_gutenform {
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
		
		require( $this->get_path( 'lib/frontend/tpl/number.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'number' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-number', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Input Settings
					'defaultValue' 	=> array(
						'type'		=> 'string',
					),
					'label' 		=> array(
						'type'		=> 'string',
						'default'	=> __( 'Number Label', 'sv_posts' ),
					),
					'name' 			=> array(
						'type'		=> 'string',
					),
					'placeholder' 	=> array(
						'type'		=> 'string',
					),

					// Validation Settings
					'required' 		=> array(
						'type'		=> 'bool',
					),
					'min' 			=> array(
						'type'		=> 'number',
					),
					'max' 			=> array(
						'type'		=> 'number',
					),

					// Color Settings
					'labelColor' 	=> array(
						'type'		=> 'string',
					),
					'labelColorClass' => array(
						'type'		=> 'string',
					),
					'inputColor' 	=> array(
						'type'		=> 'string',
					),
					'inputColorClass' => array(
						'type'		=> 'string',
					),
					'inputBackgroundColor' => array(
						'type'		=> 'string',
					),
					'inputBackgroundColorClass' => array(
						'type'		=> 'string',
					),

					// Border Settings
					'borderRadius' => array(
						'type'		=> 'number',
					),

					// Advanced Settings
					'autofocus' 	=> array(
						'type'		=> 'bool',
					),
					'autocomplete' 	=> array(
						'type'		=> 'bool',
					),
					'readonly' 	=> array(
						'type'		=> 'bool',
					),
					'disabled' 		=> array(
						'type'		=> 'bool',
					),
					'className' 	=> array(
						'type'		=> 'string',
					),
				),
			)
		);
	}

	// Helper Methods
	// Returns a string with all classes for the input wrapper
	public function get_wrapper_class(): string {
		$class 			= array();
		$class[]		= 'wp-block-straightvisions-sv-gutenform-number';

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

	// Returns a string with all attributes for the label
	public function get_label_attr(): string {
		$attr 		= array();

		// For
		$attr[]		= 'for="' . $this->block_attr['name'] . '"';

		// Class
		$class		= array();

		if ( 
			isset( $this->block_attr['labelColor'] ) 
			&& $this->block_attr['labelColorClass'] 
		) {
            $class[] = $this->block_attr['labelColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[]	= 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		if ( 
			isset( $this->block_attr['labelColor'] ) 
			&& ! $this->block_attr['labelColorClass'] 
		) {
			$attr[] = 'style="color:' . $this->block_attr['labelColor'] . '"';
		}

		return implode( ' ', $attr );
	}

	// Returns a string with all attributes for the input
	public function get_input_attr(): string {
		$attr 		= array();

		// Type
		$attr[]		= 'type="number"';

		// ID
		$attr[]		= 'id="' . $this->block_attr['name'] . '"';

		// Name
		$attr[]		= 'name="' . $this->block_attr['name'] . '"';

		// Value
		if ( isset( $this->block_attr['defaultValue'] ) ) {
			$attr[]	= 'value="' . $this->block_attr['defaultValue'] . '"';
		}

		// Placeholder
		if ( isset( $this->block_attr['placeholder'] ) ) {
			$attr[]		= 'placeholder="' . $this->block_attr['placeholder'] . '"';
		}

		// Required
		if ( isset( $this->block_attr['required'] ) && $this->block_attr['required'] ) {
			$attr[] = 'required';
		}

		// Min
		if ( isset( $this->block_attr['min'] ) && $this->block_attr['min'] > 0 ) {
			$attr[]	= 'min="' . $this->block_attr['min'] . '"';
		}

		// Max
		if ( isset( $this->block_attr['max'] ) && $this->block_attr['max'] > 0 ) {
			$attr[]	= 'max="' . $this->block_attr['max'] . '"';
		}

		// Class
		$class		= array();

		// Input Color
		if ( 
			isset( $this->block_attr['inputColor'] ) 
			&& $this->block_attr['inputColorClass'] 
		) {
            $class[] = $this->block_attr['inputColorClass'];
		}

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

		// Input Color
		if ( 
			isset( $this->block_attr['inputColor'] ) 
			&& ! $this->block_attr['inputColorClass'] 
		) {
			$style[] = 'color:' . $this->block_attr['inputColor'];
		}

		// Input Background Color
		if ( 
			isset( $this->block_attr['inputBackgroundColor'] ) 
			&& ! $this->block_attr['inputBackgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $this->block_attr['inputBackgroundColor'];
		}

		// Border Radius
		if ( isset( $this->block_attr['borderRadius'] ) ) {
			$style[] = 'border-radius:' . $this->block_attr['borderRadius'] . 'px';
		}

		if ( ! empty( $style ) ) {
			$attr[] = 'style="' . implode( ';', $style ) . '"';
		}

		// Autofocus
		if ( isset( $this->block_attr['autofocus'] ) && $this->block_attr['autofocus'] ) {
			$attr[] = 'autofocus';
		}

		// Autocomplete
		if ( isset( $this->block_attr['autocomplete'] ) && $this->block_attr['autocomplete'] ) {
			$attr[] = 'autocomplete="on"';
		}

		// Read Only
		if ( isset( $this->block_attr['readonly'] ) && $this->block_attr['readonly'] ) {
			$attr[] = 'readonly';
		}

		// Disabled
		if ( isset( $this->block_attr['disabled'] ) && $this->block_attr['disabled'] ) {
			$attr[] = 'disabled';
		}

		return implode( ' ', $attr );
	}
}