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
        attributes: { inputNames }
    } = props;
    const bodyStyle = { display: 'none' };

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
    
    const toggleBody = () => {
        const body = jQuery( 'div[data-block="' + clientId + '"] > .' + className + ' > .sv-gutenform-body' );
        const icon = jQuery( 'div[data-block="' + clientId + '"] > .' + className + ' > .sv-gutenform-header > .sv-gutenform-title-wrapper > button.components-button > span' );

        if ( body.hasClass( 'sv-gutenform-hidden' ) ) {
            icon.removeClass( 'dashicons-hidden' );
            icon.addClass( 'dashicons-visibility' );
            body.removeClass( 'sv-gutenform-hidden' ).slideDown();
        } else {
            icon.removeClass( 'dashicons-visibility' );
            icon.addClass( 'dashicons-hidden' );
            body.addClass( 'sv-gutenform-hidden' ).slideUp();
        }
    }

    return (
        <div className={ className }>
            <div className='sv-gutenform-header'>
                <div className='sv-gutenform-title-wrapper'>
                    <div className='sv-gutenform-title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                    <Button 
                        isTertiary 
                        onClick={ () => toggleBody() }
                    ><span class="dashicons dashicons-hidden"></span></Button>
                </div>
                <div className='sv-gutenform-description'>
                    { __( 'Everything inside this block will be the content of the submission confirmation.', 'sv_gutenform' ) }
                    <div className='sv-gutenform-input-values-wrapper'>
                        <div className='sv-gutenform-input-values-title'>{ __( 'Available input values: ', 'sv_gutenform' ) }</div>
                        <div className='sv-gutenform-input-values'>
                        {
                            inputNames 
                            ? inputNames.split( ',' ).map( name => {
                                return <div className='sv-gutenform-input-value'>{ name }</div>;
                            } )
                            : ''
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div class='sv-gutenform-body sv-gutenform-hidden' style={ bodyStyle }>
                <InnerBlocks />
            </div>
            <FormContext.Consumer>{ value => setInputNames( value ) }</FormContext.Consumer>
        </div>

        
    ); 
});