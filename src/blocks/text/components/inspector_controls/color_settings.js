// Required Components
const { __ } = wp.i18n;
const { 
    PanelColorSettings, 
    getColorObjectByColorValue, 
    getColorClassName,
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

    // Functions
    const setLabelColor                 = labelColor                => setAttributes({ labelColor });
    const setLabelColorClass            = labelColorClass           => setAttributes({ labelColorClass });
    const setInputColor                 = inputColor                => setAttributes({ inputColor });
    const setInputColorClass            = inputColorClass           => setAttributes({ inputColorClass });
    const setInputBackgroundColor       = inputBackgroundColor      => setAttributes({ inputBackgroundColor });
    const setInputBackgroundColorClass  = inputBackgroundColorClass => setAttributes({ inputBackgroundColorClass });
    
    // Returns an color object if this color is defined in the editor
    const getColorObject = color => {
        const settings      = wp.data.select( 'core/editor' ).getEditorSettings();
        const colorObject   = getColorObjectByColorValue( settings.colors, color );

        return colorObject;
    };

    // Returns the classname of the given color, if it's defined in the editor
    const getColorClass = ( color, isBackgroundColor = false ) => {
        if ( ! color ) return '';
        if ( ! getColorObject( color ) ) return '';

        const type = isBackgroundColor ? 'background-color' : 'color';

        return getColorClassName( type, getColorObject( color ).slug );
    };
    
    // Color Settings
    let colorSettings = [
        {
            value: labelColor,
            onChange: value => { 
                setLabelColor( value );
                setLabelColorClass( getColorClass( value ) );
            },
            label: __( 'Label', 'sv_gutenform' ),
        },
        {
            value: inputColor,
            onChange: value => { 
                setInputColor( value );
                setInputColorClass( getColorClass( value ) );
            },
            label: __( 'Input', 'sv_gutenform' ),
        },
        {
            value: inputBackgroundColor,
            onChange: value => { 
                setInputBackgroundColor( value );
                setInputBackgroundColorClass( getColorClass( value, true ) );
            },
            label: __( 'Input Background', 'sv_gutenform' ),
        },
    ];

    return(
        <PanelColorSettings
            title={ __( 'Color Settings', 'sv_gutenform' ) }
            initialOpen={ true }
            colorSettings={ colorSettings }
        >
        </PanelColorSettings>
    );
}