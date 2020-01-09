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

    // Functions
    const setLabel          = label         => setAttributes({ label });
    const setName           = name          => setAttributes({ name });
    const setPlaceholder    = placeholder   => setAttributes({ placeholder });
    const getSlug           = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    return(
        <PanelBody
            title={ __( 'Textarea Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ value => { 
                    setLabel( value );
                    //setName( getSlug( value ) ); @todo Deactivated, because this feature can result to problems. Need a better concept!
                } }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getSlug( name ) }
                onChange={ value => setName( getSlug( value ) )  }
            />
            <TextControl
                label={ __( 'Placeholder', 'sv_gutenform' ) }
                value={ placeholder }
                onChange={ value => setPlaceholder( value )  }
            />
        </PanelBody>
    );
}