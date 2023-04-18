// Self executing anonymous function, to make the vars and functions private
(function() {
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
				replace.push( formInput.value );
			} else {
				replace.push( '' );
			}
		});
		
		content = content.replaceArray( find, replace );
		
		return content;
	}
	
	const showThankYou = ( form, formData ) => {
		const el = form.parentElement.querySelector( '.wp-block-straightvisions-sv-forms-thank-you' );
		
		if ( el && el.innerHTML.replace(/\s/g, "") ) {
			const parsedContent = getParsedContent( el.innerHTML, formData );
			
			el.innerHTML = parsedContent;
			form.parentElement.insertBefore( el, form.nextSibling );
			
			form.style.display = 'none';
			el.style.display = 'block';
		}
	}
	
	document.querySelectorAll( 'form.wp-block-straightvisions-sv-forms-form' ).forEach( form => {
		form.addEventListener( 'submit', function( e ) {
			e.preventDefault();
			
			const formData = new FormData(this);
			const formFiles = form.querySelectorAll('input[type="file"]');
			let newFormData = [];
			
			formData.forEach( field => {
				const el = form.querySelector(':input[name="' + field[0] + '"]');
				
				if ( el ) {
					if ( el.value !== "" || el.getAttribute('name') === 'sv_forms_sg_hp' ) {
						let newField = {
							name: field[0],
							type: el.type,
							value: field[1],
						};
						
						if ( field[0] === 'sv_forms_form_id' ) {
							formsID = field[1];
						}
						
						// The following code checks for specific input types
						// and stores their label instead of the value
						let labelText = false;
						
						switch ( newField.type ) {
							case 'select-one':
								labelText = el.options[el.selectedIndex].text;
								break;
							case 'radio':
								const radio = form.querySelector(':input[type="radio"][name="' + newField.name + '"][value="' + newField.value + '"]');
								
								if ( radio && radio.value && radio.value !== '' ) {
									labelText = radio.parentElement.querySelector('label[for="' + newField.name + '"]').textContent;
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
			
			// Append file input values to form data
			if ( formFiles && formFiles.length > 0 ) {
				formFiles.forEach( fileInput => {
					if ( fileInput.files && fileInput.files[0] ) {
						let newField = {
							name: fileInput.name,
							type: 'file',
							value: fileInput.files[0],
						};
						newFormData.push( newField );
					}
				});
			}
			
			// Send form data to server
			const xhr = new XMLHttpRequest();
			xhr.open( 'POST', localized.ajaxurl, true );
			xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
			xhr.onload = function() {
				if (xhr.status === 200) {
					showThankYou( form, newFormData );
				} else {
					console.error( 'Error submitting form: ' + xhr.statusText );
				}
			};
			xhr.onerror = function() {
				console.error( 'Error submitting form: ' + xhr.statusText );
			};
			xhr.send( JSON.stringify( { action: 'sv_forms_submit_form', form_id: formsID, form_data: newFormData } ) );
		});
	});
})();
