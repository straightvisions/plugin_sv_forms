// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            subject,
            fromTitle,
            fromMail,
        }
    } = props;

    // Functions to set the block attributes
    const setSubject    = subject   => setAttributes({ subject });
    const setFromTitle  = fromTitle => setAttributes({ fromTitle });
    const setFromMail   = fromMail  => setAttributes({ fromMail });

    return(
        <PanelBody
            title={ __( 'Mail Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Subject', 'sv_gutenform' ) }
                value={ subject }
                onChange={ value => setSubject( value )  }
            />
            <TextControl
                label={ __( 'From - Title', 'sv_gutenform' ) }
                value={ fromTitle }
                onChange={ value => setFromTitle( value )  }
            />
            <TextControl
                label={ __( 'From - Mail', 'sv_gutenform' ) }
                value={ fromMail }
                onChange={ value => setFromMail( value )  }
            />
        </PanelBody>
    );
}