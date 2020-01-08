<?php
namespace sv_gutenform;

class spam_guard extends sv_gutenform {
	protected $block_attr = array();

	// ##### Initialization Methods #####

	public function init() {
		$this->register_block();
	}

	public function render_block( array $attr ): string {
		$this->block_attr = $attr;

		ob_start();
		
		require( $this->get_path( 'lib/frontend/tpl/spam_guard.php' ) );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	private function register_block() {
		register_block_type(
			'straightvisions/sv-gutenform-spam-guard', array(
				'editor_script' 	=> 'sv-gutenform-block',
				'editor_style'  	=> 'sv-gutenform-block-editor',
				'render_callback'	=> array( $this, 'render_block' ),
				'attributes'		=> array(
					// Honeypot Settings
					'honeypot' => array(
						'type' => 'bool',
					),

					// Time Trap Settings
					'timeTrap' => array(
						'type' => 'bool',
					),
					'timeTrapTimeWindow' => array(
						'type' => 'number',
						'default' => 10,
					),

					// Advanced Settings
					'className' => array(
						'type' => 'string',
					),
				),
			)
		);
	}

	// ###### Spam Guard - Features ######

	// Creates trap input fields, that will be hidden via JS
	private function honeypot() {
		echo '<input type="text" name="' .  $this->get_root()->get_prefix( 'sg_hp' ) . '" value="" tabindex="-1" autocomplete="off" style="display:none;" />';
	}

	// Creates a hidden input field with an encrypted timestamp
	private function time_trap() {
		$encrypted_timestamp = $this->helper_methods->encrypt_string( time() );

		echo '<input type="hidden" name="' . $this->get_root()->get_prefix( 'sg_tt' ) . '" value="' . $encrypted_timestamp . '" tabindex="-1" autocomplete="off" />';
	}

	// Starts the spam guard traps, base on the spam guard level
	public function start_spam_guard() {
		if ( $this->block_attr['honeypot'] ) $this->honeypot();
		if ( $this->block_attr['timeTrap'] ) $this->time_trap();
	}

	// #### Spam Guard Check Methods ####

	// Checks if the honeypot was triggered
	private function check_honeypot( string $value ): bool {
		return ! empty( $value ) ? true : false;
	}

	// Checks if the time tramp was triggered
	private function check_time_trap( string $encrypted_timestamp, int $time_trap_time_window ): bool {
		$current_timestamp 	= time();
		$form_timestamp		= $this->helper_methods->decrypt_string( $encrypted_timestamp );

		if ( 
			! is_numeric( $form_timestamp )
			|| ( $current_timestamp - $form_timestamp <= $time_trap_time_window )
		) {
			return true;
		}

		return false;
	}
}