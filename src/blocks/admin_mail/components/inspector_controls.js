// Required Components
import MailSettings from './inspector_controls/mail_settings';

const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <Fragment>
            <InspectorControls>
                <MailSettings props={ props } />
            </InspectorControls>
        </Fragment>
    );
}