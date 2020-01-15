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
} = wp.data;

export default withSelect( ( select, props ) => {
    return {
        innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ),
        props
    };
} )( ({ innerBlocks, props }) => {
    const {
        clientId,
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

        const newAttributes = {
            adminMailSubject: subject,
            adminMailFromTitle: fromTitle,
            adminMailFromMail: fromMail,
            adminMailContent: getMailContent(),
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes );
    }

    const setInputNames = formId => {
        const formBlocks = select( 'core/block-editor' ).getBlocks( formId );
        const filteredBlocks = formBlocks.filter( block => {
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

    const toggleBody = () => {
        const body = jQuery( 'div[data-block="' + clientId + '"] > .' + className + ' > .sv_gutenform_body' );
        const icon = jQuery( 'div[data-block="' + clientId + '"] > .' + className + ' > .sv_gutenform_header > .sv_gutenform_title_wrapper > button.components-button > span' );

        if ( body.hasClass( 'sv_gutenform_hidden' ) ) {
            icon.removeClass( 'dashicons-hidden' );
            icon.addClass( 'dashicons-visibility' );
            body.removeClass( 'sv_gutenform_hidden' ).slideDown();
        } else {
            icon.removeClass( 'dashicons-visibility' );
            icon.addClass( 'dashicons-hidden' );
            body.addClass( 'sv_gutenform_hidden' ).slideUp();
        }
    }

    return (
        <div className={ className }>
            <InspectorControls props={ props } />
            <div className='sv_gutenform_header'>
                <div className='sv_gutenform_title_wrapper'>
                    <div className='sv_gutenform_title'>{ __( 'Admin Mail', 'sv_gutenform' ) }</div>
                    <Button 
                        isTertiary 
                        onClick={ () => toggleBody() }
                    ><span class='dashicons dashicons-hidden'></span></Button>
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
            <div class='sv_gutenform_body sv_gutenform_hidden'>
                <InnerBlocks templateLock={ false } />
            </div>
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </div>
    );
});