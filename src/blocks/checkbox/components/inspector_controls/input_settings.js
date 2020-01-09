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
            value,
        }
    } = props;

    // Functions
    const setLabel  = label     => setAttributes({ label });
    const setName   = name      => setAttributes({ name });
    const setValue  = value     => setAttributes({ value });
    const getSlug   = string    => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ value => { 
                    setLabel( value ); 
                    //setValue( getSlug( value ) ); @todo Deactivated, because this feature can result to problems. Need a better concept!
                }}
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getSlug( name ) }
                onChange={ value => setName( getSlug( value ) )  }
            />
            <TextControl
                label={ __( 'Value', 'sv_gutenform' ) }
                value={ getSlug( value ) }
                onChange={ value => setValue( getSlug( value ) ) }
            />
        </PanelBody>
    );
}