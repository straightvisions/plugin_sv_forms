// Required Components
import HoneypotSettings from './inspector_controls/honeypot_settings';
import TimeTrapSettings from './inspector_controls/timetrap_settings';

const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <Fragment>
            <InspectorControls>
                <HoneypotSettings props={ props } />
                <TimeTrapSettings props={ props } />
            </InspectorControls>
        </Fragment>
    );
}