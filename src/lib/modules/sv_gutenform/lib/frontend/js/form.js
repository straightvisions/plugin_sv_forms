// Variables
const localized = js_sv_gutenform_modules_sv_gutenform_scripts_form_js;

// Extends the JS String Object with a function that is similar to str_replace() function from PHP
// Code from: https://stackoverflow.com/questions/5069464/replace-multiple-strings-at-once
String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex; 
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

// Functions
// Returns the parsed thank you message content
const getParsedContent = ( content, formData ) => {
    let names   = [];
    let find    = [];
    let replace = [];
    
    content.match( /%(.*?)%/g ).forEach( name => {
        find.push( name );
        names.push( name.split('%').join('') );
    } );

    names.forEach( name => {

        const formInput = formData.find( input => { return name === input.name; } );

        if ( formInput ) {
            replace.push( formInput.value );
        } else {
            replace.push( '' );
        }
    });

    content = content.replaceArray( find, replace );

    return content;
}

const showThankYou  = ( form, formData ) => {
    const el = form.parent().find( '.wp-block-straightvisions-sv-gutenform-thank-you' );

    if ( el.length > 0 && el.html().replace(/\s/g, "") ) {
        const parsedContent = getParsedContent( el.html(), formData );

        el.html( parsedContent );
        el.insertAfter( form );

        form.hide( 'slow', function() {
            el.show( 'slow' );
        } );
    }
}

jQuery( 'form.wp-block-straightvisions-sv-gutenform-form' ).submit( function( e ) {
    e.preventDefault();
    
    const form      = jQuery( this );
    let formData    = form.serializeArray();
    

    // Replaces the value of select-fields, radio-buttons and checkboxes with their label
    formData.forEach( ( input, index ) => {
        const inputEl   = form.find( '[name="' + input.name + '"]' );
        
        // Is select
        if ( inputEl.is( 'select' ) ) {
            const label = jQuery(inputEl[0]).find('option[value="' + input.value + '"]').text();

            if ( label ) {
                formData[ index ].value = label;
            }
        }

        // @todo Add support for Checkbox and Radio Button
    } );

    jQuery.post( localized.sv_gutenform_ajaxurl, {
        action: 'sv_gutenform_submit',
        sv_gutenform_nonce: localized.sv_gutenform_nonce,
        sv_gutenform_post_id: localized.sv_gutenform_post_id,
        sv_gutenform_form_data: formData,
    }, function( response ) {
        response = JSON.parse( response );
        console.log(response);

        showThankYou( form, formData );
    });
} );