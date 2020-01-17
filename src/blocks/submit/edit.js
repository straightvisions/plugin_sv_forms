// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { RichText }      = wp.blockEditor;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        attributes: {
            // Content
            content,

            // Color Settings
            textColor,
            textColorClass,
            backgroundColor,
            backgroundColorClass,

            // Border Settings
            borderRadius,
        } 
    } = props;

    // Returns a string in a slug compatible format
    const setContent = content => setAttributes({ content });

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <RichText
                className={ [ textColorClass, backgroundColorClass, className ] }
                style={{ color: textColor, backgroundColor: backgroundColor, borderRadius: borderRadius }}
                value={ content }
                onChange={ value => setContent( value ) } 
            />
        </Fragment>
    ); 
});