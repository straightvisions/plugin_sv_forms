// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { RadioControl }  = wp.components;

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
            options,

            // Color Settings
            labelColor,
            labelColorClass,

            // Advanced Settings
            disabled,
        } 
    } = props;

    const parsedOptions = options ? JSON.parse( options ) : [];

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
                <Label />
                <RadioControl
                    selected={ defaultValue }
                    onChange={ option => setDefaultValue( option ) }
                    options={ parsedOptions }
                    disabled={ disabled }
                />
            </div>
        </Fragment>
    ); 
});