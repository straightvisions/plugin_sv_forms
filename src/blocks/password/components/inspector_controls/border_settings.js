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

    // Functions
    const setBorderRadius  = borderRadius  => setAttributes({ borderRadius });

    return(
        <PanelBody
            title={ __( 'Border Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <RangeControl
                label={ __( 'Border Radius', 'sv_gutenform' ) }
                value={ borderRadius }
                onChange={ value => { value = ! value ? '' : value; setBorderRadius( value ); }}
                allowReset
                initialPosition={ 5 }
                min={ 0 }
                max={ 50 }
            />
        </PanelBody>
    );
}