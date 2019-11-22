<?php
namespace sv_gutenform;

class submit extends sv_gutenform {
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
			'straightvisions/sv-gutenform-submit', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Content
					'content' 		=> array(
						'type'		=> 'string',
						'default'	=> __( 'Submit', 'sv_gutenform' ),
					),

					// Color Settings
					'textColor' 	=> array(
						'type'		=> 'string',
					),
					'textColorClass'=> array(
						'type'		=> 'string',
					),
					'backgroundColor' => array(
						'type'		=> 'string',
					),
					'backgroundColorClass' => array(
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
	// Returns a string with all classes for the button wrapper
	public function get_wrapper_class(): string {
		$class 			= array();
		$class[]		= 'wp-block-straightvisions-sv-gutenform-submit';

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

	// Returns a string with all attributes for the button
	public function get_button_attr(): string {
		$attr 		= array();

		// Type
		$attr[]		= 'type="submit"';

		// Class
		$class = array();

		if ( 
			isset( $this->block_attr['textColor'] ) 
			&& $this->block_attr['textColorClass'] 
		) {
            $class[] = $this->block_attr['textColorClass'];
		}

		if ( 
			isset( $this->block_attr['backgroundColor'] ) 
			&& $this->block_attr['backgroundColorClass'] 
		) {
            $class[] = $this->block_attr['backgroundColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[] = 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		$style = array();

		if ( 
			isset( $this->block_attr['textColor'] ) 
			&& ! $this->block_attr['textColorClass'] 
		) {
			$style[] = 'color:' . $this->block_attr['textColor'];
		}

		if ( 
			isset( $this->block_attr['backgroundColor'] ) 
			&& ! $this->block_attr['backgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $this->block_attr['backgroundColor'];
		}

		if ( ! empty( $style ) ) {
			$attr[] = 'style="' . implode( ';', $style ) . '"';
		}

		return implode( ' ', $attr );
	}
}