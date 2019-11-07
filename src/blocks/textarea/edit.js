// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { BaseControl, Disabled } = wp.components;

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
            disabled,

            // Color Settings
            textColor,
            textColorClass,
            backgroundColor,
            backgroundColorClass,
        } 
    } = props;

    // Stores the Text-Field component
    const TextField = (
        <BaseControl
                id={ name }
                label={ label }
            >
            <RichText
                value={ defaultValue }
                placeholder={ placeholder }
                keepPlaceholderOnFocus={ true }
                className={ [ textColorClass, backgroundColorClass, className ] }
                style={{ color: textColor, backgroundColor: backgroundColor }}
                onChange={ ( value ) => setAttributes( { defaultValue: value } ) }
            />
        </BaseControl>
    );

    // Returns the Text-Field component, depending on it's disabled state
    function getTextField() {
        if ( disabled ) {
            return (
                <Disabled>
                    { TextField }
                </Disabled>
            );
        }

        return TextField;
    }

    return (
        <Fragment>
            <InspectorControls props={ props } />
            { getTextField() }
        </Fragment>
    ); 
});