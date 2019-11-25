// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }        = wp.data;
const { Fragment }          = wp.element;
const { CheckboxControl }   = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            isChecked,
            label,
            name,
            value,

            // Validation Settings
            required,

            // Color Settings
            labelColor,
            labelColorClass,

            // Advanced Settings
            disabled,
        } 
    } = props;

    // Functions
    const setCheck = isChecked => setAttributes({ isChecked });

    // Conditional Components
    const Label = () => {
        if ( label.length > 0 ) {
            return (
                <label
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
                <CheckboxControl
                    name={ name }
                    value={ value }
                    required={ required }
                    disabled={ disabled }
                    checked={ isChecked }
                    onChange={ () => setCheck( ! isChecked ) }
                />
                <Label />
            </div>
        </Fragment>
    ); 
});