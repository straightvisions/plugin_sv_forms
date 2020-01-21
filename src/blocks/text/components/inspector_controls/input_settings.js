// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    Notice,
} = wp.components;
const { 
    select, 
    dispatch 
} = wp.data;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        formId,
        clientId,
        setAttributes,
        attributes: {
            label,
            name,
            type,
            placeholder,
        }
    } = props;

    // Functions to set the block attributes
    const setLabel          = label         => setAttributes({ label });
    const setName           = name          => setAttributes({ name });
    const setPlaceholder    = placeholder   => setAttributes({ placeholder });

    // Returns a string in a slug compatible format
    const getSlug = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    // Returns a notice when the input name is already in use
    const NameCheck = () => {
        const formBlocks = select('core/block-editor').getBlocks( formId );
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

    const updateFormInputs = newName => {
        if ( formId ) {
            const formInputs    = select('core/block-editor').getBlockAttributes( formId ).formInputs;
            const newFormInput  = { name: newName, type: type };
            let newFormInputs   = [ newFormInput ];

            if ( formInputs ) {
                newFormInputs = JSON.parse( formInputs );

                const existingInput = newFormInputs.find( input => {
                    return input.name === name;
                } );

                if ( existingInput ) {
                    const inputIndex = newFormInputs.indexOf( existingInput );

                    newFormInputs[ inputIndex ] = newFormInput;
                } else {
                    newFormInputs.push( newFormInput );
                }
            }

            dispatch('core/block-editor').updateBlockAttributes( formId, { formInputs: JSON.stringify( newFormInputs ) } );
        }
    }

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
            <TextControl
                label={ __( 'Placeholder', 'sv_gutenform' ) }
                value={ placeholder }
                onChange={ value => setPlaceholder( value ) }
            />
        </PanelBody>
    );
}