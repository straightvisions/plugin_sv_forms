// Required Components
const { __ } = wp.i18n;
const { 
    RangeControl,
    PanelBody 
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { 
            borderRadius,
            borderWidthTop,
            borderWidthRight,
            borderWidthBottom,
            borderWidthLeft
        }
    } = props;

    // Functions to set the block attributes
    const setBorderRadius       = borderRadius      => setAttributes({ borderRadius });
    const setBorderWidthTop     = borderWidthTop    => setAttributes({ borderWidthTop });
    const setBorderWidthRight   = borderWidthRight  => setAttributes({ borderWidthRight });
    const setBorderWidthBottom  = borderWidthBottom => setAttributes({ borderWidthBottom });
    const setBorderWidthLeft    = borderWidthLeft   => setAttributes({ borderWidthLeft });

    // Border Width All
    let borderWidth = 0;

    if ( 
        borderWidthTop === borderWidthRight 
        && borderWidthRight === borderWidthBottom 
        && borderWidthBottom === borderWidthLeft
    ) {
        borderWidth = Number.isInteger( borderWidthTop ) && borderWidthTop > -1 ? borderWidthTop : 0;
    }

    return(
        <PanelBody
            title={ __( 'Border Settings', 'sv_forms' ) }
            initialOpen={ false }
        >
            <RangeControl
                label={ __( 'Border Width', 'sv_forms' ) }
                value={ borderWidth }
                onChange={ value => {
                    setBorderWidthTop( value );
                    setBorderWidthRight( value );
                    setBorderWidthBottom( value );
                    setBorderWidthLeft( value );
                }}
                allowReset
                min={ 0 }
                max={ 10 }
            />
            <RangeControl
                label={ __( 'Border Radius', 'sv_forms' ) }
                value={ borderRadius }
                onChange={ value => {
                    value = ! value ? 0 : value;
                    setBorderRadius( value );
                }}
                allowReset
                min={ 0 }
                max={ 50 }
            />
        </PanelBody>
    );
}