<?php
namespace sv_gutenform;

class submission_manager extends modules {
	// ##### Initialization Methods #####

	public function init() {
		// Actions Hooks & Filter
		add_action( 'wp_ajax_sv_gutenform_submit', array( $this, 'ajax_sv_gutenform_submit' ) );
	}

	// This function will be called on form submit via Ajax
	public function ajax_sv_gutenform_submit() {
		if ( ! isset( $_POST) || empty( $_POST ) ) return;
		if ( ! wp_verify_nonce( $_POST['nonce'], 'sv_gutenform_submit' ) ) return;

		// Variables
		$post_id	= intval( $_POST['post_id'] );
		$post_meta 	= json_decode( get_post_meta( $post_id, '_sv_gutenform_forms', true ) );
		$form_data	= $_POST['form_data'];
		$form_id	= $this->helper_methods->get_input_value( 'form_id', $form_data );

		if ( $form_id && $post_meta->$form_id ) {
			$form_attr = $post_meta->$form_id;

			$this->archive_manager
					->add_post( $form_attr, $form_data )
				->mail_manager
					->send_user_mail( $form_attr, $form_data )
					->send_admin_mail( $form_attr, $form_data );
		}
	}
}