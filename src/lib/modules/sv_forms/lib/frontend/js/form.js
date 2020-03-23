// Self executing anonymous function, to make the vars and functions private
(function( jQuery ) {
    // Variables
    const localized = js_sv_forms_modules_sv_forms_scripts_form_js;

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
        const matches = content.match( /%(.*?)%/g );

        if ( matches ) {
            matches.forEach( name => {
                find.push( name );
                names.push( name.split('%').join('') );
            } );
        }

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
        const el = form.parent().find( '.wp-block-straightvisions-sv-forms-thank-you' );

        if ( el.length > 0 && el.html().replace(/\s/g, "") ) {
            const parsedContent = getParsedContent( el.html(), formData );

            el.html( parsedContent );
            el.insertAfter( form );

            form.hide( 'slow', function() {
                el.show( 'slow' );
            } );
        }
    }

    jQuery( 'form.wp-block-straightvisions-sv-forms-form' ).submit( function( e ) {
        e.preventDefault();
        
        const form          = jQuery( this );
        const formData      = form.serializeArray();
        let newFormData     = [];

        formData.map( field => {
            const el = form.find(':input[name="' + field.name + '"]');

            if ( el.length > 0 && el.attr('type') && el.attr('type') !== "" ) {
                if ( el.val() !== "" || el.attr('name') === 'sv_forms_sg_hp' ) {
                    let newField = {
                        name: field.name,
                        type: el.attr('type'),
                        value: field.value,
                    };

                    // The following code checks for specific input types
                    // and stores their label instead of the value
                    let labelText = false;

                    switch ( newField.type ) {
                        case 'select':
                            labelText = el.find('option[value="' + newField.value + '"]').text();
                            break;
                        case 'radio':
                            const radio = form.find(':input[type="radio"][name="' + newField.name + '"][value="' + newField.value + '"]');
                            
                            if ( radio.length > 0 && radio.val() && radio.val() !== '' ) {
                                labelText = radio.parent().find('label[for="' + newField.name + '"]').text()
                            }
                            
                            break;
                    }

                    if ( labelText && labelText !== '' ) {
                        newField.value = labelText;
                    }

                    newFormData.push( newField );
                }
            }
        });

        jQuery.post( localized.sv_forms_ajaxurl, {
            action: 'sv_forms_submit',
            sv_forms_nonce: localized.sv_forms_nonce,
            sv_forms_post_id: localized.sv_forms_post_id,
            sv_forms_form_data: newFormData,
        }, function() {
            showThankYou( form, newFormData );
        });
    } );
}( jQuery ));