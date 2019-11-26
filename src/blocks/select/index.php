<?php
namespace sv_gutenform;

class select extends sv_gutenform {
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
					// Input Settings
					'defaultValue' 	=> array(
						'type'		=> 'string',
					),
					'label' 		=> array(
						'type'		=> 'string',
						'default'	=> __( 'Text Label', 'sv_posts' ),
					),
					'name' 			=> array(
						'type'		=> 'string',
					),
					'multiple' 		=> array(
						'type'		=> 'bool',
						'default'	=> false,
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
					'autofocus' 	=> array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'disabled' 		=> array(
						'type'		=> 'bool',
						'default'	=> false,
					),
					'className' 	=> array(
						'type'		=> 'string',
					),
				),
			)
		);
	}

	// Helper Methods
	// Returns a string with all classes for the select wrapper
	public function get_wrapper_class(): string {
		$class 			= array();
		$class[]		= 'wp-block-straightvisions-sv-gutenform-select';

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

	// Returns a string with all attributes for the select
	public function get_select_attr(): string {
		$attr 		= array();

		// ID
		$attr[]		= 'id="' . $this->block_attr['name'] . '"';

		// Name
		$attr[]		= 'name="' . $this->block_attr['name'] . '"';

		// Autofocus
		if ( isset( $this->block_attr['autofocus'] ) && $this->block_attr['autofocus'] ) {
			$attr[] = 'autofocus';
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

	public function get_options(): string {
		$options		= array();

		foreach( json_decode( $this->block_attr['options'] ) as $option ) {
			$el	= '<option value="' . $option->value .'"';

			if ( 
				isset( $this->block_attr['defaultValue'] ) 
				&& $this->block_attr['defaultValue'] === $option->value 
			) {
				$el .= ' selected';
			}

			$el .= '>' . $option->label . '</option>';

			$options[] = $el;
		}

		return implode( ' ', $options );
	}
}