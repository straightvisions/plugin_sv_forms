<?php
namespace sv_forms;

class submit extends sv_forms {
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
		
		require( $this->get_path( 'lib/frontend/tpl/submit.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'submit' )->set_is_enqueued();
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-forms-submit', array(
				'editor_script' 	=> 'sv-forms-block',
				'editor_style'  	=> 'sv-forms-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Content
					'content' => array(
						'type' => 'string',
						'default' => __( 'Send', 'sv_forms' ),
					),

					// Color Settings
					'textColor' => array(
						'type' => 'string',
					),
					'textColorClass'=> array(
						'type' => 'string',
					),
					'backgroundColor' => array(
						'type' => 'string',
					),
					'backgroundColorClass' => array(
						'type' => 'string',
					),

					// Border Settings
					'borderRadius' => array(
						'type' => 'number',
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
		return $this->get_root()->sv_forms->get_default_wrapper_class( $this->block_attr, $this->get_module_name() );
	}

	// Returns a string with all attributes for the button
	protected function get_button_attr(): string {
		$attr = array();

		// Class
		$class = array();

		// Text Color
		if ( 
			isset( $this->block_attr['textColor'] ) 
			&& $this->block_attr['textColorClass'] 
		) {
            $class[] = $this->block_attr['textColorClass'];
		}

		// Background Color
		if ( 
			isset( $this->block_attr['backgroundColor'] ) 
			&& $this->block_attr['backgroundColorClass'] 
		) {
            $class[] = $this->block_attr['backgroundColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[]	= 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		$style = array();

		// Text Color
		if ( 
			isset( $this->block_attr['textColor'] ) 
			&& ! $this->block_attr['textColorClass'] 
		) {
			$style[] = 'color:' . $this->block_attr['textColor'];
		}

		// Background Color
		if ( 
			isset( $this->block_attr['backgroundColor'] ) 
			&& ! $this->block_attr['backgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $this->block_attr['backgroundColor'];
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