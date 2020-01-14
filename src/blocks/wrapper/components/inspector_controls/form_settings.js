// Required Components
const { __ }            = wp.i18n;
const { createBlock }   = wp.blocks;
const { 
    select, 
    dispatch 
} = wp.data;
const { 
    PanelBody,
    TextControl,
    SelectControl,
    ToggleControl,
} = wp.components;

export default ( { props, data } ) => {
    if ( ! props || ! data ) return '';

    // Block Properties
    const { 
        setAttributes,
        attributes: {
            formLabel,
            saveSubmits,
            adminMail,
            adminMailUser,
            adminMailAdress,
        },
        clientId,
    } = props;

    // Functions
    const setFormLabel      = formLabel => setAttributes({ formLabel });
    const setSaveSubmits    = saveSubmits => setAttributes({ saveSubmits });
    const setAdminMail      = adminMail => { 
        setAttributes({ adminMail });

        if ( adminMail !== 'disabled' ) {
            addAdminMailBlock();
        }

        if ( adminMail === 'author' ) {
            setAdminMailUser( getAuthorOptions()[0].value );
        }
    };
    const addAdminMailBlock = () => {
        const formBlocks        = select('core/block-editor').getBlocks( clientId );
        const isAdminMailBlock  = formBlocks.some( block => { 
            return block.name === 'straightvisions/sv-gutenform-admin-mail';
        });
        const position          = formBlocks.length + 1;
        
        if ( ! isAdminMailBlock ) {
            const adminMailBlock = createBlock( 'straightvisions/sv-gutenform-admin-mail' );

            dispatch( 'core/block-editor' ).insertBlock( adminMailBlock, position, clientId, true );
        }
    };
    const setAdminMailUser      = adminMailUser     => setAttributes({ adminMailUser });
    const setAdminMailAdress    = adminMailAdress   => setAttributes({ adminMailAdress });
    const getAuthorOptions      = ()                => {
        let options = [];

        if ( data.authors ) {
            data.authors.map( author => {
                options.push( { label: author.name, value: author.id } );
            } );
        }

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
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Form Label', 'sv_gutenform' ) }
                type='text'
                value={ formLabel }
                onChange={ value => setFormLabel( value ) }
            />
            <ToggleControl
                label={ __( 'Save Submits', 'sv_gutenform' ) }
                checked={ saveSubmits }
                onChange={ () => setSaveSubmits( ! saveSubmits )  }
            />
            <SelectControl
                label={ __( 'Admin Mail', 'sv_gutenform' ) }
                value={ adminMail }
                options={ [
                    { label: 'Disabled', value: 'disabled' },
                    { label: 'Send to Author', value: 'author' },
                    { label: 'Send to Mail', value: 'adress' },
                ] }
                onChange={ value => setAdminMail( value ) }
            />
            <AdminMailAuthor />
            {
                adminMail === 'adress' 
                ? <TextControl
                    label={ __( 'E-Mail', 'sv_gutenform' ) }
                    type='email'
                    value={ adminMailAdress }
                    onChange={ value => setAdminMailAdress( value ) }
                />
                : null
            }
        </PanelBody>
    );
}