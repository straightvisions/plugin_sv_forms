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
            type,
            name,
            placeholder,
            label,
            disabled,

            // Color Settings
            textColor,
            textColorClass,
            backgroundColor,
            backgroundColorClass,
        } 
    } = props;

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <TextControl
                name={ name }
                label={ label }
                type={ type }
                value={ defaultValue }
                placeholder={ placeholder }
                className={ [ textColorClass, backgroundColorClass, className ] }
                style={{ color: textColor, backgroundColor: backgroundColor }}
                disabled={ disabled }
                onChange={ ( value ) => setAttributes( { defaultValue: value } ) }
            />
        </Fragment>
    ); 
});