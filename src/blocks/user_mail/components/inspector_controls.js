// Required Components
import MailSettings from './inspector_controls/mail_settings';
import SendToMails from './inspector_controls/send_to_mails';

const { InspectorControls } = wp.blockEditor;

export default ( { props } ) => {
    if ( ! props ) return '';

    return(
        <InspectorControls>
            <MailSettings props={ props } />
            <SendToMails props={ props } />
        </InspectorControls>
    );
}