<?php
namespace sv_gutenform;

class helper_methods extends modules {
	// SSL Cryption Properties
	private $ciphering 		= 'AES-128-CTR';
	private $options		= 0;
	private $cryption_key	= 'sv_gutenform_sg_cryption_key';
	private $cryption_iv	= '1234567891011121';

    // ##### Initialization Methods ##### 
    public function init() {

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
	public function remove_input_value( $name, array $data ): array {	
		$new_data = $data;
		
		foreach( $data as $index => $input ) {
			if ( is_string( $name ) ) {
				if ( $input['name'] === $name ) {
					unset( $new_data[ $index ] );
				}
			}

			if ( is_array( $name ) ) {
				if ( in_array( $input['name'], $name, true ) ) {
					unset( $new_data[ $index ] );
				}
			}
		}

		return $new_data;
	}

	// Returns an encrypted string
	// Source: https://www.geeksforgeeks.org/how-to-encrypt-and-decrypt-a-php-string/
	public function encrypt_string( string $string ): string {
		return openssl_encrypt( $string, $this->ciphering, $this->cryption_key, $this->options, $this->cryption_iv );
	}

	// Returns a decrypted string
	// Source: https://www.geeksforgeeks.org/how-to-encrypt-and-decrypt-a-php-string/
	public function decrypt_string( string $string ): string {
		return openssl_decrypt( $string, $this->ciphering, $this->cryption_key, $this->options, $this->cryption_iv );
	}
}