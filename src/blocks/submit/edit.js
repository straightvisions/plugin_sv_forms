// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        className,
        attributes: {
            // Text
            content,

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
            <RichText
                className={ [ textColorClass, backgroundColorClass, className ] }
                style={{ color: textColor, backgroundColor: backgroundColor }}
                value={ content }
                onChange={ ( value ) => setAttributes( { content: value } ) } 
            />
        </Fragment>
    ); 
});