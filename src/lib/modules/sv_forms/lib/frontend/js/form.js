// Self executing anonymous function, to make the vars and functions private
(function( jQuery ) {
    // Variables
    const localized = js_sv_forms_sv_forms_scripts_form_js;
    let formsID = false;

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
                replace.push( jQuery(formInput.value).text() );
            } else {
                replace.push( '' );
            }
        });

        content = content.replaceArray( find, replace );

        return content;
    }

    const showThankYou = ( form, formData ) => {
        const el = form.parent().find( '.wp-block-straightvisions-sv-forms-thank-you' );

        if ( el.length > 0 && el.html().replace(/\s/g, "") ) {
            const parsedContent = getParsedContent( el.html(), formData );

            el.html( parsedContent );
            el.insertAfter( form );

            form.hide( 'fast', function() {
                el.show( 'slow' , function() {
                    document.querySelector('.wp-block-straightvisions-sv-forms-thank-you').scrollIntoView(false);
                });
            } );
        }
    }

    jQuery( 'form.wp-block-straightvisions-sv-forms-form' ).submit( function( e ) {
        e.preventDefault();

        const form          = jQuery( this );
        const formData      = form.serializeArray();
        const formFiles     = form.find('input[type="file"]');
        const newFormData   = [];

        formData.map( field => {
            const el = form.find(':input[name="' + field.name + '"]');

            if ( el.length > 0 && el.attr('type') && el.attr('type') !== "" ) {
                if ( el.val() !== "" || el.attr('name') === 'sv_forms_sg_hp' ) {
                    let newField = {
                        name: field.name,
                        type: el.attr('type'),
                        value: field.value,
                    };

                    if ( field.name === 'sv_forms_form_id' ) {
                        formsID = field.value;
                    }

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

        const postID = (formsID && localized[formsID]) ? localized[formsID] : false;
        const ajaxData = new FormData();

        ajaxData.append( 'action', 'sv_forms_submit' );
        ajaxData.append( 'sv_forms_nonce', localized.sv_forms_nonce );
        ajaxData.append( 'sv_forms_post_id', postID );

        formFiles.map( key => {
            const el = jQuery( formFiles[key] );
            
            if ( el.attr('name') !== "" && el.val() !== "" ) {
                let newField = {
                    name: el.attr('name'),
                    type: el.attr('type'),
                    value: el.val(),
                };

                newFormData.push( newField );
                ajaxData.append( newField.name, el.prop('files')[0] );
            }
        } );

        ajaxData.append( 'sv_forms_form_data', JSON.stringify( newFormData ) );

        jQuery.ajax({
            url: localized.sv_forms_ajaxurl,
            type: 'POST',
            contentType: false,
            processData: false,
            data: ajaxData,
            success: function( response ) {
                showThankYou( form, newFormData );
            }
        });
    });
}( jQuery ));