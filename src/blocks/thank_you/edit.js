// Required Components
import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { 
    withSelect,
    select 
} = wp.data;
const { InnerBlocks }   = wp.blockEditor;
const { Button }        = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        clientId,
        className,
        setAttributes,
        attributes: { 
            inputNames, 
        }
    } = props;

    // Functions
    const setInputNames = formId => {
        const formBlocks        = select( 'core/block-editor' ).getBlocks( formId );
        const filteredBlocks    = formBlocks.filter( block => {
            return block.attributes.name;
        } );
        const names             = filteredBlocks.map( block => {
            return '%' + block.attributes.name + '%';
        } );

        const uniqueNames = [...new Set(names)];

        if ( inputNames !== uniqueNames ) {
            setAttributes({ inputNames: uniqueNames.join( ', ' ) });
        }
    }

    return (
        <div className={ className }>
            <div className='sv_gutenform_header'>
                <div className='sv_gutenform_title_wrapper'>
                    <div className='sv_gutenform_title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                    <Button 
                        isTertiary 
                        onClick={ () => toggleBody() }
                    ><span class='dashicons dashicons-visibility'></span></Button>
                </div>
                <div className='sv_gutenform_input_values_wrapper'>
                    <div className='sv_gutenform_input_values_title'>{ __( 'Available input values: ', 'sv_gutenform' ) }</div>
                    <div className='sv_gutenform_input_values'>
                    {
                        inputNames 
                        ? inputNames.split( ',' ).map( name => {
                            return <div className='sv_gutenform_input_value'>{ name }</div>;
                        } )
                        : ''
                    }
                    </div>
                </div>
            </div>
            <div className='sv_gutenform_body'>
                <InnerBlocks templateLock={ false } />
            </div>
            <FormContext.Consumer>{ value => setInputNames( value ) }</FormContext.Consumer>
        </div>

        
    ); 
});