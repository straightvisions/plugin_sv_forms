// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { TextControl }   = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            defaultValue,
            label,
            name,
            placeholder,
            isRecipient,

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

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <div className={ className }>
                {
                    label.length > 0
                    ? <label
                        for={ name }
                        style={{ color: labelColor }}
                        className={ labelColorClass }
                    >
                        { label }
                    </label>
                    : null
                }
                <TextControl
                    type='email'
                    name={ name }
                    label={ label }
                    required={ required || isRecipient ? true : false }
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
                    onChange={ ( value ) => setAttributes( { defaultValue: value } ) }
                    hideLabelFromVision={ true }
                />
            </div>
        </Fragment>
    ); 
});