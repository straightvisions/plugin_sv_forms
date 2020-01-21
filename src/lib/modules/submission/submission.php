<?php
namespace sv_gutenform;

class submission extends modules {
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

		if ( $post_meta && $form_id && $post_meta->$form_id ) {
			$this->handle_submission( $post_meta->$form_id, $form_data );
		}
	}

	// Handles the form submission when it passed the spam guard check
	private function handle_submission( object $attr, array $data ): submission {
		$sanitized_data = $this->get_sanitized_data( $attr, $data );

		// Creates custom action hook, that passes a form data array and a form attr object
		do_action( $this->get_root()->get_prefix( 'form_submit' ), $form_data, $form_attr );

		// Creates a post witht he submission data in it
		$this->post->insert_post( $attr, $data );
		
		// Sends a mail to the user and an admin
		$this->mail->send_mails( $attr, $data );

		return $this;
	}

	// Returns a validated and sanitized data array
	private function get_sanitized_data( object $attr, array $data ): array {
		$sanitized_data = array();

		if ( ! isset( $attr->formInputs ) ) return $sanitized_data;

		$validated_data = $this->get_valid_data( json_decode( $attr->formInputs ), $data );
		
		// @todo continuie here sanitization
		foreach( $validated_data as $data ) {
			switch( $data['type'] ) {
				case 'text':
				case 'hidden':
					break;
			}
		}

		return $sanitized_data;
	}

	// Returns a data array containing only valid input data
	private function get_valid_data( array $attr_data, array $form_data ): array {
		$validated_data = array();
		$include = array( 'sv_gutenform_form_id', 'sv_gutenform_sg_hp', 'sv_gutenform_sg_tt' );

		// Inserts needed technical input fields into the validated_data array
		foreach( $form_data as $form_item ) {
			if ( $this->strpos_array( $form_item['name'], $include ) === 0 ) {
				$validated_data[] = $form_item;
			}
		}

		// Inserts only valid form data into the validated_data array,
		// by comparing the in the block predefined input names and types 
		// and the submitted form input names and types
		foreach( $attr_data as $attr_item ) {
			foreach( $form_data as $form_item ) {
				if ( $attr_item->name === $form_item['name'] && $attr_item->type === $form_item['type'] ) {
					$validated_data[] = $form_item;
				}
			}
		}

		return $validated_data;
	}
}