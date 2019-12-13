// Required Components
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { 
    dispatch,
    select, 
} = wp.data;
const {
    PanelBody,
    TextControl,
    ToggleControl,
} = wp.components;

export default ( { props, formId } ) => {
    if ( ! props || ! formId ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            label,
            name,
            placeholder,
            sendMail,
        }
    } = props;

    // Functions
    const setLabel          = label         => setAttributes({ label });
    const setPlaceholder    = placeholder   => setAttributes({ placeholder });

    const setName           = name          => { 
        setAttributes({ name });
        updateFormAttributes({ sendMail, name });
    };

    const setSendMail       = sendMail      => { 
        setAttributes({ sendMail });
        addUserMailBlock( sendMail );
        updateFormAttributes({ sendMail, name });
    };

    const addUserMailBlock  = sendMail      => {
        if ( sendMail ) {
            const isUserMailBlock = select('core/block-editor').getBlocks( formId ).some( block => { 
                return block.name === 'straightvisions/sv-gutenform-user-mail';
            });
    
            if ( ! isUserMailBlock ) {
                const userMailBlock = createBlock( 'straightvisions/sv-gutenform-user-mail' );
    
                dispatch( 'core/block-editor' ).insertBlock( userMailBlock, 0, formId );
            }
        }
    };

    // Updates the userMailContent atrribute of the sv-gutenform block
    const updateFormAttributes = ({ sendMail, name }) => {
        const newAttributes = {
            userMail: sendMail,
            userMailInputName: name,
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes );
    }
    const getSlug           = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Label', 'sv_gutenform' ) }
                value={ label }
                onChange={ value => { 
                    setLabel( value );
                    setName( getSlug( value ) );
                } }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getSlug( name ) }
                onChange={ value => setName( getSlug( value ) ) }
            />
            <TextControl
                label={ __( 'Placeholder', 'sv_gutenform' ) }
                value={ placeholder }
                onChange={ value => setPlaceholder( value )  }
            />
            <ToggleControl
                label={ __( 'Send Confirmation Mail', 'sv_gutenform' ) }
                help={ __( 'This E-Mail adress will recieve a confirmation mail.', 'sv_gutenform' ) }
                checked={ sendMail }
                onChange={ () => setSendMail( ! sendMail ) }
            />
        </PanelBody>
    );
}