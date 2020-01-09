<?php
namespace sv_gutenform;

class sv_gutenform extends modules {
	// ##### Initialization Methods #####

	public function init() {
		$this->register_scripts()->register_blocks();

		// Actions Hooks & Filter
		add_action( 'init', array( $this, 'register_block_assets' ) );
		add_filter( 'block_categories', array( $this, 'register_block_category' ), 10, 2 );
	}

	// Registers all block styles and scripts for the frontend
	private function register_scripts(): sv_gutenform {
		// Stylesheets
		$this->get_script( 'common' )
			 ->set_path( 'lib/frontend/css/common.css' );

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
				$class_name = 'sv_gutenform\\' . $value;

				require_once( $dir . '/' . $value . '/index.php' );

				$this->$value = new $class_name();
				$this->$value->set_root( $this->get_root() );
				$this->$value->set_parent( $this );
				$this->$value->init();
			}
		}
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
	public function register_block_category( $categories ) {
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

	// ######### Helper Methods #########

	// Checks if the gutenberg plugin is active and if the version is compatible
	private function check_gutenberg() {
		if ( ! is_plugin_active('gutenberg/gutenberg.php') ) return false;
		if ( floatval( GUTENBERG_VERSION ) < 6.7 ) return false;

		return true;
	}
}