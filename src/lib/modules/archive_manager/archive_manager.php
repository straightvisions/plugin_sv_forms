<?php
namespace sv_gutenform;

class archive_manager extends modules {
	// ##### Initialization Methods #####

	public function init() {
		// Actions Hooks & Filter
		add_action( 'init', array( $this, 'register_custom_post_type' ) );
		add_action( 'manage_sv_gutenform_submit_posts_custom_column' , array( $this, 'custom_sv_gutenform_submission_column' ), 10, 2 );
		add_filter( 'manage_sv_gutenform_submit_posts_columns', array( $this, 'set_custom_edit_sv_gutenform_submission_columns' ) );
		add_filter( 'post_row_actions', array( $this, 'modify_post_row_actions' ), 10, 2 );
		add_filter( 'wp_privacy_personal_data_exporters', array( $this, 'register_personal_data_exporter' ), 10 );
		add_filter( 'wp_privacy_personal_data_erasers', array( $this, 'register_personal_data_eraser' ), 10 );
	}
	
	// Registers a new custom post type
	public function register_custom_post_type() {
		$labels 	= array(
			'name'                  => __( 'Submissions', 'sv_gutenform' ),
			'singular_name'         => __( 'Submission', 'sv_gutenform' ),
			'menu_name'             => __( 'SV Gutenform Submission', 'sv_gutenform' ),
			'name_admin_bar'        => __( 'SV Gutenform Submission', 'sv_gutenform' ),
			'add_new'               => __( 'Add New', 'sv_gutenform' ),
			'add_new_item'          => __( 'Add New Submission', 'sv_gutenform' ),
			'new_item'              => __( 'New Submission', 'sv_gutenform' ),
			'edit_item'             => __( 'Edit Submission', 'sv_gutenform' ),
			'view_item'             => __( 'View Submission', 'sv_gutenform' ),
			'all_items'             => __( 'All Submissions', 'sv_gutenform' ),
			'search_items'          => __( 'Search Submissions', 'sv_gutenform' ),
			'parent_item_colon'     => __( 'Parent Submissions:', 'sv_gutenform' ),
			'not_found'             => __( 'No Submissions found.', 'sv_gutenform' ),
			'not_found_in_trash'    => __( 'No Submissions found in Trash.', 'sv_gutenform' ),
			'archives'              => __( 'Submission archives', 'sv_gutenform' ),
			'insert_into_item'      => __( 'Insert into Submission', 'sv_gutenform' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Submission', 'sv_gutenform' ),
			'filter_items_list'     => __( 'Filter Submissions list', 'sv_gutenform' ),
			'items_list_navigation' => __( 'Submissions list navigation', 'sv_gutenform' ),
			'items_list'            => __( 'Submissions list', 'sv_gutenform' ),
		);
		$supports	= array( 'editor', 'custom-fields' );
		$args 		= array(
			'labels'				=> $labels,
			'public'				=> false,
			'hierarchical'			=> false,
			'publicly_queryable'	=> false,
			'show_ui'				=> true,
			'show_in_menu'			=> true,
			'show_in_nav_menus'		=> false,
			'show_in_admin_bar'		=> true,
			'show_in_rest'			=> true,
			'capability_type'		=> 'post',
			'has_archive'			=> true,
			'supports'				=> $supports,
		);	

		register_post_type( $this->get_root()->get_prefix( 'submit' ), $args );

		return $this;
	}

	// Sets the title of the custom columns
	public function set_custom_edit_sv_gutenform_submission_columns( array $columns ): array {
		$columns[ $this->get_root()->get_prefix( 'user_mail' ) ] 	= __( 'User Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'admin_mail' ) ] 	= __( 'Admin Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'form_id' ) ] 	= __( 'Form ID', 'sv_gutenform' );

		return $columns;
	}

