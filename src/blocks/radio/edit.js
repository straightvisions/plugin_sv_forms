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
            isChecked,
            value,
            name,
            label,
            disabled,
        } 
    } = props;

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <TextControl
                type='radio'
                name={ name }
                label={ label }
                value={ value }
                disabled={ disabled }
            />
        </Fragment>
    ); 
});