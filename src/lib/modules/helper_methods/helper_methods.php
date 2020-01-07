<?php
namespace sv_gutenform;

class helper_methods extends modules {
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
	public function remove_input_value( string $name, array $data ) {	
		$new_data = $data;
		
		foreach( $data as $index => $input ) {
			if ( $input['name'] === $name ) {
				unset( $new_data[ $index ] );
			}
		}

		return $new_data;
	}
}