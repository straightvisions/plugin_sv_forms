import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { InnerBlocks }   = wp.blockEditor;
const { Button }        = wp.components;
const { 
    withSelect,
    select,
} = wp.data;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        className,
        setAttributes,
        attributes: {
            formId
        },
    } = props;
    const template = [
        ['straightvisions/sv-gutenform-spam-guard', {
            honeypot: true,
            timeTrap: true,
        }],
        ['straightvisions/sv-gutenform-text', {
            label: __( 'Name', 'sv_gutenform' ),
            name: 'name',
            required: true,
            autofocus: true,
        }],
        ['straightvisions/sv-gutenform-email', {
            label: __( 'E-Mail', 'sv_gutenform' ),
            name: 'email',
            required: true,
        }],
        ['straightvisions/sv-gutenform-url', {
            label: __( 'Website', 'sv_gutenform' ),
            name: 'website',
        }],
        ['straightvisions/sv-gutenform-textarea', {
            label: __( 'Message', 'sv_gutenform' ),
            name: 'message',
            required: true,
        }],
        ['straightvisions/sv-gutenform-submit'],
    ];

    // Functions to set the block attributes
    const setFormId = clientId => { 
        if ( ! formId ) {
            const wrapperBlock = select('core/block-editor').getBlock( clientId );

            if ( wrapperBlock ) {
                setAttributes({ formId: wrapperBlock.attributes.formId }); 
            }
        }
    };

    return (
        <div className={ className }>
            <div className='sv_gutenform_header'>
                <div className='sv_gutenform_title_wrapper'>
                    <div className='sv_gutenform_title'>{ __( 'Form', 'sv_gutenform' ) }</div>
                    <Button 
                        isTertiary 
                        onClick={ () => toggleBody() }
                    ><span class="dashicons dashicons-visibility"></span></Button>
                </div>
            </div>
            <div className='sv_gutenform_body'>
                <InnerBlocks 
                    template={ template }
                    templateLock={ false }
                />
            </div>
            <FormContext.Consumer>{ clientId => setFormId( clientId ) }</FormContext.Consumer>
        </div>
    );
});