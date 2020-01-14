// Required Components
import FormSettings from './inspector_controls/form_settings';

const { InspectorControls } = wp.blockEditor;

export default ( { props, data } ) => {
    if ( ! props || ! data ) return '';

    return(
        <InspectorControls>
            <FormSettings props={ props } data={ data } />
        </InspectorControls>
    );
}