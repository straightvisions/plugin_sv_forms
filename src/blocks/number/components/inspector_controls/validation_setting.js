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
            min,
            max,
            step,
        }
    } = props;

    // Functions to set the block attributes
    const setRequired   = required  => setAttributes({ required });
    const setMin        = min       => setAttributes({ min });
    const setMax        = max       => setAttributes({ max });
    const setStep       = step      => setAttributes({ step });

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
                label={ __( 'Min Value', 'sv_gutenform' ) }
                help={ __( 'Defines the min value.', 'sv_gutenform' ) }
                value={ min }
                onChange={ value => setMin( value ) }
            />
            <RangeControl
                label={ __( 'Max Value', 'sv_gutenform' ) }
                help={ __( 'Defines the max value.', 'sv_gutenform' ) }
                value={ max }
                onChange={ value => setMax( value ) }
            />
            <RangeControl
                label={ __( 'Step', 'sv_gutenform' ) }
                help={ __( 'Defines the values steps.', 'sv_gutenform' ) }
                value={ step }
                onChange={ value => setStep( value ) }
                initialPosition={ 1 }
            />
        </PanelBody>
    );
}