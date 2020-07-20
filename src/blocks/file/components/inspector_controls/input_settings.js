// Required Components
import { InputsProvider } from '../../../../blocks';

const { __ } = wp.i18n;
const { PanelBody, TextControl, Notice } = wp.components;

export default ( { props, wrapper, inputs } ) => {
    if ( ! props || ! wrapper || ! inputs ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            inputId,
            label,
            name,
        }
    } = props;

    // Functions to set the block attributes
    const setLabel          = label         => setAttributes({ label });
    const setName           = name          => setAttributes({ name });

    // Returns the input name in a valid format
    const getFormatedName = name => {
        if ( ! name ) return '';

        return name.replace( /[^A-Z0-9]+/ig, '-' );
    };

    // Returns a notice when the input name is already in use
    const NameCheck = () => {
        let output = null;

        inputs.map( input => {
            if ( input.name === name && input.ID !== inputId ) {
                output = 
                    <Notice 
                        status='warning' 
                        className='sv-forms-name-check'
                        isDismissible={ false }
                    >
                        { __( 'This input name is already in use!', 'sv_forms' ) }
                    </Notice>;
            }
        } );

        return output;
    };

    return(
        <PanelBody
            title={ __( 'Input Settings', 'sv_forms' ) }
            initialOpen={ true }
        >
            <TextControl
                label={ __( 'Label', 'sv_forms' ) }
                value={ label }
                onChange={ value => setLabel( value ) }
            />
            <TextControl
                label={ __( 'Name', 'sv_forms' ) }
                value={ getFormatedName( name ) }
                onChange={ value => setName( getFormatedName( value ) ) }
            />
            <NameCheck />
        </PanelBody>
    );
}