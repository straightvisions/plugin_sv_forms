// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { TextControl }   = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            defaultValue,
            label,
            name,
            placeholder,

            // Validation Settings
            required,
            minlength,
            maxlength,

            // Color Settings
            labelColor,
            labelColorClass,
            inputColor,
            inputColorClass,
            inputBackgroundColor,
            inputBackgroundColorClass,

            // Advanced Settings
            autofocus,
            autocomplete,
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
                <TextControl
                type='text'
                name={ name }
                label={ label }
                required={ required }
                disabled={ disabled }
                readonly={ readonly }
                value={ defaultValue }
                minlength={ minlength > 0 ? minlength : -1 }
                maxlength={ maxlength > 0 ? maxlength : -1 }
                autofocus={ autofocus }
                placeholder={ placeholder }
                autocomplete={ autocomplete }
                style={{ color: inputColor, backgroundColor: inputBackgroundColor }}
                className={ [ inputColorClass, inputBackgroundColorClass ] }
                onChange={ ( value ) => setDefaultValue( value ) }
                hideLabelFromVision={ true }
            />
            </div>
        </Fragment>
    ); 
});