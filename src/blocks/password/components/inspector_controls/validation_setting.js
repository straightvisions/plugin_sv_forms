// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    RangeControl,
    ToggleControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            required,
            minlength,
            maxlength,
        }
    } = props;

    // Functions
    const setRequired   = required  => setAttributes({ required });
    const setMinLength  = minlength => setAttributes({ minlength });
    const setMaxLength  = maxlength => setAttributes({ maxlength });

    return(
        <PanelBody
            title={ __( 'Validation Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <ToggleControl
                label={ __( 'Required', 'sv_gutenform' ) }
                checked={ required }
                onChange={ () => setRequired( ! required )  }
            />
            <RangeControl
                label={ __( 'Min. Length', 'sv_gutenform' ) }
                help={ __( 'Defines the min. character length.', 'sv_gutenform' ) }
                value={ minlength }
                onChange={ value => setMinLength( value ) }
            />
            <RangeControl
                label={ __( 'Max. Length', 'sv_gutenform' ) }
                help={ __( 'Defines the max. character length.', 'sv_gutenform' ) }
                value={ maxlength }
                onChange={ value => setMaxLength( value ) }
            />
        </PanelBody>
    );
}