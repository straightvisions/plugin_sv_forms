// Variables
const localized     = js_sv_gutenform_modules_sv_gutenform_scripts_form_js;

// Functions
const showThankYou  = form => {
    const el        = form.find( '.straightvisions-block-sv-gutenform-thank-you' );

    if ( el ) {
        el.insertAfter( form );


        form.hide( 'slow', function() {
            el.show( 'slow' );
        } );
    }
}

jQuery( 'form.straightvisions-block-sv-gutenform' ).submit( function( e ) {
    e.preventDefault();
    
    const form  = jQuery( this );

    jQuery.post( localized.ajaxurl, {
        action: 'sv_gutenform_submit',
        nonce: localized.nonce,
        post_id: localized.post_id,
        form_data: form.serializeArray(),
    }, function( response ) {
        //response = JSON.parse( response );
        showThankYou( form );

    });
} );