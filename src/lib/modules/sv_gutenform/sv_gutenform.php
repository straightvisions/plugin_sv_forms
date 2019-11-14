<?php
namespace sv_gutenform;

class sv_gutenform extends modules {
	public function init() {
		$this->register_scripts()->register_blocks();

		// Actions Hooks & Filter
		add_filter( 'block_categories', array( $this, 'register_block_category' ), 10, 2 );
		add_action( 'init', array( $this, 'register_block_assets' ) );
		add_action( 'wp_ajax_sv_gutenform_submit', array( $this, 'ajax_sv_gutenform_submit' ) );
	}

	public function register_scripts(): sv_gutenform {
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

		$this->get_script( 'checkbox' )
			 ->set_path( 'lib/frontend/css/checkbox.css' );

		$this->get_script( 'textarea' )
			 ->set_path( 'lib/frontend/css/textarea.css' );

		// Scripts
		$this->get_script( 'form_js' )
			 ->set_path( 'lib/frontend/js/form.js' )
			 ->set_deps( array( 'jquery' ) )
			 ->set_type( 'js' );

		return $this;
	}

	protected function check_gutenberg() {
		if ( ! is_plugin_active('gutenberg/gutenberg.php') ) return false;
		if ( floatval( GUTENBERG_VERSION ) < 6.7 ) return false;

		return true;
	}

	public function register_block_assets() {	
		wp_register_script(
			'sv-gutenform-block',
			$this->get_root()->get_url( '../dist/blocks.build.js' ),
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
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
	}

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

	// Ajax - Mail Methods
	public function send_mail( $to, string $subject, array $message ): sv_gutenform {
		add_filter( 'wp_mail_content_type', function() { return 'text/html'; } );
		wp_mail( $to, $subject, $message['html'] );
		remove_filter( 'wp_mail_content_type', function() { return 'text/html'; } );

		return $this;
	}

	public function get_form_data( array $data, bool $is_plain = false ): string {
		$message = $is_plain ? '' : '<ul>';

		foreach( $data as $entry ) {
			$message .= $is_plain ? '' : '<li>';
			$message .= $entry['name'] . ': ' . $entry['value'];
			$message .= $is_plain ? "\n" : '</li>';
		}

		$message .= $is_plain ? '' : '</ul>';

		return $message;
	}

	public function get_mail_template( string $template, array $data ): array {
		$template_plain	= $this->get_path( 'lib/mails/tpl/' . $template . '_plain.php' );
		$template_html 	= $this->get_path( 'lib/mails/tpl/' . $template . '_html.php' );
		$message_plain	= '';
		$message_html	= '';

		ob_start();
		if ( file_exists( $template_plain ) ) {
			require_once( $template_plain );
		}
		$message_plain = ob_get_contents();
		ob_end_clean();

		ob_start();
		if ( file_exists( $template_html ) ) {
			require_once( $template_html );
		}
		$message_html = ob_get_contents();
		ob_end_clean();

		return array( 'plain' => $message_plain, 'html' => $message_html );
	}

	public function send_admin_mail( array $attr, array $data ): sv_gutenform {
		if ( ! $attr || ! $data || $attr['adminMail'] === 'disabled' ) return $this;

		$to 		= $attr['adminMail'];
		$subject 	= 'SV Gutenform - ' . __( 'New Form Submit', 'sv_posts' );
		$message	= $this->get_mail_template( 'admin', $data );

		$this->send_mail( $to, $subject, $message );

		return $this;
	}

	// This function will be called on form submit via Ajax
	public function ajax_sv_gutenform_submit() {
		if ( ! isset( $_POST) || empty( $_POST ) ) return;

		//$this->send_admin_mail( $attributes['form'], $_POST['data'] );
		$this->ajaxStatus( 'success', 'Form was submitted', $_POST['post_id'] );
	}
}