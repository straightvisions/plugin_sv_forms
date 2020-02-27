<?php
namespace sv_gutenform;

class sv_gutenform extends modules {
	public function init() {
		$this->register_scripts()
			 ->register_blocks()
			 ->set_section_title( __( 'Dashboard', 'sv_gutenform' ) )
			 ->set_section_desc( __( 'Overview & Stats', 'sv_gutenform' ) )
			 ->set_section_type( 'tools' )
			 ->set_section_template_path( $this->get_path( 'lib/backend/tpl/dashboard.php' ) )
			 ->get_root()
			 ->add_section( $this );

		// Actions Hooks & Filter
		add_action( 'init', array( $this, 'register_block_assets' ) );
		add_filter( 'block_categories', array( $this, 'block_categories' ), 10, 2 );
	}

	// Registers all block styles and scripts for the frontend
	private function register_scripts(): sv_gutenform {
		// Stylesheets
		$this->get_script( 'common' )
			 ->set_path( 'lib/frontend/css/common.css' );

		$this->get_script( 'wrapper' )
			 ->set_path( 'lib/frontend/css/wrapper.css' );

		$this->get_script( 'form' )
			 ->set_path( 'lib/frontend/css/form.css' );

		$this->get_script( 'submit' )
			 ->set_path( 'lib/frontend/css/submit.css' );

		$this->get_script( 'text' )
			 ->set_path( 'lib/frontend/css/text.css' );

		$this->get_script( 'url' )
			 ->set_path( 'lib/frontend/css/url.css' );

		$this->get_script( 'email' )
			 ->set_path( 'lib/frontend/css/email.css' );

		$this->get_script( 'phone' )
			 ->set_path( 'lib/frontend/css/phone.css' );

		$this->get_script( 'number' )
			 ->set_path( 'lib/frontend/css/number.css' );

		$this->get_script( 'password' )
			 ->set_path( 'lib/frontend/css/password.css' );

		$this->get_script( 'date' )
			 ->set_path( 'lib/frontend/css/date.css' );

		$this->get_script( 'range' )
			 ->set_path( 'lib/frontend/css/range.css' );

		$this->get_script( 'textarea' )
			 ->set_path( 'lib/frontend/css/textarea.css' );

		$this->get_script( 'checkbox' )
			 ->set_path( 'lib/frontend/css/checkbox.css' );

		$this->get_script( 'radio' )
			 ->set_path( 'lib/frontend/css/radio.css' );

		$this->get_script( 'select' )
			 ->set_path( 'lib/frontend/css/select.css' );

		$this->get_script( 'thank_you' )
			 ->set_path( 'lib/frontend/css/thank_you.css' );

		// Scripts
		$this->get_script( 'form_js' )
			 ->set_path( 'lib/frontend/js/form.js' )
			 ->set_deps( array( 'jquery' ) )
			 ->set_type( 'js' );

		$this->get_script( 'range_js' )
			 ->set_path( 'lib/frontend/js/range.js' )
			 ->set_deps( array( 'jquery' ) )
			 ->set_type( 'js' );

		return $this;
	}

	// Loops through the blocks directory and registers all blocks in it
	private function register_blocks() {
		$dir = $this->get_root()->get_path( 'blocks' );
		$dir_array = array_diff( scandir( $dir ), array( '..', '.' ) );
		
		foreach( $dir_array as $key => $value ) {
			if ( 
				is_dir( $dir . '/' . $value ) 
				&& file_exists( $dir . '/' . $value . '/index.php' ) 
			) {
				$class_name = __NAMESPACE__ . '\\' . $value;

				require_once( $dir . '/' . $value . '/index.php' );

				$this->$value = new $class_name();
				$this->$value->set_root( $this->get_root() );
				$this->$value->set_parent( $this );
				$this->$value->init();
			}
		}

		return $this;
	}

