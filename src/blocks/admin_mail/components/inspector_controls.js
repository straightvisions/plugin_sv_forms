// Required Components
import MailSettings from './inspector_controls/mail_settings';

const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <InspectorControls>
            <MailSettings props={ props } />
        </InspectorControls>
    );
}