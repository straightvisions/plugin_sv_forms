// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    ToggleControl,
    Button,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { options }
    } = props;

    const parsedOptions = options ? JSON.parse( options ) : [];

    // Functions to set the block attributes
    const updateOptions = options => setAttributes({ options });

    // Returns the input name in a valid format
    const getFormatedName = name => {
        if ( ! name ) return '';

        return name.replace( /[^A-Z0-9]+/ig, '-' );
    };

    // Updates the property of a single option
    const updateOption = ( index, prop, value ) => {
        let newOptions = parsedOptions;

        newOptions[ index ][ prop ] = value;

        updateOptions( JSON.stringify( newOptions ) );
    }

    // Deletes an option
    const deleteOption = index => {
        let newOptions = parsedOptions;

        newOptions.splice( index, 1 );

        updateOptions( JSON.stringify( newOptions ) );
    }

    // Adds an option
    const addOption = () => {
        let newOptions = parsedOptions;
        const newOption = { label: '', value: '' };

        newOptions.push( newOption );

        updateOptions( JSON.stringify( newOptions ) );
    }

    return(
        <PanelBody
            title={ __( 'Options', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <div className='sv-gutenform-radio-options'>
                <Button
                    className='sv-gutenform-add-option'
                    onClick={ () => addOption() }
                >
                    { __( 'Add Option', 'sv_gutenform' ) }
                </Button>
                {
                    parsedOptions.map( ( option, index ) => {
                        return(
                            <div className='sv-gutenform-radio-option'>
                                <div className='sv-gutenform-radio-option-flex'>
                                    <TextControl
                                        label={ __( 'Label', 'sv_gutenform' ) }
                                        value={ option.label }
                                        onChange={ value => updateOption( index, 'label', value ) }
                                    />
                                    <TextControl
                                        label={ __( 'Value', 'sv_gutenform' ) }
                                        value={ getFormatedName( option.value ) }
                                        onChange={ value => updateOption( index, 'value', getFormatedName( value ) ) }
                                    />
                                </div>
                                <div className='sv-gutenform-radio-option-flex'>
                                    <ToggleControl
                                        label={ __( 'Disabled', 'sv_gutenform' ) }
                                        checked={ option.disabled }
                                        onChange={ () => updateOption( index, 'disabled', ! option.disabled )  }
                                    />
                                    <Button 
                                        label={ __( 'Delete Option', 'sv_gutenform' ) }
                                        className='sv-gutenform-option-remove'
                                        icon='no-alt'
                                        onClick={ () => deleteOption( index ) }
                                    ></Button>
                                </div>
                            </div>
                        );

                    } )
                }
            </div>
        </PanelBody>
    );
}