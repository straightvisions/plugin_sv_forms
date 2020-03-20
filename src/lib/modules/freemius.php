<?php
namespace sv_gutenform;

class freemius extends init {
	public function init() {
		global $sv_gutenform_freemius;

		if ( ! isset( $sv_gutenform_freemius ) ) {
            $sv_gutenform_freemius = fs_dynamic_init( array(
                'id'                  => '5765',
                'slug'                => 'sv-gutenform',
                'type'                => 'plugin',
                'public_key'          => 'pk_78bb68eaf401c9f6ad04a0ee8fca3',
                'is_premium'          => false,
                'has_addons'          => false,
                'has_paid_plans'      => false,
                'menu'                => array(
                    'slug'           => 'sv_gutenform',
                    'parent'         => array(
                        'slug' => 'straightvisions',
                    ),
                ),
            ) );
		}

		do_action( $this->get_root()->get_name().'_freemius_loaded' );
	}
}