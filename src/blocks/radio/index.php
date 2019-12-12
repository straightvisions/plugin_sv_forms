<?php
namespace sv_gutenform;

class radio extends sv_gutenform {
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
					'defaultValue' 	=> array(
						'type'		=> 'string',
					),
					'label' 		=> array(
						'type'		=> 'string',
						'default'	=> __( 'Radio Button Label', 'sv_posts' ),
					),
					'name' 			=> array(
						'type'		=> 'string',
					),
					'options' 		=> array(
						'type'		=> 'string',
					),

					// Color Settings
					'labelColor' 	=> array(
						'type'		=> 'string',
					),
					'labelColorClass' => array(
						'type'		=> 'string',
					),

					// Advanced Settings
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
		$class[]		= 'wp-block-straightvisions-sv-gutenform-radio';

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
	public function get_label_attr( string $for ): string {
		$attr 		= array();

		// For
		$attr[]		= 'for="' . $for . '"';

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
	public function get_input_attr( object $option ): string {
		$attr 		= array();

		// Type
		$attr[]		= 'type="radio"';

		// ID
		$attr[]		= 'id="' . $option->value . '"';

		// Name
		$attr[]		= 'name="' . $this->block_attr['name'] . '"';

		// Value
		$attr[]		= 'value="' . $option->value . '"';

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

	public function get_options(): string {
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