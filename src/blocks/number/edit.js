// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

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
            min,
            max,

            // Color Settings
            labelColor,
            labelColorClass,
            inputColor,
            inputColorClass,
            inputBackgroundColor,
            inputBackgroundColorClass,

            // Border Settings
            borderRadius,

            // Advanced Settings
            autofocus,
            readonly,
            disabled,
        } 
    } = props;

    // Functions
    const setDefaultValue = defaultValue => setAttributes({ defaultValue });

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
                <TextControl
                    type='number'
                    name={ name }
                    label={ label }
                    required={ required }
                    disabled={ disabled }
                    readonly={ readonly }
                    value={ defaultValue }
                    min={ min }
                    max={ max }
                    autofocus={ autofocus }
                    placeholder={ placeholder }
                    style={{ color: inputColor, backgroundColor: inputBackgroundColor, borderRadius: borderRadius }}
                    className={ [ inputColorClass, inputBackgroundColorClass ] }
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