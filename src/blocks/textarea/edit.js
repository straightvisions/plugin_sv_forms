// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }        = wp.data;
const { Fragment }          = wp.element;
const { TextareaControl }   = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            // Textarea Settings
            defaultValue,
            label,
            name,
            placeholder,

            // Validation Settings
            required,
            maxlength,

            // Color Settings
            labelColor,
            labelColorClass,
            textareaColor,
            textareaColorClass,
            textareaBackgroundColor,
            textareaBackgroundColorClass,

            // Advanced Settings
            autofocus,
            readonly,
            disabled,
        } 
    } = props;

    // Functions
    const setDefaultValue = defaultValue => setAttributes( { defaultValue } );

    // Conditional Components
    const Label = () => {
        if ( label.length > 0 ) {
            return (
                <label
                    for={ name }
                    style={{ color: labelColor }}
                    className={ labelColorClass }
                >
                    { label }
                </label>
            );
        }

        return null;
    };

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <div className={ className }>
                <Label />
                <TextareaControl
                    type='text'
                    name={ name }
                    label={ label }
                    required={ required }
                    disabled={ disabled }
                    readonly={ readonly }
                    value={ defaultValue }
                    maxlength={ maxlength > 0 ? maxlength : -1 }
                    autofocus={ autofocus }
                    placeholder={ placeholder }
                    style={{ color: textareaColor, backgroundColor: textareaBackgroundColor }}
                    className={ [ textareaColorClass, textareaBackgroundColorClass ] }
                    onChange={ ( value ) => setDefaultValue( value ) }
                    hideLabelFromVision={ true }
                />
            </div>
        </Fragment>
    ); 
});