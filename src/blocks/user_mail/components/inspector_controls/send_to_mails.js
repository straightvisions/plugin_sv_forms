// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    Button,
    SelectControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Wrapper Properties
    const {
        setAttributes,
        attributes: {
            mailToMails,
        }
    } = props;

    // Variables
    const mails = mailToMails ? JSON.parse( mailToMails ) : [];

    return(
        <PanelBody
            title={ __( 'Send to Mails', 'sv_gutenform' ) }
            initialOpen={ true }
        >

        </PanelBody>
    );
}