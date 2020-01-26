// Required Components
import iconDelete from '../../icons/delete';

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
            <div className='sv-gutenform-select-options'>
            {
                parsedOptions.map( ( option, index ) => {
                    return(
                        <div className='sv-gutenform-select-option'>
                            <div className='sv-gutenform-select-option-flex'>
                                <TextControl
                                    label={ __( 'Label', 'sv_gutenform' ) }
                                    value={ option.label }
                                    onChange={ value => updateOption( index, 'label', value ) }
                                    autofocus
                                />
                                <TextControl
                                    label={ __( 'Value', 'sv_gutenform' ) }
                                    value={ option.value }
                                    onChange={ value => updateOption( index, 'value', value ) }
                                />
                            </div>
                            <div className='sv-gutenform-select-option-flex'>
                                <ToggleControl
                                    label={ __( 'Disabled', 'sv_gutenform' ) }
                                    checked={ option.disabled }
                                    onChange={ () => updateOption( index, 'disabled', ! option.disabled )  }
                                />
                                <Button
                                    icon='trash'
                                    label={ __( 'Delete Option', 'sv_gutenform' ) }
                                    onClick={ () => deleteOption( index ) }
                                />
                            </div>
                        </div>
                    );

                } )
            }
            </div>
            <Button
                className="sv-gutenform-add-option-button"
                onClick={ () => addOption() }
            >
                { __( 'Add Option', 'sv_gutenform' ) }
            </Button>
        </PanelBody>
    );
}