// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    RangeControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { borderRadius }
    } = props;

    // Functions to set the block attributes
    const setBorderRadius = borderRadius => setAttributes({ borderRadius });

    return(
        <PanelBody
            title={ __( 'Border Settings', 'sv_forms' ) }
            initialOpen={ true }
        >
            <RangeControl
                label={ __( 'Border Radius', 'sv_forms' ) }
                value={ borderRadius }
                onChange={ value => { value = ! value ? '' : value; setBorderRadius( value ); }}
                allowReset
                min={ 0 }
                max={ 50 }
            />
        </PanelBody>
    );
}