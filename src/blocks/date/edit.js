// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { 
    BaseControl,
    DatePicker 
} = wp.components;

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
            <InspectorControls props={ props } />
            <div className={ className }>
                <BaseControl>
                    <Label />
                    <DatePicker
                        name={ name }
                        required={ required }
                        disabled={ disabled }
                        currentDate={ defaultValue }
                        autofocus={ autofocus }
                        onChange={ value => setDefaultValue( value ) }
                        hideLabelFromVision={ true }
                    />
                </BaseControl>
            </div>
        </Fragment>
    ); 
});