<?php
namespace sv_gutenform;

class spam_guard extends modules {
	// ##### Initialization Methods #####

	public function init() {
	
	}

	public function start( int $level ) {
		switch ( $level ) {
			case 1:
				$this->input_trap();
				break;
			case 2:
				$this->input_trap();
				$this->time_trap();
				break;
			case 3:
				$this->input_trap();
				$this->time_trap();
				break;
		}
	}

	// ###### Trap (Level) Methods ######

	// Creates trap input fields, that will be hidden via JS
	private function input_trap() {

	}

	// Creates a hidden input field with an excrypted timestamp
	private function time_trap() {
		$encrypted_timestamp = $this->helper_methods->encrypt_string( time() );

		echo '<input type="hidden" name="sv_gutenform_sg_timestamp" value="' . $encrypted_timestamp . '" tabindex="-1" autocomplete="off" />';
	}
}