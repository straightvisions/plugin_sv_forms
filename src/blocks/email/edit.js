// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            defaultValue,
            name,
            placeholder,
            label,

            // Validation Settings
            required,
            minlength,
            maxlength,

            // Color Settings
            textColor,
            textColorClass,
            backgroundColor,
            backgroundColorClass,

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
            <TextControl
                type='email'
                name={ name }
                label={ label }
                required={ required }
                disabled={ disabled }
                readonly={ readonly }
                value={ defaultValue }
                minlength={ minlength }
                maxlength={ maxlength }
                autofocus={ autofocus }
                placeholder={ placeholder }
                autocomplete={ autocomplete }
                style={{ color: textColor, backgroundColor: backgroundColor }}
                className={ [ textColorClass, backgroundColorClass, className ] }
                onChange={ ( value ) => setAttributes( { defaultValue: value } ) }
            />
        </Fragment>
    ); 
});