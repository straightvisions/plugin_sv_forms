<?php 
    echo 'SV Gutenform - ' . __( 'New Submit', 'sv_gutenform' ) . "\r\n\n";
    echo __( 'Form Data', 'sv_gutenform' ) . "\r\n";
    echo $this->get_form_data( $data, true );