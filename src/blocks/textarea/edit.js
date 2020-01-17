// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

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

            // Border Settings
            borderRadius,

            // Advanced Settings
            autofocus,
            readonly,
            disabled,
        } 
    } = props;

    // Functions to set the block attributes
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
                    style={{ color: textareaColor, backgroundColor: textareaBackgroundColor, borderRadius: borderRadius }}
                    className={ [ textareaColorClass, textareaBackgroundColorClass ] }
                    onChange={ value => setDefaultValue( value ) }
                    hideLabelFromVision={ true }
                />
            </div>
            <FormContext.Consumer>
            { value => {
                props.formId = value;

                return <InspectorControls props={ props } />;
            }}
            </FormContext.Consumer>
        </Fragment>
    ); 
});