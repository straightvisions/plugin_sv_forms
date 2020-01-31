// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    Notice,
} = wp.components;
const { select } = wp.data;

export default ( { props, wrapper } ) => {
    if ( ! props || ! wrapper ) return '';

    // Block Attributes
    const { 
        clientId,
        setAttributes,
        attributes: {
            inputId,
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

    // Returns the input name in a valid format
    const getFormatedName = name => {
        if ( ! name ) return '';

        return name.replace( /[^A-Z0-9]+/ig, '-' );
    };

    // Returns a notice when the input name is already in use
    const NameCheck = () => {
        const wrapperBlocks = select('core/block-editor').getBlocks( wrapper.clientId );
        let output = null;

        wrapperBlocks.map( block => {
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
    const setFormInputs = newName => {
        if ( wrapper.attributes ) {
            const newFormInput      = { ID: inputId, name: newName, type: type };
            let newFormInputs       = [ newFormInput ];

            if ( wrapper.attributes.formInputs ) {
                newFormInputs = JSON.parse( wrapper.attributes.formInputs );

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

            wrapper.setAttributes({ formInputs: JSON.stringify( newFormInputs ) });
        }
    };

    return(
        <PanelBody
            title={ __( 'Textarea Settings', 'sv_gutenform' ) }
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
                value={ getFormatedName( name ) }
                onChange={ value => { 
                    setFormInputs( getFormatedName( value ) );
                    setName( getFormatedName( value ) );
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