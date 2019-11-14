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
		
		require_once( $this->get_path( 'lib/frontend/tpl/email.php' ) );

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
						'type'		=> 'string',
					),
					'label' => array(
						'type'		=> 'string',
						'default'	=> __( 'E-Mail Label', 'sv_posts' ),
					),
					'name' => array(
						'type'		=> 'string',
					),
					'placeholder' => array(
						'type'		=> 'string',
						'default'	=> __( 'E-Mail', 'sv_posts' ),
					),
					'isRecipient' => array(
						'type'		=> 'bool',
						'default'	=> false,
					),

					// Validation Settings
					'required' => array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'minlength' => array(
						'type'		=> 'number',
						'default'	=> 0,
					),
					'maxlength' => array(
						'type'		=> 'number',
						'default'	=> 0,
					),

					// Color Settings
					'labelColor' => array(
						'type'		=> 'string',
					),
					'labelColorClass' => array(
						'type'		=> 'string',
					),
					'inputColor' => array(
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

					// Advanced Settings
					'autofocus' => array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'autocomplete' => array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'disabled' => array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'className' => array(
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
		$class[]		= 'straightvisions-block-sv-gutenform-email';

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
		$attr[]		= 'type="email"';

		// ID
		$attr[]		= 'id="' . $this->block_attr['name'] . '"';

		// Name
		$attr[]		= 'name="' . $this->block_attr['name'] . '"';

		// Value
		if ( isset( $this->block_attr['defaultValue'] ) ) {
			$attr[]		= 'value="' . $this->block_attr['defaultValue'] . '"';
		}

		// Placeholder
		$attr[]		= 'placeholder="' . $this->block_attr['placeholder'] . '"';

		// Required
		if ( 
			( isset( $this->block_attr['required'] ) && $this->block_attr['required'] ) 
			|| $this->block_attr['isRecipient'] 
		) {
			$attr[] = 'required';
		}

		// Min-Length
		if ( isset( $this->block_attr['minlength'] ) && $this->block_attr['minlength'] > 0 ) {
			$attr[]	= 'minlength="' . $this->block_attr['minlength'] . '"';
		}

		// Max-Length
		if ( isset( $this->block_attr['maxlength'] ) && $this->block_attr['maxlength'] > 0 ) {
			$attr[]	= 'maxlength="' . $this->block_attr['maxlength'] . '"';
		}

		// Class
		$class		= array();

		if ( 
			isset( $this->block_attr['inputColor'] ) 
			&& $this->block_attr['inputColorClass'] 
		) {
            $class[] = $this->block_attr['inputColorClass'];
		}

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

		if ( 
			isset( $this->block_attr['inputColor'] ) 
			&& ! $this->block_attr['inputColorClass'] 
		) {
			$style[] = 'color:' . $this->block_attr['inputColor'];
		}

		if ( 
			isset( $this->block_attr['inputBackgroundColor'] ) 
			&& ! $this->block_attr['inputBackgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $this->block_attr['inputBackgroundColor'];
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