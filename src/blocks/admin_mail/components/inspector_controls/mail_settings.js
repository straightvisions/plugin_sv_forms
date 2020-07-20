// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
    Button,
} = wp.components;
const { getBlocks } = wp.data.select('core/block-editor');

export default ( { props, wrapper, inputs } ) => {
    if ( ! props || ! wrapper || ! inputs ) return '';

    // Wrapper Properties
    const {
        setAttributes,
        attributes: {
            mailSend,
            mailSubject,
            mailFromTitle,
            mailFromMail,
            mailFiles,
        }
    } = props;

    // Functions to the block attributes
    const setMailSend      = mailSend         => setAttributes({ mailSend });
    const setMailSubject   = mailSubject      => setAttributes({ mailSubject });
    const setMailFromTitle = mailFromTitle    => setAttributes({ mailFromTitle });
    const setMailFromMail  = mailFromMail     => setAttributes({ mailFromMail });

    // Variables
    const files = mailFiles ? JSON.parse( mailFiles ) : [];

    // Returns the File Block Label if available
    const getFileLabel = ID => {
        const wrapperBlocks = getBlocks( wrapper.clientId );
        const formBlock = wrapperBlocks.find( block => { return block.name === 'straightvisions/sv-forms-form'; } );
        const formBlocks = getBlocks( formBlock.clientId );
        let label = 'Default File Label';

        formBlocks.map( block => {
            if ( block.attributes.inputId && block.attributes.inputId === ID ) {
                label = block.attributes.label ? block.attributes.label : block.attributes.name;
            }
        } );

        return label;
    }

    // Returns an array with file block options for the SelectControl
    const getFileOptions = () => {
        let options = [];

        inputs.map( input => {
            if ( input.type === 'file' ) {
                const label = getFileLabel( input.ID );

                options.push( { label: label, value: input.name } );
            }
        } );

        return options;
    };

    // Updates the mailFiles list
    const updateFiles = file => {
        let newFiles = files;
        const index = newFiles.indexOf( file[0] );

        if ( index >= 0 ) {
            newFiles.splice( index, 1 );
        } else {
            newFiles.push( file[0] );
        }

        setAttributes({ mailFiles: JSON.stringify( newFiles ) });
    }

     // Resets the mailTFiles list
     const resetSelection = () => {
        setAttributes({ mailFiles: JSON.stringify( [] ) });
    }

    return(
        <PanelBody
            title={ __( 'Mail Settings', 'sv_forms' ) }
            initialOpen={ true }
        >
            <ToggleControl
                label={ __( 'Send Mail', 'sv_forms' ) }
                checked={ mailSend }
                onChange={ () => setMailSend( ! mailSend ) }
            />
            <TextControl
                label={ __( 'Mail Subject', 'sv_forms' ) }
                value={ mailSubject }
                onChange={ value => setMailSubject( value ) }
            />
            <TextControl
                label={ __( 'Mail From - Title', 'sv_forms' ) }
                value={ mailFromTitle }
                onChange={ value => setMailFromTitle( value ) }
            />
            <TextControl
                label={ __( 'Mail From - E-Mail', 'sv_forms' ) }
                value={ mailFromMail }
                onChange={ value => setMailFromMail( value ) }
            />
            <div className='sv-forms-attachments-list'>
                <SelectControl
                    className='sv-forms-attachments-select'
                    multiple
                    label={ __( 'Select File Blocks:',  'sv_forms' ) }
                    value={ files }
                    onChange={ files => updateFiles( files ) }
                    options={ getFileOptions() }
                />
                <Button 
                    className='sv-forms-attachments-reset'
                    onClick={ () => resetSelection() }
                >
                    { __( 'Reset Selection', 'sv_forms' ) }
                </Button>
            </div>
        </PanelBody>
    );
}