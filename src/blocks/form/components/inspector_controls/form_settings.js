// Required Components
const { __ } = wp.i18n;
const { 
    PanelBody,
    TextControl,
    RadioControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Properties
    const { 
        setAttributes,
        attributes: {
            action,
            method,
        }
    } = props;

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
        </PanelBody>
    );
}