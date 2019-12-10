// Required Components
import iconDelete from '../../icons/delete';

const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    ToggleControl,
    Button,
    IconButton,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { options }
    } = props;

    const parsedOptions = options ? JSON.parse( options ) : [];

    // Functions
    const updateOptions     = options       => setAttributes({ options });
    const getSlug           = string => {
        if ( ! string ) return '';

        const slug = string.replace( /[^A-Z0-9]+/ig, '-' ).toLowerCase();

        return slug;
    };

    // Updates the property of a single option
    const updateOption      = ( index, prop, value ) => {
        let newOptions      = parsedOptions;

        newOptions[ index ][ prop ] = value;

        if ( prop === 'label' ) {
            newOptions[ index ].value = getSlug( value );
        }

        updateOptions( JSON.stringify( newOptions ) );
    }

    // Deletes an option
    const deleteOption      = index => {
        let newOptions      = parsedOptions;

        newOptions.splice( index, 1 );

        updateOptions( JSON.stringify( newOptions ) );
    }

    // Adds an option
    const addOption         = () => {
        let newOptions      = parsedOptions;
        const newOption     = { label: '', value: '' };

        newOptions.push( newOption );

        updateOptions( JSON.stringify( newOptions ) );
    }

    return(
        <PanelBody
            title={ __( 'Options', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <div className='sv-gutenform-radio-options'>
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
                                    value={ getSlug( option.value ) }
                                    onChange={ value => updateOption( index, 'value', getSlug( value ) ) }
                                />
                            </div>
                            <div className='sv-gutenform-radio-option-flex'>
                                <ToggleControl
                                    label={ __( 'Disabled', 'sv_gutenform' ) }
                                    checked={ option.disabled }
                                    onChange={ () => updateOption( index, 'disabled', ! option.disabled )  }
                                />
                                <IconButton
                                    icon={ iconDelete }
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
                isPrimary
                onClick={ () => addOption() }
            >
                { __( 'Add Option', 'sv_gutenform' ) }
            </Button>
        </PanelBody>
    );
}