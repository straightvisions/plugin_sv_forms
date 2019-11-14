// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
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
        </PanelBody>
    );
}