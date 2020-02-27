import { FormContext } from '../../blocks';

const { 
    Component, 
    Fragment 
} = wp.element;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props      = props;
        this.state      = {};
        this.template   = [
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
    }

    // React Lifecycle Methos
    componentDidMount = () => {
        this.toggleBody( false );
        this.getAllowedBlocks();
    }

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

    // Sets the formId attribute for this block
    setFormId = wrapper => {
        if ( ! this.props.attributes.formId ) {
            this.props.setAttributes({ formId: wrapper.attributes.formId });
        }
    }

    // Returns all allowed blocks
    getAllowedBlocks = () => {
        const disallowedBlocks = [ 
            'straightvisions/sv-gutenform', 
            'straightvisions/sv-gutenform-form',
            'straightvisions/sv-gutenform-thank-you',
            'straightvisions/sv-gutenform-user-mail',
            'straightvisions/sv-gutenform-admin-mail'  
        ];
        const availableBlocks = wp.data.select('core/blocks').getBlockTypes();
        let allowedBlocks = [];

        availableBlocks.map( block => {
            if ( ! disallowedBlocks.includes( block.name ) ) {
                allowedBlocks.push( block.name );
            }
        } );
        
        return allowedBlocks;
    }

    // Togles the collapsed state of the body
    toggleBody = change => {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_gutenform_body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_gutenform_header > .sv_gutenform_title_wrapper > button.components-button > span' );

        if ( change ) {
            if ( this.props.attributes.collapsed ) {
                icon.removeClass( 'dashicons-hidden' );
                icon.addClass( 'dashicons-visibility' );
                body.slideDown();
            } else {
                icon.removeClass( 'dashicons-visibility' );
                icon.addClass( 'dashicons-hidden' );
                body.slideUp();
            }

            this.props.setAttributes({ collapsed: ! this.props.attributes.collapsed });
        } else {
            if ( this.props.attributes.collapsed ) {
                icon.removeClass( 'dashicons-visibility' );
                icon.addClass( 'dashicons-hidden' );
                body.slideUp();
            } else {
                icon.removeClass( 'dashicons-hidden' );
                icon.addClass( 'dashicons-visibility' );
                body.slideDown();
            }
        }
    }

    render = () => {
        return (
            <Fragment>
                <div className={ this.props.className }>
                    <div className='sv_gutenform_header'>
                        <div className='sv_gutenform_title_wrapper'>
                            <div className='sv_gutenform_title'>{ __( 'Form', 'sv_gutenform' ) }</div>
                            <Button onClick={ () => this.toggleBody( true ) }>
                                <span class='dashicons dashicons-visibility'></span>
                            </Button>
                        </div>
                    </div>
                    <div className='sv_gutenform_body'>
                        <InnerBlocks 
                            allowedBlocks={ this.getAllowedBlocks() }
                            template={ this.template }
                            templateLock={ false }
                        />
                    </div>
                </div>
                <FormContext.Consumer>{ wrapper => { this.setFormId( wrapper ) } }</FormContext.Consumer>
            </Fragment>
        );
    }
}