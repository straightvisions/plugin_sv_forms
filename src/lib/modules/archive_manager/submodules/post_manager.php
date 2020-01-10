<?php
namespace sv_gutenform;

class post_manager extends archive_manager {
	// ##### Initialization Methods #####

	public function init() {
    }

    // ###### Getter Methods ######

    // Filters the form data and removes technical relevant data values
    private function get_filtered_form_data( array $data ): array {
        $input_values_to_be_removed = array(
            $this->get_root()->get_prefix( 'form_id' ),
            $this->get_root()->get_prefix( 'sg_hp' ),
            $this->get_root()->get_prefix( 'sg_tt' ),
        );

        $filtered_form_data = $this->helper_methods->remove_input_value( $input_values_to_be_removed, $data );

        return $filtered_form_data;
    }

    // Returns the form data as table for the post content
    private function get_post_content( array $data ): string {
        $filtered_form_data = $this->get_filtered_form_data( $data );
        $content = '<!-- wp:table --><figure class="wp-block-table"><table class=""><tbody>';

        foreach( $filtered_form_data as $input ) {
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
            $form_data_meta_key 		=> json_encode( $this->get_filtered_form_data( $data ) ),
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

    // ###### Setter Methods ######

    // Adds the submission as a new post
    private function insert_post( object $attr, array $data ): archive_manager {
        if ( ! $attr || ! $data || ! $attr->saveSubmits ) return $this;

        // Post Arguments
        $postarr = array(
            'post_title'	=> __( 'Submission from Post #', 'sv_gutenform' ) . $attr->postId, 
            'post_content'	=> $this->get_submission_content( $data ),
            'post_type'		=> $this->get_root()->get_prefix( 'submit' ),
            'post_status'	=> 'publish',
            'meta_input'	=> $this->get_submission_meta( $attr, $data ),
        );
        
        $post_id = wp_insert_post( $postarr );

        $this->update_form_index( $attr );
            //->add_new_term( $attr->formLabel, $attr->formId )
            //->set_submission_term( $post_id, $attr->formId );

        return $this;
    }
}