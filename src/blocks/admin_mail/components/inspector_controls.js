// Required Components
import MailSettings from './inspector_controls/mail_settings';
import SendToAuthors from './inspector_controls/send_to_authors';
import SendToMails from './inspector_controls/send_to_mails';

const { InspectorControls } = wp.blockEditor;

export default ( { props, authors } ) => {
    if ( ! props || ! authors ) return '';

    return(
        <InspectorControls>
            <MailSettings props={ props } />
            <SendToAuthors props={ props } authors={ authors } />
            <SendToMails props={ props } authors={ authors } />
        </InspectorControls>
    );
}