<?php
namespace sv_gutenform;

class helper_methods extends modules {
	// Cryption Properties
	private $ciphering 		= 'BF-CBC';
	private $options		= 0;
	private static $cryption_key;
	private static $iv_length;
	private static $cryption_iv;

    // ##### Initialization Methods ##### 
    public function init() {
		$this->generate_cryption_props();
	}

	private function generate_cryption_props() {
		static::$cryption_key	= openssl_digest( php_uname(), 'MD5', TRUE );
		static::$iv_length 		= openssl_cipher_iv_length( $this->ciphering );
		static::$cryption_iv 	= random_bytes( static::$iv_length );
	}
    
    // Returns an input value from an data array, by it's input name
	public function get_input_value( string $name, array $data, bool $single = true ) {
		$values = array();
		
		foreach( $data as $input ) {
			if ( $input['name'] === $name ) {
				if ( $single ) {
					return $input['value'];
				} else {
					$values[] = $input['value'];
				}
			}
		}

		return $values;
	}

	// Removes a certain input value from an data array, by it's input name and returns the updated data array
	public function remove_input_value( string $name, array $data ) {	
		$new_data = $data;
		
		foreach( $data as $index => $input ) {
			if ( $input['name'] === $name ) {
				unset( $new_data[ $index ] );
			}
		}

		return $new_data;
	}

	// Returns an encrypted string
	// Source: https://www.geeksforgeeks.org/how-to-encrypt-and-decrypt-a-php-string/
	public function encrypt_string( string $string ): string {
		return openssl_encrypt( $string, $this->ciphering, static::$cryption_key, $this->options, static::$cryption_iv );
	}

	// Returns a decrypted string
	// Source: https://www.geeksforgeeks.org/how-to-encrypt-and-decrypt-a-php-string/
	public function decrypt_string( string $string ): string {
		return openssl_decrypt( $string, $this->ciphering, static::$cryption_key, $this->options, static::$cryption_iv );
	}
}