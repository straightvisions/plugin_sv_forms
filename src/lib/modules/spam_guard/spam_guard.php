<?php
namespace sv_gutenform;

class spam_guard extends modules {
	// ##### Initialization Methods #####

	public function init() {
	
	}

	// ####### Trap Init Methods #######

	// Creates trap input fields, that will be hidden via JS
	private function input_trap() {
		echo '<input type="phone" name="personal_fax_number" value="0" tabindex="-1" autocomplete="off" style="display:none;" />';
	}

	// Creates a hidden input field with an encrypted timestamp
	private function time_trap() {
		$encrypted_timestamp = $this->helper_methods->encrypt_string( time() );

		echo '<input type="hidden" name="sv_gutenform_sg_timestamp" value="' . $encrypted_timestamp . '" tabindex="-1" autocomplete="off" />';
	}

	// Starts the spam guard traps, base on the spam guard level
	public function start( int $level ) {
		switch ( $level ) {
			// Low Spam Filter
			case 1:
				$this->input_trap();
				break;

			// Medium Spam Filter
			case 2:
				$this->input_trap();
				$this->time_trap();
				break;

			// Strong Spam Filter
			case 3:
				$this->input_trap();
				$this->time_trap();
				break;
		}
	}

	// ####### Trap Check Methods #######

	// Checks if the input trap was triggered
	private function check_input_trap( string $value ) {
		return $value !== '0' ? true : false;
	}

	// Checks if the time tramp was triggered
	private function check_time_trap( string $ecrypted_timestamp ): bool {
		$current_timestamp 	= time();
		$form_timestamp		= $this->helper_methods->decrypt_string( $ecrypted_timestamp );
		$trap_window_in_sec	= 10;

		if ( 
			! is_numeric( $form_timestamp )
			|| ( $current_timestamp - $form_timestamp <= $trap_window_in_sec )
		) {
			return true;
		}

		return false;
	}

	// Checks the spam guard traps based on the spam guard level and returns true, when a trap is triggered
	public function check( object $attr, array $data ): bool {
		switch( $attr->spamGuardLevel ) {
			// Low Spam Filter
			case 1:
				return $this->check_input_trap( $this->helper_methods->get_input_value( 'personal_fax_number', $data ) );
				break;

			// Medium Spam Filter
			case 2:
				$time_trap_check = $this->check_time_trap( $this->helper_methods->get_input_value( 'sv_gutenform_sg_timestamp', $data ) );

				if ( $time_trap_check ) return true;
				return false;
				break;

			// Strong Spam Filter
			case 3:
				return false;
				break;
		}

		return false;
	}
}