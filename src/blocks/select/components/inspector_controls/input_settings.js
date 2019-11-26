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
            // Input Settings
            label,
            name,
            multiple,
        }
    } = props;

    // Functions
    const setLabel          = label         => setAttributes({ label });
    const setName           = name          => setAttributes({ name });
    const setMultiple       = multiple      => setAttributes({ multiple });
    const getSlug           = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ value => { 
                    setLabel( value );
                    setName( getSlug( value ) );
                } }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getSlug( name ) }
                onChange={ value => setName( getSlug( value ) )  }
            />
        </PanelBody>
    );
}