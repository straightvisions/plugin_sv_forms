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
        setAttributes,
        attributes: {
            // Content
            content,

            // Color Settings
            textColor,
            textColorClass,
            backgroundColor,
            backgroundColorClass,
            borderColor,

            // Border Settings
            borderRadius,
        } 
    } = props;

    // Returns a string in a slug compatible format
    const setContent = content => setAttributes({ content });

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <div className={ className }>
                <RichText
                    className={ [ textColorClass, backgroundColorClass ] }
                    style={{ 
                        color: textColor, 
                        backgroundColor: backgroundColor, 
                        borderColor: borderColor,
                        borderRadius: borderRadius 
                    }}
                    value={ content }
                    onChange={ value => setContent( value ) } 
                />
            </div>
        </Fragment>
    ); 
});