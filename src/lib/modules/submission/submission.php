<?php
namespace sv_gutenform;

class submission extends modules {
	// ##### Initialization Methods #####

	public function init() {
		// Actions Hooks & Filter
		add_action( 'wp_ajax_sv_gutenform_submit', array( $this, 'ajax_sv_gutenform_submit' ) );
	}

	// This function will be called on form submit via Ajax
	public function ajax_sv_gutenform_submit() {
		if ( ! isset( $_POST) || empty( $_POST ) ) return;
		if ( ! wp_verify_nonce( $_POST[ $this->get_root()->get_prefix( 'nonce' ) ], 'sv_gutenform_submit' ) ) return;

		// Variables
		$post_id	= intval( $_POST[ $this->get_root()->get_prefix( 'post_id' ) ] );
		$post_meta 	= json_decode( get_post_meta( $post_id, '_sv_gutenform_forms', true ) );
		$form_data	= $_POST[ $this->get_root()->get_prefix( 'form_data' ) ];
		$form_id	= $this->helper_methods->get_input_value( $this->get_root()->get_prefix( 'form_id' ), $form_data );

		if ( $form_id && $post_meta->$form_id ) {
			$form_attr = $post_meta->$form_id;

			// Creates custom action hook, that passes a form data array and a form attr object
			do_action( $this->get_root()->get_prefix( 'form_submit' ), $form_data, $form_attr );

			if ( ! $this->spam_guard_check( $form_attr, $form_data ) ) {
				$this->handle_submission( $form_attr, $form_data );
			}
		}
	}

	// Handles the form submission when it passed the spam guard check
	private function handle_submission( object $attr, array $data ): submission {
		// Creates a post witht he submission data in it
		$this->post->insert_post( $attr, $data );

		// Sends a mail to the user and an admin
		//$this->mail->send_user_mail( $form_attr, $form_data )->send_admin_mail( $form_attr, $form_data );

		return $this;
	}

	// #### Spam Guard Check Methods ####

	// Checks if the honeypot was triggered
	private function check_honeypot( string $value ): bool {
		return ! empty( $value ) || strlen( $value ) > 0 ? true : false;
	}

	// Checks if the time tramp was triggered
	private function check_time_trap( string $encrypted_timestamp, int $time_trap_window ): bool {
		$current_timestamp = time();
		$form_timestamp = $this->helper_methods->decrypt_string( $encrypted_timestamp );

		if ( 
			! is_numeric( $form_timestamp )
			|| ( $current_timestamp - $form_timestamp <= $time_trap_window )
		) {
			return true;
		}

		return false;
	}

	// Checks all active spam guard features, if one of them was triggered
	// Returns true when a trap was triggered and false if not
	private function spam_guard_check( object $attr, array $data ): bool {
		// Checks Honeypot
		if ( $attr->sgHoneypot ) {
			$input_name = $this->get_root()->get_prefix( 'sg_hp' );
			$input_value = $this->helper_methods->get_input_value( $input_name, $data );

			if ( $this->check_honeypot( $input_value ) ) return true;
		}

		// Checks Time Trap
		if ( $attr->sgTimeTrap ) {
			$input_name = $this->get_root()->get_prefix( 'sg_tt' );
			$input_value = $this->helper_methods->get_input_value( $input_name, $data );

			if ( $this->check_time_trap( $input_value, $attr->sgTimeTrapWindow ) ) return true;
		}

		return false;
	}
}