// Required Components
const { __ } = wp.i18n;
const { 
    PanelBody,
    TextControl,
    ToggleControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Properties
    const { 
        setAttributes,
        attributes: {
            formLabel,
            saveSubmissions,
        },
    } = props;

    // Functions to set the block attributes
    const setFormLabel          = formLabel         => setAttributes({ formLabel });
    const setSaveSubmissions    = saveSubmissions   => setAttributes({ saveSubmissions });

    return(
        <PanelBody 
            title={ __( 'Form Settings', 'sv_forms' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Form Label', 'sv_forms' ) }
                type='text'
                value={ formLabel }
                onChange={ value => setFormLabel( value ) }
            />
            <ToggleControl
                label={ __( 'Save Submissions', 'sv_forms' ) }
                checked={ saveSubmissions }
                onChange={ () => setSaveSubmissions( ! saveSubmissions )  }
            />
        </PanelBody>
    );
}