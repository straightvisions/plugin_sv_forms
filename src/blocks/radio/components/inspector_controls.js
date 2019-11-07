// Required Components
import InputSettings from './inspector_controls/input_settings';

const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <InspectorControls>
            <InputSettings props={ props } />
        </InspectorControls>
    );
}