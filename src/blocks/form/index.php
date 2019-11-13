<?php
namespace sv_gutenform;

class form extends sv_gutenform {	
	public function init() {
		$this->register_block();

		// Actions Hooks & Filter
		add_action( 'wp_ajax_sv_gutenform_submit', array( $this, 'ajax_sv_gutenform_submit' ) );
	}

	public function render_block( array $attr, string $content ): string {
		if ( did_action( 'wp_enqueue_scripts' ) ) {
			$this->load_block_assets();
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'load_block_assets' ), 999 );
		}

		$this->get_parent()->get_script( 'form_js' )->set_localized( 
			array_merge(
				$this->get_parent()->get_script( 'form_js' )->get_localized(),
				array(
					'form_attr' => $attr,
				)
			)
		);

		ob_start();
		
		require_once( $this->get_path( 'lib/frontend/tpl/form.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function load_block_assets() {
		if ( ! is_admin() ) {
			$this->get_parent()->get_script( 'common' )->set_is_enqueued();
			$this->get_parent()->get_script( 'form' )->set_is_enqueued();
			$this->get_parent()->get_script( 'form_js' )
				->set_is_enqueued()
				->set_localized( 
					array_merge(
						$this->get_parent()->get_script( 'form_js' )->get_localized(),
						array(
							'ajaxurl' 	=> admin_url( 'admin-ajax.php' ),
							'nonce' 	=> \wp_create_nonce( 'sv_gutenform_submit' ),
						)
					)
				);
		}
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Form Settings
					'adminMail' => array(
						'type'		=> 'string',
						'default'	=> 'disabled',
					),
					'adminMailUser' => array(
						'type'		=> 'number',
					),
					'adminMailCustom' => array(
						'type'		=> 'string',
					),
					'confirmationMail' => array(
						'type'		=> 'boolean',
						'default'	=> false,
					),
					'confirmationMailContent' => array(
						'type'		=> 'string',
					),

					// Advanced
					'className' => array(
						'type'		=> 'string',
					),
				),
			)
		);
	}

	public function send_mail( $to, string $subject, string $message ): bool {
		return wp_mail( $to, $subject, $message );
	}

	public function send_admin_mail( $attr, $data ): form {
		if ( $attr['adminMail'] === 'disabled' ) return $this;

		// Retrieves the mail adress
		switch ( $attr['adminMail'] ) {
			case 'author':
				$to = get_the_author_meta( 'user_email', $attr['adminMailuser'] );
				break;
			case 'custom':
				if ( empty( $attr['adminMailCustom'] ) ) return $this;
				if ( ! is_email( $attr['adminMailCustom'] ) ) return $this;
				
				$to = $attr['adminMailCustom'];
				break;
		}

		$this->send_mail( $to, 'Form Submit', 'Name: Peter' );
	}

	// This function will be called via Ajax
	public function ajax_sv_gutenform_submit() {
		if ( ! isset( $_POST) || empty( $_POST ) ) return;

		$attr = $_POST['formAttr'];
		$data = $_POST['formData'];

		$this->ajaxStatus( 'success', 'Admin Mail was sent', $data );
	}
}