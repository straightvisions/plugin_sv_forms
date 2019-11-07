// Required Components
import ColorSettings from './inspector_controls/color_settings';

const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <InspectorControls>
            <ColorSettings props={ props } />
        </InspectorControls>
    );
}