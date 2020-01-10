<?php
namespace sv_gutenform;

class archive_manager extends modules {
	protected $post_type;
	private $option_name;

	// ##### Initialization Methods #####

	public function init() {
		$this->set_properties();

		// Actions Hooks & Filter
		add_action( 'init', array( $this, 'init_archive' ) );
		add_action( 'manage_sv_gutenform_submit_posts_custom_column' , array( $this, 'set_post_column_values' ), 10, 2 );
		add_filter( 'manage_sv_gutenform_submit_posts_columns', array( $this, 'set_post_column_titles' ) );
		add_filter( 'post_row_actions', array( $this, 'set_post_row_actions' ), 10, 2 );
	}

	// Sets the object properties
	private function set_properties(): archive_manager {
		$this->post_type 	= $this->get_root()->get_prefix( 'submit' );
		$this->option 		= $this->get_root()->get_prefix( 'index' );

		return $this;
	}

	// Initializes the archive
	public function init_archive(): archive_manager {
		$this->init_submodules()
			->add_form_index()
			->register_post_type();

		return $this;
	}

	// Loads and initializes all submodules
	private function init_submodules(): archive_manager {
		$dir = $this->get_path( 'submodules' );
		$dir_array = array_diff( scandir( $dir ), array( '..', '.' ) );

		foreach( $dir_array as $key => $file ) {
			$filepath = $dir . '/' . $file;

			if ( file_exists( $filepath ) ) {
				require_once( $filepath );
				
				$filename = basename( $file, '.php' );
				$class_name = __NAMESPACE__ . '\\' . $filename;
				
				$this->$filename = new $class_name();
				$this->$filename->set_root( $this->get_root() );
				$this->$filename->set_parent( $this );
				$this->$filename->init();
				
			}
		}

		return $this;
	}

	
	// Registers an option to save all form ids in
	private function add_form_index(): archive_manager {
		add_option( $this->option_name );

		return $this;
	}

	// Registers a new custom post type
	private function register_post_type(): archive_manager {
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

	// ##### Getter Methods #####
	public function get_form_index(): array {
		return json_decode( get_option( $this->option_name ) );
	}

	// ##### Setter Methods #####

	// Checks if the form id exists in the form index and adds it, if not
	private function set_form_index( object $attr ): archive_manager {
		$forms_array = $this->get_form_index();
		$form_exists = in_array( $attr->formId, $this->get_form_index() );

		if ( ! $form_exists ) {
			$forms_array[] = $attr->formId;

			update_option( $this->option_name, json_encode( $forms_array ) );
		}

		return $this;
	}

	// Sets the titles of the post columns
	public function set_post_column_titles( array $columns ): array {
		$columns[ $this->get_root()->get_prefix( 'user_mail' ) ] 	= __( 'User Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'admin_mail' ) ] 	= __( 'Admin Mail', 'sv_gutenform' );
		$columns[ $this->get_root()->get_prefix( 'form_label' ) ] 	= __( 'Form Label', 'sv_gutenform' );
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
			case $this->get_root()->get_prefix( 'form_label' ):
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