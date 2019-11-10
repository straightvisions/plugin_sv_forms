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

    return(
        <PanelBody
            title={ __( 'Validation Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <ToggleControl
                label={ __( 'Required', 'sv_gutenform' ) }
                checked={ required }
                onChange={ () => setAttributes( { required: ! required } )  }
            />
            <RangeControl
                label={ __( 'Min. Length', 'sv_gutenform' ) }
                help={ __( 'Defines the min. character length. 0 = Disabled', 'sv_gutenform' ) }
                value={ minlength }
                onChange={ ( value ) => setAttributes( { minlength: value } ) }
                min={ 0 }
                max={ 50 }
            />
            <RangeControl
                label={ __( 'Max. Length', 'sv_gutenform' ) }
                help={ __( 'Defines the max. character length. 0 = Disabled', 'sv_gutenform' ) }
                value={ maxlength }
                onChange={ ( value ) => setAttributes( { maxlength: value } ) }
                min={ 0 }
                max={ 50 }
            />
        </PanelBody>
    );
}