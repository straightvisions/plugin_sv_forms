// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    Button,
    SelectControl,
} = wp.components;
const { getBlocks } = wp.data.select('core/block-editor');

export default ( { props, wrapper } ) => {
    if ( ! props || ! wrapper ) return '';

    // Wrapper Properties
    const {
        setAttributes,
        attributes: {
            formInputs,
            mailToMails,
        }
    } = props;

    // Variables
    const mails = mailToMails ? JSON.parse( mailToMails ) : [];

    // Returns the E-Mail Block Label if available
    const getMailLabel = ID => {
        const wrapperBlocks = getBlocks( wrapper.clientId );
        const formBlock = wrapperBlocks.find( block => { return block.name === 'straightvisions/sv-gutenform-form'; } );
        const formBlocks = getBlocks( formBlock.clientId );
        let label = '';

        formBlocks.map( block => {
            if ( block.attributes.inputId && block.attributes.inputId === ID ) {
                label = block.attributes.label ? block.attributes.label : block.attributes.name;
            }
        } );

        return label;
    }

    // Returns an array with email block options for the SelectControl
    const getMailOptions = () => {
        const inputs = formInputs ? JSON.parse( formInputs ) : [];
        let options = [];

        inputs.map( input => {
            if ( input.type === 'email' ) {
                const label = getMailLabel( input.ID );

                options.push( { label: label, value: input.name } );
            }
        } );

        return options;
    };

    // Updates the mailToMails list
    const updateMails = mail => {
        let newMails = mails;
        const index = newMails.indexOf( mail[0] );

        if ( index >= 0 ) {
            newMails.splice( index, 1 );
        } else {
            newMails.push( mail[0] );
        }

        setAttributes({ mailToMails: JSON.stringify( newMails ) });
    }

     // Resets the mailToMails list
     const resetSelection = () => {
        setAttributes({ mailToMails: JSON.stringify( [] ) });
    }

    return(
        <PanelBody
            title={ __( 'Send to Mails', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <div className='sv-gutenform-mails-list'>
                <SelectControl
                    className='sv-gutenform-mails-select'
                    multiple
                    label={ __( 'Select E-Mail Blocks:',  'sv_gutenform' ) }
                    value={ mails }
                    onChange={ mails => updateMails( mails ) }
                    options={ getMailOptions() }
                />
                <Button 
                    className='sv-gutenform-mails-reset'
                    onClick={ () => resetSelection() }
                >
                    { __( 'Reset Selection', 'sv_gutenform' ) }
                </Button>
            </div>
        </PanelBody>
    );
}