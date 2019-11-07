// Required Components
const { __ } = wp.i18n;
const { 
    PanelColorSettings, 
    getColorObjectByColorValue, 
    getColorClassName  
} = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            textColor,
            backgroundColor,
        }
    } = props;

    // Returns an color object if this color is defined in the editor
    function getColorObject( color ) {
        const settings = wp.data.select( 'core/editor' ).getEditorSettings();
        const colorObject = getColorObjectByColorValue( settings.colors, color );

        return colorObject;
    }

    // Returns the classname of the given color, if it's defined in the editor
    function getColorClass( color, type = 'color' ) {
        if ( ! color ) return '';
        if ( ! getColorObject( color ) ) return '';

        return getColorClassName( type, getColorObject( color ).slug );
    }
    
    // Color Settings
    let colorSettings = [
        {
            value: textColor,
            onChange: ( value ) => { 
                setAttributes({ textColor: value }),
                setAttributes({ textColorClass: getColorClass( value ) })
            },
            label: __( 'Text', 'sv_gutenform' ),
        },
        {
            value: backgroundColor,
            onChange: ( value ) => { 
                setAttributes({ backgroundColor: value }),
                setAttributes({ backgroundColorClass: getColorClass( value, 'background-color' ) })
            },
            label: __( 'Background', 'sv_gutenform' ),
        },
    ];

    return(
        <PanelColorSettings
            title={ __( 'Color Settings', 'sv_gutenform' ) }
            initialOpen={ false }
            colorSettings={ colorSettings }
        >
        </PanelColorSettings>
    );
}