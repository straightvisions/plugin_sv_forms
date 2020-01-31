<?php
namespace sv_gutenform;

class mail extends modules {  
    public function init() {}

	// Sends a mail to the user and the admin
	public function send_mails( object $attr, array $data ): mail {
		$this->send_user_mails( $attr, $data )->send_admin_mails( $attr, $data );

		return $this;
	}

	// Sends a mail
	private function send_mail( $to, string $subject, string $message, array $headers ): mail {
		add_filter( 'wp_mail_content_type', function() { return 'text/html'; } );
		wp_mail( $to, $subject, $message, $headers );
		remove_filter( 'wp_mail_content_type', function() { return 'text/html'; } );

		return $this;
	}

	// Replaces all input strings in the mail content, with the matching input values
	private function get_parsed_mail_content( string $mail_content, array $data ): string {
		preg_match_all( '/%(.*?)%/s', $mail_content, $input_names );

		$input_values = array();

		foreach( $input_names[1] as $index => $name ) {
			$value = $this->get_input_value( $name, $data );

			if ( $value && ! is_array( $value ) ) {
				$input_values[ $index ] = $this->get_input_value( $name, $data );
			}
		}

		$parsed_string = str_replace( $input_names[0], $input_values, $mail_content );

		return $parsed_string;
	}	

	// Returns the user mail adress
	private function get_user_mails( object $attr, array $data ): array {	
		if ( ! $attr->userMailToMails ) return array();

		$email_adresses = array();
		$input_names 	= json_decode( $attr->userMailToMails );

		foreach( $input_names as $name ) {
			$email_adresses[] = $this->get_input_value( $name, $data );
		}

		return $email_adresses;
	}

	// Returns the admin e-mail adress
	private function get_admin_mails( object $attr ): array {
		if ( ! $attr->adminMailToUsers && ! $attr->adminMailToMails ) return array();

		$email_adresses = array();
		$to_users 		= json_decode( $attr->adminMailToUsers );
		$to_mails 		= json_decode( $attr->adminMailToMails );

		if ( count( $to_users ) > 0 ) {
			foreach( $to_users as $user_id ) {
				$user_mail = get_the_author_meta( 'user_email', intval( $user_id ) );

				if ( $user_mail ) {
					$email_adresses[] = $user_mail;
				}
			}
		}

		if ( count( $to_mails ) > 0 ) {
			foreach( $to_mails as $mail ) {
				$email_adresses[] = $mail;
			}
		}

		return $email_adresses;
	}

	// Sends a mail to a auser
	private function send_user_mails( object $attr, array $data ): mail {
		if ( ! $attr || ! $data || ! isset( $attr->userMailSend ) || ! $attr->userMailSend ) return $this;

		// Mail Properties
		$to = $this->get_user_mails( $attr, $data );

		if ( isset( $attr->userMailSubject ) && ! empty( $attr->userMailSubject ) ) {
			$subject = $attr->userMailSubject;
		} else {
			$subject = __( 'Thank You', 'sv_gutenform' );
		}

		if ( isset( $attr->userMailContent ) && ! empty( $attr->userMailContent ) ) {
			$message = $this->get_parsed_mail_content( $attr->userMailContent, $data );
		} else {
			$message = __( 'Thank you for your submission!', 'sv_gutenform' );
		}

		if ( 
			isset( $attr->userMailFromTitle ) 
			&& ! empty( $attr->userMailFromTitle ) 
			&& isset( $attr->userMailFromMail ) 
			&& ! empty( $attr->userMailFromMail ) 
		) {
			$headers = array( 'From: ' . $attr->userMailFromTitle . ' <' . $attr->userMailFromMail . '>' );
		} else {
			$headers = array();
		}
		
		$this->send_mail( $to, $subject, $message, $headers );

		return $this;
	}
	
	// Sends a mail to an admin
	private function send_admin_mails( object $attr, array $data ): mail {
		if ( ! $attr || ! $data || ! isset( $attr->adminMailSend ) || ! $attr->adminMailSend ) return $this;

		// Mail Properties
		$to = $this->get_admin_mails( $attr );

		if ( isset( $attr->adminMailSubject ) && ! empty( $attr->adminMailSubject ) ) {
			$subject = $attr->adminMailSubject;
		} else {
			$subject = __( 'New Form Submit', 'sv_gutenform' );
		}

		if ( isset( $attr->adminMailContent ) && ! empty( $attr->adminMailContent ) ) {
			$message = $this->get_parsed_mail_content( $attr->adminMailContent, $data );
		} else {
			$message = __( 'A new form was submitted.', 'sv_gutenform' );
		}

		if ( 
			isset( $attr->adminMailFromTitle ) 
			&& ! empty( $attr->adminMailFromTitle ) 
			&& isset( $attr->adminMailFromMail ) 
			&& ! empty( $attr->adminMailFromMail ) 
		) {
			$headers = array( 'From: ' . $attr->adminMailFromTitle . ' <' . $attr->adminMailFromMail . '>' );
		} else {
			$headers = array();
		}

		$this->send_mail( $to, $subject, $message, $headers );

		return $this;
	}
}