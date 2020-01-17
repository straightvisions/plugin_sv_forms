// Required Components
import TimeTrapSettings from './inspector_controls/timetrap_settings';

const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <Fragment>
            <InspectorControls>
                <TimeTrapSettings props={ props } />
            </InspectorControls>
        </Fragment>
    );
}