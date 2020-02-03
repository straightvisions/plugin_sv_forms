<?php
namespace sv_gutenform;

class post extends modules {
	public function init() {
        $this->add_form_index();

        // Actions Hooks & Filter
        add_action( 'init', array( $this, 'register_post_type' ) );
    }
    
    // Registers an option to save all form ids in
	private function add_form_index(): post {
		add_option( $this->get_root()->get_prefix( 'index' ) );

		return $this;
    }

    // Registers a new custom post type
	public function register_post_type(): post {
		$labels = array(
			'name'                  => __( 'Submissions', 'sv_gutenform' ),
			'singular_name'         => __( 'Submission', 'sv_gutenform' ),
			'menu_name'             => __( 'SV Gutenform Submissions', 'sv_gutenform' ),
			'name_admin_bar'        => __( 'SV Gutenform Submissions', 'sv_gutenform' ),
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
        $supports = array( 'editor', 'custom-fields' );
        $capabilities = array(
            'create_posts' => false,
        );
		$args = array(
			'labels'				=> $labels,
            'public'				=> false,
            'hierarchical'			=> false,
            'exclude_from_search'	=> true,
			'publicly_queryable'	=> false,
			'show_ui'				=> true,
			'show_in_menu'			=> true,
			'show_in_nav_menus'		=> false,
            'show_in_rest'			=> true,
            'capability_type'       => $this->get_post_type(),
            'capabilities'          => $capabilities,
            'map_meta_cap'          => true,
            'supports'				=> $supports,
            'taxonomies'            => array( $this->taxonomy->get_taxonomy() ),
            'has_archive'			=> false,
            'query_var'             => false,
            'delete_with_user'		=> false,
        );

        register_post_type( $this->get_post_type(), $args );

        do_action( $this->get_root()->get_prefix( 'register_post_type' ) );

		return $this;
    }
    
    // Returns the name of the custom post type
    public function get_post_type(): string {
        return $this->get_root()->get_prefix( 'submit' );
    }

    // Returns the form index option value
    public function get_form_index(): array {
        $option_name    = $this->get_root()->get_prefix( 'index' );
        $option_value   = get_option( $option_name );

		return empty( $option_value ) ? array() : json_decode( $option_value );
	}

    // Returns the form data as table for the post content
    private function get_post_content( array $data ): string {
        $filtered_data = $this->remove_input_value( 'sv_gutenform_form_id', $data );

        $content = '<!-- wp:table --><figure class="wp-block-table"><table class=""><tbody>';

        foreach( $filtered_data as $input ) {
            $content .= '<tr><td>' . $input['name'] . '</td><td>' . $input['value'] . '</td></tr>';
        }

        $content .= '</tbody></table></figure><!-- /wp:table -->';

        return $content;
    }

    // Returns the submission data as post meta array
    private function get_post_meta( object $attr, array $data ): array {
        // Meta Keys
        $post_id_key 			= '_' . $this->get_root()->get_prefix( 'post_id' );
        $form_id_key 			= '_' . $this->get_root()->get_prefix( 'form_id' );
        $form_data_key 		    = '_' . $this->get_root()->get_prefix( 'form_data' );
        $user_mail_sent_key		= '_' . $this->get_root()->get_prefix( 'user_mail_sent' );
        $user_mail_mails_key    = '_' . $this->get_root()->get_prefix( 'user_mail_mails' );
        $admin_mail_sent_key    = '_' . $this->get_root()->get_prefix( 'admin_mail_sent' );
        $admin_mail_users_key   = '_' . $this->get_root()->get_prefix( 'admin_mail_mails' );
        $admin_mail_mails_key	= '_' . $this->get_root()->get_prefix( 'admin_mail_mails' );

        // Meta Array
        $meta = array(
            $post_id_key 			=> $attr->postId,
            $form_id_key			=> $attr->formId,
            $form_data_key 		    => json_encode( $data ),
            $user_mail_sent_key     => $attr->userMailSend ? 1 : 0,
            $user_mail_mails_key    => $attr->userMailToMails,
            $admin_mail_sent_key    => $attr->adminMailSend ? 1 : 0,
            $admin_mail_users_key   => $attr->adminMailToUsers,
            $admin_mail_mails_key   => $attr->adminMailToMails,
        );

        return $meta;
    }

    // Adds the submission as a new post
    public function insert_post( object $attr, array $data ): post {
        if ( ! $attr || ! $data || ! $attr->saveSubmissions ) return $this;

        $form_post = get_post( $attr->postId );

        // Post Arguments
        $postarr = array(
            'post_title'	=> $form_post->post_title . ' (' . $form_post->ID . ')',
            'post_content'	=> $this->get_post_content( $data ),
            'post_type'		=> $this->get_post_type(),
            'post_status'	=> 'publish',
            'meta_input'	=> $this->get_post_meta( $attr, $data ),
        );

        $post_id = wp_insert_post( $postarr );
        
        if ( $post_id ) {
            $this->set_form_index( $attr->formId )->taxonomy->set_post_term( $post_id, $attr );
        }

        return $this; 
    }

    // Checks if the form id exists in the form index and adds it, if not
	private function set_form_index( string $form_id ): post {
		$forms_array = $this->get_form_index();
		$form_exists = in_array( $form_id, $forms_array );

		if ( ! $form_exists ) {
            $forms_array[]  = $form_id;
            $option_name    = $this->get_root()->get_prefix( 'index' );

			update_option( $option_name, json_encode( $forms_array ) );
		}

		return $this;
    }
}