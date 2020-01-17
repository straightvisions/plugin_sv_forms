// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    ToggleControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { required }
    } = props;

    // Functions to set the block attributes
    const setRequired = required => setAttributes({ required });

    return(
        <PanelBody
            title={ __( 'Validation Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <ToggleControl
                label={ __( 'Required', 'sv_gutenform' ) }
                checked={ required }
                onChange={ () => setRequired( ! required )  }
            />
        </PanelBody>
    );
}