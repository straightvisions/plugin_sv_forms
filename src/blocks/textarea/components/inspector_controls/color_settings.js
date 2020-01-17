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
            textareaColor,
            textareaBackgroundColor,
        }
    } = props;

    // Functions to set the block attributes
    const setLabelColor                     = labelColor                    => setAttributes({ labelColor });
    const setLabelColorClass                = labelColorClass               => setAttributes({ labelColorClass });
    const setTextareaColor                  = textareaColor                 => setAttributes({ textareaColor });
    const setTextareaColorClass             = textareaColorClass            => setAttributes({ textareaColorClass });
    const setTextareaBackgroundColor        = textareaBackgroundColor       => setAttributes({ textareaBackgroundColor });
    const setTextareaBackgroundColorClass   = textareaBackgroundColorClass  => setAttributes({ textareaBackgroundColorClass });
    
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
            value: textareaColor,
            onChange: value => { 
                setTextareaColor( value );
                setTextareaColorClass( getColorClass( value ) );
            },
            label: __( 'Textarea', 'sv_gutenform' ),
        },
        {
            value: textareaBackgroundColor,
            onChange: value => { 
                setTextareaBackgroundColor( value );
                setTextareaBackgroundColorClass( getColorClass( value, true ) );
            },
            label: __( 'Textarea Background', 'sv_gutenform' ),
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