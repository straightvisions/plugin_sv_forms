// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { RangeControl }  = wp.components;

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

            // Validation Settings
            required,
            min,
            max,
            step,

            // Color Settings
            labelColor,
            labelColorClass,

            // Advanced Settings
            autofocus,
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
                <RangeControl
                    name={ name }
                    required={ required }
                    disabled={ disabled }
                    value={ defaultValue }
                    initialPosition={ defaultValue }
                    min={ min }
                    max={ max }
                    step={ step }
                    autofocus={ autofocus }
                    onChange={ value => setDefaultValue( value ) }
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