	// Registers all block styles and scripts for the editor
	public function register_block_assets(): sv_gutenform {	
		$this->register_post_meta();

		wp_register_script(
			'sv-gutenform-block',
			$this->get_root()->get_url( '../dist/blocks.build.js' ),
			array( 'jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			filemtime( $this->get_root()->get_path( '../dist/blocks.build.js' ) ),
			true
		);

		if ( $this->check_gutenberg() ) {
			wp_localize_script( 'sv-gutenform-block', 'gutenbergPlugin', array( 'version' => GUTENBERG_VERSION ) );
		}
	
		wp_register_style(
			'sv-gutenform-block-editor',
			$this->get_root()->get_url( '../dist/blocks.editor.build.css' ),
			array( 'wp-edit-blocks' ),
			filemtime( $this->get_root()->get_path( '../dist/blocks.editor.build.css' ) )
		);

		return $this;
	}

	// Registers a custom post meta field, for the block attributes
	private function register_post_meta() {
		register_meta( 'post', '_sv_gutenform_forms', array (
			'show_in_rest' 	=> true,
			'type' 			=> 'string',
			'single' 		=> true,
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		));
	}
	
	// Registers the straightvisions block category
	public function block_categories( $categories ) {
		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return 
		in_array( 'straightvisions', $category_slugs, true ) 
		? $categories 
		: array_merge(
			$categories,
			array(
				array(
					'slug' 	=> 'straightvisions',
					'title' => 'straightvisions',
				),
			)
		);
	}

	// Checks if the gutenberg plugin is active and if the version is compatible
	private function check_gutenberg() {
		if ( ! is_plugin_active('gutenberg/gutenberg.php') ) return false;
		if ( floatval( GUTENBERG_VERSION ) < 6.7 ) return false;

		return true;
	}

	// Returns the wrapper class for the default template input
	protected function get_default_wrapper_class( array $block_attr, string $block_name ): string {
		$class 		= array();
		$class[]	= 'wp-block-straightvisions-sv-gutenform-' . $block_name;

		// Alignment
		if ( isset( $block_attr['align'] ) ) { 
			$class[] = 'align' . $block_attr['align'];
		}

		// Additional Classes
		if ( isset( $block_attr['className'] ) ) { 
			$class[] = $block_attr['className'];
		}

		return implode( ' ', $class );
	}

	// Returns the label attr for the default template input
	protected function get_default_label_attr( array $block_attr ): string {
		$attr = array();

		// For
		if ( isset( $block_attr['name'] ) ) {
			$attr[]	= 'for="' . $block_attr['name'] . '"';
		}

		// Class
		$class = array();

		if ( 
			isset( $block_attr['labelColor'] ) 
			&& $block_attr['labelColorClass'] 
		) {
            $class[] = $block_attr['labelColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[]	= 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		if ( 
			isset( $block_attr['labelColor'] ) 
			&& ! $block_attr['labelColorClass'] 
		) {
			$attr[] = 'style="color:' . $block_attr['labelColor'] . '"';
		}

		return implode( ' ', $attr );
	}

	// Returns the input attr for the default template input
	protected function get_default_input_attr( array $block_attr ): string {
		$attr = array();

		// Type
		if ( isset( $block_attr['type'] ) ) {
			$attr[] = 'type="' . $block_attr['type'] .  '"';
		}

		if ( isset( $block_attr['name'] ) ) {
			// ID
			$attr[] = 'id="' . $block_attr['name'] . '"';

			// Name
			$attr[] = 'name="' . $block_attr['name'] . '"';
		}

		// Value
		if ( isset( $block_attr['defaultValue'] ) ) {
			$attr[]	= 'value="' . $block_attr['defaultValue'] . '"';
		}

		// Placeholder
		if ( isset( $block_attr['placeholder'] ) ) {
			$attr[] = 'placeholder="' . $block_attr['placeholder'] . '"';
		}

		// Required
		if ( isset( $block_attr['required'] ) && $block_attr['required'] ) {
			$attr[] = 'required';
		}

		// Min-Length
		if ( isset( $block_attr['minlength'] ) && $block_attr['minlength'] > 0 ) {
			$attr[]	= 'minlength="' . $block_attr['minlength'] . '"';
		}

		// Max-Length
		if ( isset( $block_attr['maxlength'] ) && $block_attr['maxlength'] > 0 ) {
			$attr[]	= 'maxlength="' . $block_attr['maxlength'] . '"';
		}

		// Min
		if ( isset( $block_attr['min'] ) && $block_attr['min'] > 0 ) {
			$attr[]	= 'min="' . $block_attr['min'] . '"';
		}

		// Max
		if ( isset( $block_attr['max'] ) && $block_attr['max'] > 0 ) {
			$attr[]	= 'max="' . $block_attr['max'] . '"';
		}

		// Step
		if ( isset( $block_attr['step'] ) && $block_attr['step'] > 0 ) {
			$attr[]	= 'step="' . $block_attr['step'] . '"';
		}

		// Class
		$class = array();

		// Input Color
		if ( 
			isset( $block_attr['inputColor'] ) 
			&& $block_attr['inputColorClass'] 
		) {
            $class[] = $block_attr['inputColorClass'];
		}

		// Input Background Color
		if ( 
			isset( $block_attr['inputBackgroundColor'] ) 
			&& $block_attr['inputBackgroundColorClass'] 
		) {
            $class[] = $block_attr['inputBackgroundColorClass'];
		}
		
		if ( ! empty( $class ) ) {
			$attr[]	= 'class="' . implode( ' ', $class ) . '"';
		}

		// Style
		$style = array();

		// Input Color
		if ( 
			isset( $block_attr['inputColor'] ) 
			&& ! $block_attr['inputColorClass'] 
		) {
			$style[] = 'color:' . $block_attr['inputColor'];
		}

		// Input Background Color
		if ( 
			isset( $block_attr['inputBackgroundColor'] ) 
			&& ! $block_attr['inputBackgroundColorClass'] 
		) {
			$style[] = 'background-color:' . $block_attr['inputBackgroundColor'];
		}

		// Border Radius
		if ( isset( $block_attr['borderRadius'] ) ) {
			$style[] = 'border-radius:' . $block_attr['borderRadius'] . 'px';
		}

		if ( ! empty( $style ) ) {
			$attr[] = 'style="' . implode( ';', $style ) . '"';
		}

		// Autofocus
		if ( isset( $block_attr['autofocus'] ) && $block_attr['autofocus'] ) {
			$attr[] = 'autofocus';
		}

		// Autocomplete
		if ( isset( $block_attr['autocomplete'] ) && $block_attr['autocomplete'] ) {
			$attr[] = 'autocomplete="on"';
		}

		// Read Only
		if ( isset( $block_attr['readonly'] ) && $block_attr['readonly'] ) {
			$attr[] = 'readonly';
		}

		// Disabled
		if ( isset( $block_attr['disabled'] ) && $block_attr['disabled'] ) {
			$attr[] = 'disabled';
		}

		return implode( ' ', $attr );
	}
}