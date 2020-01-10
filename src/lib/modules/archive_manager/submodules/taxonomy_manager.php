<?php
namespace sv_gutenform;

class taxonomy_manager extends archive_manager {
	private $taxonomy;

	// ##### Initialization Methods #####

	public function init() {
		$this->set_properties()->register_taxonomy();
	}

	// Sets the object properties
	private function set_properties(): taxonomy_manager {
		$this->taxonomy = $this->get_root()->get_prefix( 'form_label' );

		return $this;
	}
	
	// Registers a new custom taxonomy for the custom post type
	private function register_taxonomy(): archive_manager {
		$args			= array(
			'label'        => __( 'Form Label', 'sv_gutenform' ),
			'public'       => false,
			'rewrite'      => false,
			'hierarchical' => true
		);

		register_taxonomy( $this->taxonomy, $this->get_parent()->post_type, $args );

		return $this;
	}

	// ###### Getter Methods ######

	// Returns the term by the form id
	private function get_term( string $form_id ) {
		$term 		= get_term_by( 'slug', md5( $form_id ), $this->taxonomy );

		return $term ? $term : false;
	}

	// ###### Setter Methods ######

	// Inserts a new term to the form_label taxonomy
	private function insert_term( string $term, string $form_id ): archive_manager {
		$args		= array( 'slug' => md5( $form_id ) );

		wp_insert_term( $term, $this->taxonomy, $args );

		return $this;
	}

	// Sets the post term by the form id
	private function set_post_term( int $post_id, string $form_id ) {
		$term 		= $this->get_term( $form_id );

		wp_set_post_terms( $post_id, array( $term->term_taxonomy_id ), $this->taxonomy );
	}
}