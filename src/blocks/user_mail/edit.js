// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { __ }                = wp.i18n;
const { InnerBlocks }       = wp.blockEditor;
const { getBlockContent }   = wp.blocks;
const { Button }            = wp.components;
const { 
    withSelect, 
    dispatch,
    select
}                           = wp.data;

export default withSelect( ( select, props ) => {
    return {
        innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ),
        props
    };
} )( ({ innerBlocks, props }) => {
    const {
        className,
        setAttributes,
        attributes: {
            subject,
            fromTitle,
            fromMail,
            inputNames,
        }
    } = props;


    // Functions
    // Returns the innerBlocks content as string
    const getMailContent = () => {
        return innerBlocks.map( block => { return  getBlockContent( block ) } ).join( '' );
    }

    // Updates the atrributes of the sv-gutenform block
    const updateFormAttributes = formId => {
        setInputNames( formId );

        const newAttributes     = {
            userMailSubject: subject,
            userMailFromTitle: fromTitle,
            userMailFromMail: fromMail,
            userMailContent: getMailContent(),
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes);
    }

    const setInputNames = formId => {
        const formBlocks        = select( 'core/block-editor' ).getBlocks( formId );
        const filteredBlocks    = formBlocks.filter( block => {
            return block.attributes.name;
        } );
        const names = filteredBlocks.map( block => {
            return '%' + block.attributes.name + '%';
        } );

        const uniqueNames = [...new Set(names)];

        if ( inputNames !== uniqueNames ) {
            setAttributes({ inputNames: uniqueNames.join( ', ' ) });
        }
    }

    return (
        <div className={ className }>
            <InspectorControls props={ props } />
            <div className='sv_gutenform_header'>
                <div className='sv_gutenform_title_wrapper'>
                    <div className='sv_gutenform_title'>{ __( 'User Mail', 'sv_gutenform' ) }</div>
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
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </div>
    );
});