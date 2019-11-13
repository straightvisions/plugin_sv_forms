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
            labelColor,
            inputColor,
            inputBackgroundColor,
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
            value: labelColor,
            onChange: ( value ) => { 
                setAttributes({ labelColor: value }),
                setAttributes({ labelColorClass: getColorClass( value ) })
            },
            label: __( 'Label', 'sv_gutenform' ),
        },
        {
            value: inputColor,
            onChange: ( value ) => { 
                setAttributes({ inputColor: value }),
                setAttributes({ inputColorClass: getColorClass( value ) })
            },
            label: __( 'Input', 'sv_gutenform' ),
        },
        {
            value: inputBackgroundColor,
            onChange: ( value ) => { 
                setAttributes({ inputBackgroundColor: value }),
                setAttributes({ inputBackgroundColorClass: getColorClass( value, 'background-color' ) })
            },
            label: __( 'Input Background', 'sv_gutenform' ),
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