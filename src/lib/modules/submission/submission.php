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
		$form_id	= $this->get_input_value( $this->get_root()->get_prefix( 'form_id' ), $form_data );

		if ( $form_id && $post_meta->$form_id ) {
			$form_attr = $post_meta->$form_id;

			// Creates custom action hook, that passes a form data array and a form attr object
			do_action( $this->get_root()->get_prefix( 'form_submit' ), $form_data, $form_attr );

			if ( ! $this->spam_guard_check->run_check( $form_attr, $form_data ) ) {
				$this->handle_submission( $form_attr, $form_data );
				$this->ajaxStatus('success', $form_attr, $form_data);
			}
		}
	}

	// Handles the form submission when it passed the spam guard check
	private function handle_submission( object $attr, array $data ): submission {
		// Creates a post witht he submission data in it
		$this->post->insert_post( $attr, $data );
		
		// Sends a mail to the user and an admin
		$this->mail->send_mails( $attr, $data );

		return $this;
	}
}