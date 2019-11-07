// Required Components
const { __ } = wp.i18n;
const { 
    PanelBody,
    TextControl,
    RadioControl,
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
            action,
            method,
        }
    } = props;

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
            <TextControl
                label={ __( 'Action', 'sv_gutenform' ) }
                value={ action }
                onChange={ ( value ) => setAttributes( { action: value } ) }
            />
            <RadioControl
                label={ __( 'Method', 'sv_gutenform' ) }
                selected={ method }
                options={ [
                    { label: 'POST', value: 'POST' },
                    { label: 'GET', value: 'GET' },
                ] }
                onChange={ ( value ) => { setAttributes( { method: value } ) } }
            />
            <SelectControl
                label={ __( 'Admin Mail', 'sv_gutenform' ) }
                value={ adminMail }
                options={ [
                    { label: 'Disabled', value: 'disabled' },
                    { label: 'Send to Author', value: 'author' },
                    { label: 'Send to Mail', value: 'custom' },
                ] }
                onChange={ ( value ) => { setAttributes( { adminMail: value } ) } }
            />
            {
                adminMail === 'author'
                ? <SelectControl
                    label={ __( 'Author', 'sv_gutenform' ) }
                    value={ adminMailUser }
                    options={ authorOptions() }
                    onChange={ ( value ) => { setAttributes( { adminMailUser: value } ) } }
                />
                : null
            }
            {
                adminMail === 'custom'
                ? <TextControl
                    label={ __( 'E-Mail', 'sv_gutenform' ) }
                    type='email'
                    value={ adminMailCustom }
                    onChange={ ( value ) => { setAttributes( { adminMailCustom: value } ) } }
                />
                : null
            }
        </PanelBody>
    );
}