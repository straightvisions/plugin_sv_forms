// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            type,
            label,
            placeholder,
            name,
            disabled,
        }
    } = props;

    // Returns a converted string, that is valid for the name-attribute
    function getName( string ) {
        if ( ! string ) return '';

        const convertedString = string.replace( /[^A-Z0-9]+/ig, '-' );

        return convertedString.toLowerCase();
    }

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <SelectControl
                label={ __( 'Type', 'sv_gutenform' ) }
                value={ type }
                options={ [
                    { label: 'Text', value: 'text' },
                    { label: 'E-Mail', value: 'email' },
                    { label: 'Telephone', value: 'tel' },
                    { label: 'URL', value: 'url' },
                    { label: 'Secret', value: 'password' },
                ] }
                onChange={ ( value ) => { setAttributes( { type: value } ) } }
            />
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ ( value ) => { 
                    setAttributes( { label: value } ) 
                    setAttributes( { name: getName( value ) } )
                } }
            />
            <TextControl
                label={ __( 'Placeholder', 'sv_gutenform' ) }
                value={ placeholder }
                onChange={ ( value ) => setAttributes( { placeholder: value } )  }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getName( name ) }
                onChange={ ( value ) => setAttributes( { name: getName( value ) } )  }
            />
            <ToggleControl
                label={ __( 'Disabled', 'sv_gutenform' ) }
                checked={ disabled }
                onChange={ () => setAttributes( { disabled: ! disabled } )  }
            />
        </PanelBody>
    );
}