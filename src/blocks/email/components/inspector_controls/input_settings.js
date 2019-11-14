// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    ToggleControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            label,
            name,
            placeholder,
            isRecipient,
        }
    } = props;

    // Returns a converted string, that is valid for the most input attributes
    function getValidString( string ) {
        if ( ! string ) return '';

        const convertedString = string.replace( /[^A-Z0-9]+/ig, '-' );

        return convertedString.toLowerCase();
    }

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ ( value ) => { 
                    setAttributes( { label: value } ) 
                    setAttributes( { name: getValidString( value ) } )
                } }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getValidString( name ) }
                onChange={ ( value ) => setAttributes( { name: getValidString( value ) } )  }
            />
            <TextControl
                label={ __( 'Placeholder', 'sv_gutenform' ) }
                value={ placeholder }
                onChange={ ( value ) => setAttributes( { placeholder: value } )  }
            />
            <ToggleControl 
                label={ __( 'Is Recipient?', 'sv_gutenform' ) }
                help={ __( 'When checked, an confirmation mail will be sent to this e-mail.', 'sv_gutenform' ) }
                checked={ isRecipient }
                onChange={ () => { 
                    setAttributes( { isRecipient: ! isRecipient } )
                    setAttributes( { required: ! isRecipient } )
                } }
            />
        </PanelBody>
    );
}