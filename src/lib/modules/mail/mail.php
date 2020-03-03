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
	private function send_mail( $to, string $subject, string $content, array $headers ): mail {
		add_filter( 'wp_mail_content_type', function() { return 'text/html'; } );
		wp_mail( $to, $subject, $content, $headers );
		remove_filter( 'wp_mail_content_type', function() { return 'text/html'; } );

		return $this;
	}

	// Sends a mail to a auser
	private function send_user_mails( object $attr, array $data ): mail {
		if ( ! $attr || ! $data || ! isset( $attr->userMailSend ) || ! $attr->userMailSend ) return $this;
		if ( ! isset( $attr->userMailContent ) || empty( $attr->userMailContent ) ) return $this;

		// Mail Properties
		$to = $this->get_user_mails( $attr, $data );

		// Subject
		if ( isset( $attr->userMailSubject ) && ! empty( $attr->userMailSubject ) ) {
			$subject = $attr->userMailSubject;
		} else {
			$subject = __( 'Thank You', 'sv_gutenform' );
		}

		// Mail Content
		$content_attr = array(
			'title'         => $attr->userMailSubject,
			'content'       => $attr->userMailContent,
			'block_styles'  => isset( $attr->userMailBlockStyles ) ? $attr->userMailBlockStyles : '',
		);
		$content = $this->get_mail( $content_attr, $data );

		// Headers
		if ( 
			isset( $attr->userMailFromTitle ) 
			&& ! empty( $attr->userMailFromTitle ) 
			&& isset( $attr->userMailFromMail ) 
			&& ! empty( $attr->userMailFromMail ) 
		) {
			$headers = array(
				'From: ' . $attr->userMailFromTitle . ' <' . $attr->userMailFromMail . '>',
				'Sender: ' . $attr->userMailFromMail,
			);
		} else {
			$headers = array();
		}
		
		$this->send_mail( $to, $subject, $content, $headers );

		return $this;
	}
	
	// Sends a mail to an admin
	private function send_admin_mails( object $attr, array $data ): mail {
		if ( ! $attr || ! $data || ! isset( $attr->adminMailSend ) || ! $attr->adminMailSend ) return $this;
		if ( ! isset( $attr->adminMailContent ) || empty( $attr->adminMailContent ) ) return $this;

		// Mail Properties
		$to = $this->get_admin_mails( $attr );

		// Subject
		if ( isset( $attr->adminMailSubject ) && ! empty( $attr->adminMailSubject ) ) {
			$subject = $attr->adminMailSubject;
		} else {
			$subject = __( 'New Form Submission', 'sv_gutenform' );
		}

		// Mail Content
		$content_attr = array(
			'title'         => $attr->adminMailSubject,
			'content'       => $attr->adminMailContent,
			'block_styles'  => isset( $attr->adminMailBlockStyles ) ? $attr->adminMailBlockStyles : '',
		);
		$content = $this->get_mail( $content_attr, $data );

		// Headers
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

		$this->send_mail( $to, $subject, $content, $headers );

		return $this;
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

		if ( $to_users && count( $to_users ) > 0 ) {
			foreach( $to_users as $user_id ) {
				$user_mail = get_the_author_meta( 'user_email', intval( $user_id ) );

				if ( $user_mail ) {
					$email_adresses[] = $user_mail;
				}
			}
		}

		if ( $to_mails && count( $to_mails ) > 0 ) {
			foreach( $to_mails as $mail ) {
				$email_adresses[] = $mail;
			}
		}

		return $email_adresses;
	}

	// Returns the HTML mail
	private function get_mail( array $attr, array $data ): string {
		ob_start();

		require( $this->get_path( 'tpl/mail_header.php' ) );
		echo $this->cleanup_mail_content( $this->replace_input_values( $attr['content'], $data ) );
		require( $this->get_path( 'tpl/mail_footer.php' ) );

		$mail_content = ob_get_contents();
		ob_end_clean();

		return $mail_content;
	}

	// Replaces all input value place holders, with their respectively input values
	private function replace_input_values( string $content, array $data ): string {
		// Finds all string that starts and ends with %
		preg_match_all( '/%(.*?)%/s', $content, $input_names );

		$input_values = array();

		foreach( $input_names[1] as $index => $name ) {
			$value = $this->get_input_value( $name, $data );

			if ( $value && ! is_array( $value ) ) {
				$input_values[ $index ] = $this->get_input_value( $name, $data );
			}
		}

		$parsed_content = str_replace( $input_names[0], $input_values, $content );

		return $parsed_content;
	}

	// Returns the CSS styles for the mail content
	private function get_styles( string $block_styles ): string {
		// Default Block Styles
		$dir 		= $this->get_root()->get_path( 'lib/modules/mail/css/blocks/min' );
		$dir_array 	= array_diff( scandir( $dir ), array( '..', '.' ) );
		$styles 	= '<style type="text/css">';

		ob_start();

		// Always loaded first before the block styles
		if ( file_exists( $dir . '/../../default.min.css' )  ) {
			require( $dir . '/../../default.min.css' );
		}

		foreach( $dir_array as $file ) {
			if ( 
				is_file( $dir . '/' . $file ) 
				&& file_exists( $dir . '/' . $file ) 
			) {
				require( $dir . '/' . $file );
			}
		}

		$styles .= ob_get_contents();
		ob_end_clean();

		// Dynamic Block Styles
		$styles .= $block_styles;
		$styles .= '</style>';

		return $styles;
	}
	
	// Cleans the mail content from html comments, php comments and empty lines
	private function cleanup_mail_content( string $content ): string {
		$no_html_comments 	= preg_replace('/<!--(.|\s)*?-->/', '', $content);
		$no_php_comments 	= preg_replace('!/\*.*?\*/!s', '', $no_html_comments);
		$no_empty_lines		= preg_replace('/\n\s*\n/', "\n", $no_php_comments);

		return $no_empty_lines;
	}
}