// Required Components
const { __ } = wp.i18n;
const { 
    PanelBody,
    TextControl,
    SelectControl,
} = wp.components;

export default ( { props, data } ) => {
    if ( ! props || ! data ) return '';

    // Block Properties
    const { 
        setAttributes,
        attributes: {
            adminMail,
            adminMailUser,
            adminMailCustom,
        }
    } = props;

    // Functions
    const setAdminMail          = ( adminMail )         => { 
        setAttributes( { adminMail } );

        if ( adminMail === 'author' ) {
            setAdminMailUser( getAuthorOptions()[0].value );
        }
    };
    const setAdminMailUser      = adminMailUser     => setAttributes({ adminMailUser });
    const setAdminMailCustom    = adminMailCustom   => setAttributes({ adminMailCustom });
    const getAuthorOptions      = ()                => {
        let options = [];

        data.authors.map( author => {
            options.push( { label: author.name, value: author.id } );
        } );

        return options;
    };

    // Conditional Components
    const AdminMailAuthor = () => {
        if ( adminMail === 'author' ) {
            return (
                <SelectControl
                    label={ __( 'Author', 'sv_gutenform' ) }
                    value={ adminMailUser }
                    options={ getAuthorOptions() }
                    onChange={ ( value ) => setAdminMailUser( value ) }
                />
            );
        }

        return null;
    };

    return(
        <PanelBody 
            title={ __( 'Form Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <SelectControl
                label={ __( 'Admin Mail', 'sv_gutenform' ) }
                value={ adminMail }
                options={ [
                    { label: 'Disabled', value: 'disabled' },
                    { label: 'Send to Author', value: 'author' },
                    { label: 'Send to Mail', value: 'custom' },
                ] }
                onChange={ ( value ) => setAdminMail( value ) }
            />
            <AdminMailAuthor />
            {
                adminMail === 'custom' 
                ? <TextControl
                    label={ __( 'E-Mail', 'sv_gutenform' ) }
                    type='email'
                    value={ adminMailCustom }
                    onChange={ ( value ) => setAdminMailCustom( value ) }
                />
                : null
            }
        </PanelBody>
    );
}