<?php
namespace sv_forms;

class submission extends modules {
	public function init() {
		// Actions Hooks & Filter
		add_action( 'wp_ajax_sv_forms_submit', array( $this, 'ajax_sv_forms_submit' ) );
		add_action( 'wp_ajax_nopriv_sv_forms_submit', array( $this, 'ajax_sv_forms_submit' ) );
	}

	// This function will be called on form submit via Ajax
	public function ajax_sv_forms_submit() {
		if ( ! isset( $_POST) || empty( $_POST ) ) return;
		/* @notice Deactivated due to problem with caching
		$nonce = isset( $_POST[ $this->get_root()->get_prefix( 'nonce' ) ] ) 
			? $_POST[ $this->get_root()->get_prefix( 'nonce' ) ] 
			: false;

		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'sv_forms_submit' ) ) return;
		*/

		$post_id = isset( $_POST[ $this->get_root()->get_prefix( 'post_id' ) ] ) 
			? $_POST[ $this->get_root()->get_prefix( 'post_id' ) ] 
			: false;

		if ( $post_id === false ) return;

		// Variables
		$post_id 	= intval( $post_id );
		$post_meta 	= json_decode( get_post_meta( $post_id, '_sv_forms_forms', true ) );
		$form_data	= json_decode( stripslashes( $_POST[ $this->get_root()->get_prefix( 'form_data' ) ] ), true );
		$form_id	= $this->get_input_value( $this->get_root()->get_prefix( 'form_id' ), $form_data );
		
		if ( $post_meta && $form_id && $post_meta->$form_id ) {
			$this->handle_submission( $post_meta->$form_id, $form_data );
		}
	}

	// Handles the form submission when it passed the spam guard check
	private function handle_submission( object $attr, array $data ): submission {
		$sanitized_data = $this->get_sanitized_data( $attr, $data );
		
		if ( ! $this->spam_guard_check->run_check( $attr, $sanitized_data ) ) {
			// Creates custom action hook, that passes a form data array and a form attr object
			// action name: sv_forms_form_submit
			do_action( $this->get_root()->get_prefix( 'form_submit' ), $sanitized_data, $attr );

			// Creates a post witht he submission data in it
			$this->post->insert_post( $attr, $sanitized_data );
			
			// Sends a mail to the user and an admin
			$this->mail->send_mails( $attr, $sanitized_data );
		}

		return $this;
	}

	// Returns a validated and sanitized data array
	private function get_sanitized_data( object $attr, array $data ): array {
		$sanitized_data = array();

		if ( ! isset( $attr->formInputs ) ) return $sanitized_data;

		$validated_data = $this->get_valid_data( json_decode( $attr->formInputs ), $data );

		foreach( $validated_data as $data_item ) {
			$new_data = array(
				'name'	=> $data_item['name'],
				'type'	=> $data_item['type'],
			);

			switch( $data_item['type'] ) {
				case 'text':
				case 'hidden':
				case 'password':
				case 'checkbox':
				case 'radio':
				case 'select':
				case 'tel': 
					$new_data['value'] = sanitize_text_field( $data_item['value'] );
					break;
				case 'textarea':
					$new_data['value'] = sanitize_textarea_field( $data_item['value'] );
					break;
				case 'email':
					$new_data['value'] = sanitize_email( $data_item['value'] );
					break;
				case 'url':
					$new_data['value'] = esc_url_raw( $data_item['value'] );
					break;
				case 'number':
				case 'range':
					$new_data['value'] = intval( $data_item['value'] );
					break;
				case 'date':
					$new_data['value'] = preg_replace( '([^0-9-])', '', $data_item['value'] );
					break;
				case 'file':
					if ( count( $_FILES ) > 0 ) {
						$new_data['value'] = $this->get_file_path( $_FILES[ $new_data['name'] ] );
					}
					break;
			}

			if ( isset( $new_data['value'] ) && ! empty( $new_data['value'] ) ) {
				$sanitized_data[] = $new_data;
			}
		}

		return $sanitized_data;
	}

	// Uploads the file to the temp dir and return the file path
	private function get_file_path( array $file ): string {
		$file_path = $this->files->upload_file( $file );

		return $file_path ? $file_path : '';
	}

	// Returns a data array containing only valid input data
	private function get_valid_data( array $attr_data, array $form_data ): array {
		$validated_data = array();
		$include = array( 'sv_forms_form_id', 'sv_forms_sg_hp', 'sv_forms_sg_tt' );

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