	// Sets the value of the custom columns
	public function custom_sv_gutenform_submission_column( $column, $post_id ) {
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
	public function modify_post_row_actions( array $actions, object $post ): array {
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

	// ###### Post Creation Methods ######

	// Returns the form data as table for the post content
	private function get_post_content( array $data ): string {
		$meta_key 	= $this->get_root()->get_prefix( 'form_id' );
		$new_data 	= $this->helper_methods->remove_input_value( $meta_key, $data );
		$content 	= '<!-- wp:table --><figure class="wp-block-table"><table class=""><tbody>';

		foreach( $new_data as $input ) {
			$content .= '<tr><td>' . $input['name'] . '</td><td>' . $input['value'] . '</td></tr>';
		}

		$content .= '</tbody></table></figure><!-- /wp:table -->';

		return $content;
	}

	// Returns the submission data as post meta array
	private function get_post_meta( object $attr, array $data ): array {
		// Meta Keys
		$post_id_meta_key 			= $this->get_root()->get_prefix( 'post_id' );
		$form_id_meta_key 			= $this->get_root()->get_prefix( 'form_id' );
		$form_data_meta_key 		= $this->get_root()->get_prefix( 'form_data' );
		$user_mail_meta_key			= $this->get_root()->get_prefix( 'user_mail' );
		$send_user_mail_meta_key 	= $this->get_root()->get_prefix( 'send_user_mail' );

		// Meta Array
		$meta = array(
			$post_id_meta_key 			=> $attr->postId,
			$form_id_meta_key			=> $attr->formId,
			$form_data_meta_key 		=> json_encode( $this->helper_methods->remove_input_value( $form_id_meta_key, $data ) ),
			$send_user_mail_meta_key 	=> isset( $attr->userMail ) && $attr->userMail ? 1 : 0,
		);

		// User Mail
		if ( ! empty( $attr->userMailInputName ) ) {
			if ( $this->helper_methods->get_input_value( $attr->userMailInputName, $data ) ) {
				$meta[ $user_mail_meta_key ] = $this->helper_methods->get_input_value( $attr->userMailInputName, $data );
			}
		}

		// Admin Mail
		if ( $attr->adminMail !== 'disabled' ) {
			switch ( $attr->adminMail ) {
				// E-Mail Adress
				case 'adress':
					$meta[ $admin_mail_meta_key ] = $attr->adminMailAdress;
					break;

				// Author
				case 'author':
					$meta[ $admin_mail_meta_key ] = get_the_author_meta( 'user_email', $attr->adminMailUser );
					break;
			}
		}

		return $meta;
	}

	// Adds the submission as a new post
	public function add_post( object $attr, array $data ): archive_manager {
		if ( ! $attr || ! $data || ! $attr->saveSubmits ) return $this;

		// Post Arguments
		$postarr = array(
			'post_title'	=> __( 'Submission from Post #', 'sv_gutenform' ) . $attr->postId, 
			'post_content'	=> $this->get_post_content( $data ),
			'post_type'		=> $this->get_root()->get_prefix( 'submit' ),
			'post_status'	=> 'publish',
			'meta_input'	=> $this->get_post_meta( $attr, $data ),
		);
		
		wp_insert_post( $postarr );

		return $this;
	}

	// ###### Personal Data Methods ######

	// Fetches all submissions linked to the email adress
	private function get_posts_by_email( string $email ): array {
		$meta_key = $this->get_root()->get_prefix( 'user_mail' );

		$query_args		= array(
			'posts_per_page' => -1,
			'post_type'		=> $this->get_root()->get_prefix( 'submit' ),
			'meta_query' 	=> array(
				array(
					'key'		=> $meta_key,
					'value' 	=> $email,
					'compare' 	=> '=',
				),
			),
		);
		
		return get_posts( $query_args );
	}

	// Returns all the personal data that is connected with the given email adress
	public function personal_data_exporter( string $email, int $page = 1 ): array {
		$number 		= 500;
		$export_items 	= array();
		$posts			= $this->get_posts_by_email( $email );
		$meta_key		= $this->get_root()->get_prefix( 'form_data' );

		// Fetches all data for each submission
		foreach ( $posts as $post ) {
			$form_data 	= json_decode( get_post_meta( $post->ID, $meta_key, true ) );
			$item_id 	= 'sv-gutenform-submission-' . $post->ID;
			$group_id 	= 'sv-gutenform-submissions';
			$group_label= __( 'SV Gutenform Submissions', 'sv_gutenform' );
			$data		= array();
			
			foreach ( $form_data as $form_input ) {
				$data[] = get_object_vars( $form_input );
			}

			$export_items[] = array(
				'group_id'		=> $group_id,
				'group_label'	=> $group_label,
				'item_id'		=> $item_id,
				'data'			=> $data,
			);
		}
		
		$done = count( $posts ) < $number;

		return array(
			'data'	=> $export_items,
			'done'	=> $done,
		);
	}

	// Registers the personal data exporter
	public function register_personal_data_exporter( array $exporters ): array {
		$exporters[ $this->get_root()->get_prefix() ] = array(
			'exporter_friendly_name' => __( 'SV Gutenform Plugin', 'sv_gutenform' ),
			'callback' => array( $this, 'personal_data_exporter' ),
		);

		return $exporters;
	}

	// Deletes all the personal data that is connected with the given email adress
	public function personal_data_eraser( string $email, int $page = 1 ): array {
		$number 		= 500;
		$export_items 	= array();
		$posts			= $this->get_posts_by_email( $email );
		$items_removed	= false;

		// Fetches all data for each submission
		foreach ( $posts as $post ) {
			wp_delete_post( $post->ID, true );
		}

		if ( count( $this->get_posts_by_email( $email ) ) < 1 ) {
			$items_removed = true;
		}
		
		$done = count( $posts ) < $number;

		return array(
			'items_removed'	 => $items_removed,
			'items_retained' => false,
			'messages' => '',
			'done' => $done,
		);
	}

	// Registers the personal data eraser
	public function register_personal_data_eraser( array $erasers ): array {
		$erasers[ $this->get_root()->get_prefix() ] = array(
			'eraser_friendly_name' => __( 'SV Gutenform Plugin', 'sv_gutenform' ),
			'callback' => array( $this, 'personal_data_eraser' ),
		);

		return $erasers;
	}
}