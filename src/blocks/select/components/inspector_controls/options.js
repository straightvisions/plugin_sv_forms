// Required Components
import iconDelete from '../../icons/delete';

const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
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

    const parsedOptions = JSON.parse( options );

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

    // Conditional Components
    // Returns a single option entry
    const OptionEntry = ({ index, label, value }) => (
        <div className='sv-gutenform-select-option'>
            <div className='sv-gutenform-select-option-flex'>
                <TextControl
                    label={ __( 'Label', 'sv_gutenform' ) }
                    value={ label }
                    onChange={ value => updateOption( index, 'label', value ) }
                />
                <TextControl
                    label={ __( 'Value', 'sv_gutenform' ) }
                    value={ getSlug( value ) }
                    onChange={ value => updateOption( index, 'value', getSlug( value ) ) }
                />
            </div>
            <IconButton
                icon={ iconDelete }
                label={ __( 'Delete Option', 'sv_gutenform' ) }
                onClick={ () => deleteOption( index ) }
            />
        </div>
    );

    // Returns all option entries
    const Options = () => {
        let entries         = [];
    
        parsedOptions.forEach( ( option, index ) => {
            entries.push(
                <OptionEntry 
                    index={ index }
                    label={ option.label } 
                    value={ option.value } 
                /> 
            );
        } );

        return <div className='sv-gutenform-select-options'>{ entries }</div>;
    }

    return(
        <PanelBody
            title={ __( 'Options', 'sv_gutenform' ) }
            initialOpen={ true }
        >
            <Options />
            <Button
                isPrimary
                onClick={ () => addOption() }
            >
                { __( 'Add Option', 'sv_gutenform' ) }
            </Button>
        </PanelBody>
    );
}