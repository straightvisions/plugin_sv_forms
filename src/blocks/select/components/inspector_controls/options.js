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

    // Stores the parsed options as array
    const parsedOptions = options ? JSON.parse( options ) : [];

    // Functions to set the block attributes
    const updateOptions = options  => setAttributes({ options });

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
            title={ __( 'Options', 'sv_forms' ) }
            initialOpen={ true }
        >
            <div className='sv-forms-select-options'>
                <Button
                    className='sv-forms-add-option'
                    onClick={ () => addOption() }
                >
                    { __( 'Add Option', 'sv_forms' ) }
                </Button>
                {
                    parsedOptions.map( ( option, index ) => {
                        return(
                            <div className='sv-forms-select-option'>
                                <div className='sv-forms-select-option-flex'>
                                    <TextControl
                                        label={ __( 'Label', 'sv_forms' ) }
                                        value={ option.label }
                                        onChange={ value => updateOption( index, 'label', value ) }
                                        autofocus
                                    />
                                    <TextControl
                                        label={ __( 'Value', 'sv_forms' ) }
                                        value={ option.value }
                                        onChange={ value => updateOption( index, 'value', getFormatedName( value ) ) }
                                    />
                                </div>
                                <div className='sv-forms-select-option-flex'>
                                    <ToggleControl
                                        label={ __( 'Disabled', 'sv_forms' ) }
                                        checked={ option.disabled }
                                        onChange={ () => updateOption( index, 'disabled', ! option.disabled )  }
                                    />
                                    <Button
                                        label={ __( 'Delete Option', 'sv_forms' ) }
                                        className='sv-forms-option-remove'
                                        icon='no-alt'
                                        onClick={ () => deleteOption( index ) }
                                    />
                                </div>
                            </div>
                        );

                    } )
                }
            </div>
        </PanelBody>
    );
}