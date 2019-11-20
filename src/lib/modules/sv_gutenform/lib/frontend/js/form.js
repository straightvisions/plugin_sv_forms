// Stores the localized variable, that was passed from php
const localized = js_sv_gutenform_modules_sv_gutenform_scripts_form_js;

jQuery( 'form.straightvisions-block-sv-gutenform' ).submit( function( e ) {
    e.preventDefault();

    jQuery.post( localized.ajaxurl, {
        action: 'sv_gutenform_submit',
        nonce: localized.nonce,
        post_id: localized.post_id,
        form_data: jQuery( this ).serializeArray(),
    }, function( response ) {
        response = JSON.parse( response );

        //console.log(response);
    });
} );