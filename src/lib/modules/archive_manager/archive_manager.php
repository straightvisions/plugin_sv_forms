<?php
namespace sv_gutenform;

class archive_manager extends modules {
	// ##### Initialization Methods #####

	public function init() {
		// Actions Hooks & Filter
		add_action( 'init', array( $this, 'register_custom_post_type' ) );
		add_action( 'manage_sv_gutenform_submit_posts_custom_column' , array( $this, 'custom_sv_gutenform_submit_column' ), 10, 2 );
		add_filter( 'manage_sv_gutenform_submit_posts_columns', array( $this, 'set_custom_edit_sv_gutenform_submit_columns' ) );
	}
	
	// Registers a new custom post type
	public function register_custom_post_type() {
		$labels 	= array(
			'name'                  => __( 'Submits', 'sv_gutenform' ),
			'singular_name'         => __( 'Submit', 'sv_gutenform' ),
			'menu_name'             => __( 'SV Gutenform Submits', 'sv_gutenform' ),
			'name_admin_bar'        => __( 'SV Gutenform Submits', 'sv_gutenform' ),
			'add_new'               => __( 'Add New', 'sv_gutenform' ),
			'add_new_item'          => __( 'Add New Submit', 'sv_gutenform' ),
			'new_item'              => __( 'New Submit', 'sv_gutenform' ),
			'edit_item'             => __( 'Edit Submit', 'sv_gutenform' ),
			'view_item'             => __( 'View Submit', 'sv_gutenform' ),
			'all_items'             => __( 'All Submits', 'sv_gutenform' ),
			'search_items'          => __( 'Search Submits', 'sv_gutenform' ),
			'parent_item_colon'     => __( 'Parent Submits:', 'sv_gutenform' ),
			'not_found'             => __( 'No Submits found.', 'sv_gutenform' ),
			'not_found_in_trash'    => __( 'No Submits found in Trash.', 'sv_gutenform' ),
			'archives'              => __( 'Submit archives', 'sv_gutenform' ),
			'insert_into_item'      => __( 'Insert into Submit', 'sv_gutenform' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Submit', 'sv_gutenform' ),
			'filter_items_list'     => __( 'Filter Submits list', 'sv_gutenform' ),
			'items_list_navigation' => __( 'Submits list navigation', 'sv_gutenform' ),
			'items_list'            => __( 'Submits list', 'sv_gutenform' ),
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

		register_post_type( 'sv_gutenform_submit', $args );

		return $this;
	}

	// Sets the title of the custom columns
	public function set_custom_edit_sv_gutenform_submit_columns( array $columns ): array {
		$columns['post_id'] = __( 'Post ID', 'sv_gutenform' );
		$columns['form_id'] = __( 'Form ID', 'sv_gutenform' );

		return $columns;
	}

	// Sets the value of the custom columns
	public function custom_sv_gutenform_submit_column( $column, $post_id ) {
		switch( $column ) {
			case 'post_id':
				echo get_post_meta( $post_id, 'post_id', true );
				break;
			case 'form_id':
				echo get_post_meta( $post_id, 'form_id', true );
				break;
		}
	}

	// ######### Helper Methods #########

	// Returns the form data as table
	private function get_post_content( array $data ): string {
		$content = '<!-- wp:table --><figure class="wp-block-table"><table class=""><tbody>';

		foreach( $data as $input ) {
			if ( $input['name'] !== 'form_id' ) {
				$content .= '<tr><td>' . $input['name'] . '</td><td>' . $input['value'] . '</td></tr>';
			}
		}

		$content .= '</tbody></table></figure><!-- /wp:table -->';

		return $content;
	}

	// Adds the submission as a new post
	public function add_post( object $attr, array $data ): archive_manager {
		if ( ! $attr || ! $data || ! $attr->saveSubmits ) return $this;

		$postarr = array(
			'post_title'	=> __( 'Submission from Post #', 'sv_gutenform' ) . $attr->postId, 
			'post_content'	=> $this->get_post_content( $data ),
			'post_type'		=> 'sv_gutenform_submit',
			'post_status'	=> 'publish',
			'meta_input'	=> array(
				'post_id'	=> $attr->postId,
				'form_id'	=> $attr->formId,
			),
		);
		
		wp_insert_post( $postarr );

		return $this;
	}
}