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
        attributes: {
            showValue,
            showMin,
            showMax,
        },
    } = props;

    // Functions
    const setShowValue  = showValue     => setAttributes({ showValue });
    const setShowMin    = showMin       => setAttributes({ showMin });
    const setShowMax    = showMax       => setAttributes({ showMax });

    return(
        <PanelBody
            title={ __( 'Display Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <ToggleControl
                label={ __( 'Show Value', 'sv_gutenform' ) }
                checked={ showValue }
                onChange={ () => setShowValue( ! showValue )  }
            />
            <ToggleControl
                label={ __( 'Show Min', 'sv_gutenform' ) }
                checked={ showMin }
                onChange={ () => setShowMin( ! showMin )  }
            />
            <ToggleControl
                label={ __( 'Show Max', 'sv_gutenform' ) }
                checked={ showMax }
                onChange={ () => setShowMax( ! showMax )  }
            />
        </PanelBody>
    );
}