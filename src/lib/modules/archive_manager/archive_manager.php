<?php
namespace sv_gutenform;

class archive_manager extends modules {
	// ##### Initialization Methods #####

	public function init() {
		// Actions Hooks & Filter
		add_action( 'manage_sv_gutenform_submit_posts_custom_column' , array( $this, 'set_post_column_values' ), 10, 2 );
		add_filter( 'manage_sv_gutenform_submit_posts_columns', array( $this, 'set_post_column_titles' ) );
		add_filter( 'post_row_actions', array( $this, 'set_post_row_actions' ), 10, 2 );
	}

	// Sets the titles of the post columns
	public function set_post_column_titles( array $columns ): array {
		$columns[ $this->get_root()->get_prefix( 'user_mail' ) ] 	= __( 'User Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'admin_mail' ) ] 	= __( 'Admin Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'form_id' ) ] 		= __( 'Form ID', 'sv_gutenform' );

		return $columns;
	}

	// Sets the value of the custom columns
	public function set_post_column_values( $column, $post_id ) {
		switch( $column ) {
			case $this->get_root()->get_prefix( 'user_mail' ):
				$meta_key 	= $this->get_root()->get_prefix( 'send_user_mail' );
				$user_mail 	= get_post_meta( $post_id, $meta_key, true ) ? boolval( get_post_meta( $post_id, $meta_key, true ) ) : false;

				if ( $user_mail ) {
					echo '<span class="dashicons dashicons-yes-alt"></span>';
				} else {
					echo '<span class="dashicons dashicons-dismiss"></span>';
				}
				break;
			case $this->get_root()->get_prefix( 'admin_mail' ):
				$meta_key 	= $this->get_root()->get_prefix( 'admin_mail' );
				$admin_mail = get_post_meta( $post_id, $meta_key, true ) && ! empty( get_post_meta( $post_id, $meta_key, true ) ) ? true : false;

				if ( $admin_mail ) {
					echo '<span class="dashicons dashicons-yes-alt"></span>';
				} else {
					echo '<span class="dashicons dashicons-dismiss"></span>';
				}
				break;
			case $this->get_root()->get_prefix( 'form_id' ):
				$meta_key = $this->get_root()->get_prefix( 'form_id' );
				echo get_post_meta( $post_id, $meta_key, true );
				break;
		}
	}

	// Adds custom post row actions to the sv_gutenform_submit post type
	public function set_post_row_actions( array $actions, object $post ): array {
		if ( $post->post_type === $this->get_root()->get_prefix( 'submit' ) && current_user_can( 'edit_post', $post->ID ) ) {
			// Building a link to open the post with the form of the submission
			$form_post_id 			= get_post_meta( $post->ID, $this->get_root()->get_prefix( 'post_id' ), true );
			$form_post_url 			= admin_url( 'post.php?post=' . $form_post_id );
			$edit_form_link 		= add_query_arg( array( 'action' => 'edit' ), $form_post_url );
			$edit_form_label		= sprintf( '<a href="%1$s">%2$s</a>', esc_url( $edit_form_link ), esc_html( __( 'Edit Form', 'sv_gutenform' ) ) );
			$actions[ $this->get_root()->get_prefix( 'edit_form' ) ] = $edit_form_label;

			// Building a link to resend the user mail
			$user_mail_meta_key = $this->get_root()->get_prefix( 'send_user_mail' );
			$user_mail = get_post_meta( $post->ID, $user_mail_meta_key, true ) ? boolval( get_post_meta( $post->ID, $user_mail_meta_key, true ) ) : false;
			
			if ( $user_mail ) {
				// @todo Add ajax link to resend mail
				$resend_user_mail_id = $this->get_root()->get_prefix( 'resend_user_mail' );
				$resend_user_mail_label	= sprintf( '<a href="#" id="' . $resend_user_mail_id . '">%1$s</a>', esc_html( __( 'Resend User Mail', 'sv_gutenform' ) ) );
				$actions[ $this->get_root()->get_prefix( 'resend_user_mail' ) ] = $resend_user_mail_label;
			}

			// Building a link to resend the admin mail
			$admin_mail_meta_key = $this->get_root()->get_prefix( 'admin_mail' );
			$admin_mail = get_post_meta( $post->ID, $admin_mail_meta_key, true ) && ! empty( get_post_meta( $post->ID, $admin_mail_meta_key, true ) ) ? true : false;
			
			if ( $admin_mail ) {
				// @todo Add ajax link to resend mail
				$resend_admin_mail_id = $this->get_root()->get_prefix( 'resend_admin_mail' );
				$resend_admin_mail_label = sprintf( '<a href="#" id="' . $resend_admin_mail_id . '">%1$s</a>', esc_html( __( 'Resend Admin Mail', 'sv_gutenform' ) ) );
				$actions[ $this->get_root()->get_prefix( 'resend_admin_mail' ) ] = $resend_admin_mail_label;
			}
		}

		return $actions;
	}
}