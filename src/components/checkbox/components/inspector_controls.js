// Required Components
import InputSettings from './inspector_controls/input_settings.js';
import ValidationSettings from './inspector_controls/validation_setting.js';
import AdvancedSettings from './inspector_controls/advanced_settings.js';
import ColorSettings from './inspector_controls/color_settings.js';
import BorderSettings from './inspector_controls/border_settings.js';

const { Fragment } = wp.element;
const { InspectorControls, InspectorAdvancedControls } = wp.blockEditor;

export default ( { props, wrapper, inputs } ) => {
    if ( ! props || ! wrapper || ! inputs ) return '';

    return(
        <Fragment>
            <InspectorControls>
                <InputSettings props={ props } wrapper={ wrapper } inputs={ inputs } />
                <ColorSettings props={ props } />
                <BorderSettings props={ props } />
                <ValidationSettings props={ props } />
            </InspectorControls>
            <InspectorAdvancedControls>
                <AdvancedSettings props={ props } />
            </InspectorAdvancedControls>
        </Fragment>
    );
}