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
            value,
            label,
            name,
            disabled,
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
                    setAttributes( { value: getValidString( value ) } )
                } }
            />
            <TextControl
                label={ __( 'Value', 'sv_gutenform' ) }
                value={ getValidString( value ) }
                onChange={ ( value ) => setAttributes( { value: getValidString( value ) } )  }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getValidString( name ) }
                onChange={ ( value ) => setAttributes( { name: getValidString( value ) } )  }
            />
            <ToggleControl
                label={ __( 'Disabled', 'sv_gutenform' ) }
                checked={ disabled }
                onChange={ () => setAttributes( { disabled: ! disabled } )  }
            />
        </PanelBody>
    );
}