// Required Components
const { __ } = wp.i18n;
const { withState } = wp.compose;
const { 
    PanelBody,
    Button,
    Modal,
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
            adminMail,
            adminMailUser,
            adminMailCustom,
            confirmationMail,
        }
    } = props;

    const EditConfirmationMail = withState({
        isOpen: false,
    })( ( { isOpen, setState } ) => (
        <div>
            <Button isDefault onClick={ () => setState({ isOpen: true }) }>
                { __( 'Edit Mail Content', 'sv_gutenform' ) }
            </Button>
            { isOpen && (
                <Modal
                    title="This is my modal"
                    onRequestClose={ () => setState({ isOpen: false }) }
                    shouldCloseOnEsc={ false }
                >
                    <Button isPrimary onClick={ () => setState({ isOpen: false }) }>
                         { __( 'Save & Close', 'sv_gutenform' ) }
                    </Button>
                </Modal>
            ) }
        </div>
    ));

    // Returns a list of authors as select options
    const authorOptions = () => {
        let options = [];

        data.authors.map( author => {
            options.push( { label: author.name, value: author.id } );
        } );

        return options;
    }

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
                onChange={ ( value ) => { 
                    setAttributes( { adminMail: value } ) 
                    
                    if ( value === 'author' ) {
                        setAttributes( { adminMailUser: authorOptions()[0].value } )
                    }
                } }
            />
            {
                adminMail === 'author'
                ? <SelectControl
                    label={ __( 'Author', 'sv_gutenform' ) }
                    value={ adminMailUser }
                    options={ authorOptions() }
                    onChange={ ( value ) => setAttributes( { adminMailUser: value } ) }
                />
                : null
            }
            {
                adminMail === 'custom'
                ? <TextControl
                    label={ __( 'E-Mail', 'sv_gutenform' ) }
                    type='email'
                    value={ adminMailCustom }
                    onChange={ ( value ) => setAttributes( { adminMailCustom: value } ) }
                />
                : null
            }
            <ToggleControl
                label={ __( 'Confirmation Mail', 'sv_gutenform' ) }
                checked={ confirmationMail }
                onChange={ () => setAttributes( { confirmationMail: ! confirmationMail } ) }
            />
            {
                confirmationMail
                ? <EditConfirmationMail />
                : null
            }
        </PanelBody>
    );
}