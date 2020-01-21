// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    Notice,
} = wp.components;
const { 
    select,
    dispatch,
} = wp.data;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        formClientId,
        clientId,
        setAttributes,
        attributes: {
            inputId,
            label,
            name,
            type,
        }
    } = props;

    // Functions to set the block attributes
    const setLabel  = label  => setAttributes({ label });
    const setName   = name   => setAttributes({ name });

    // Returns a string in a slug compatible format
    const getSlug = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    // Returns a notice when the input name is already in use
    const NameCheck = () => {
        const formBlocks = select('core/block-editor').getBlocks( formClientId );
        let output = null;
        
        formBlocks.map( block => {
            if ( 
                block.name.startsWith( 'straightvisions/sv-gutenform' ) 
                && block.clientId !== clientId
                && block.attributes.name
                && block.attributes.name === name
            ) {
                output = 
                <Notice 
                    status='warning' 
                    className='sv-gutenform-name-check'
                    isDismissible={ false }
                >
                    { __( 'This input name is already in use!', 'sv_gutenform' ) }
                </Notice>;
            }
        } );

        return output;
    };

    // Updates the formInput attribute in the wrapper block
    const updateFormInputs = newName => {
        if ( formClientId ) {
            const formInputs    = select('core/block-editor').getBlockAttributes( formClientId ).formInputs;
            const newFormInput  = { ID: inputId, name: newName, type: type };
            let newFormInputs   = [ newFormInput ];

            if ( formInputs ) {
                newFormInputs = JSON.parse( formInputs );

                const existingInput = newFormInputs.find( input => {
                    return input.ID === inputId;
                } );

                if ( existingInput ) {
                    const inputIndex = newFormInputs.indexOf( existingInput );

                    newFormInputs[ inputIndex ] = newFormInput;
                } else {
                    newFormInputs.push( newFormInput );
                }
            }

            dispatch('core/block-editor').updateBlockAttributes( formClientId, { formInputs: JSON.stringify( newFormInputs ) } );
        }
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
                    //setName( getSlug( value ) ); @todo Deactivated, because this feature can result to problems. Need a better concept!
                } }
            />
            <TextControl
                label={ __( 'Name', 'sv_gutenform' ) }
                value={ getSlug( name ) }
                onChange={ value => { 
                    updateFormInputs( getSlug( value ) );
                    setName( getSlug( value ) );
                }}
            />
            <NameCheck />
        </PanelBody>
    );
}