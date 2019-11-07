// Required Components
import InputSettings from './inspector_controls/input_settings';
import ColorSettings from './inspector_controls/color_settings';

const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <InspectorControls>
            <InputSettings props={ props } />
            <ColorSettings props={ props } />
        </InspectorControls>
    );
}