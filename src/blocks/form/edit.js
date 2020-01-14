const { Component }     = wp.element;
const { __ }            = wp.i18n;
const { InnerBlocks }   = wp.blockEditor;
const { Button }        = wp.components;

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
    componentDidMount() {
        this.toggleBody( false );
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={ this.props.className }>
                <div className='sv-gutenform-header'>
                    <div className='sv-gutenform-title-wrapper'>
                        <div className='sv-gutenform-title'>{ __( 'Form', 'sv_gutenform' ) }</div>
                        <Button 
                            isTertiary 
                            onClick={ () => this.toggleBody( true ) }
                        ><span class="dashicons dashicons-hidden"></span></Button>
                    </div>
                </div>
                <div class='sv-gutenform-body'>
                    <InnerBlocks 
                        template={ this.template }
                        templateLock={ false }
                    />
                </div>
            </div>
        );
    }

    // Custom Methods
    toggleBody( change ) {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv-gutenform-body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv-gutenform-header > .sv-gutenform-form-title-wrapper > button.components-button > span' );

        if ( change ) {
            if ( this.props.attributes.collapsed ) {
                icon.removeClass( 'dashicons-hidden' );
                icon.addClass( 'dashicons-visibility' );
                body.removeClass( 'sv-gutenform-hidden' ).slideDown();
            } else {
                icon.removeClass( 'dashicons-visibility' );
                icon.addClass( 'dashicons-hidden' );
                body.addClass( 'sv-gutenform-hidden' ).slideUp();
            }

            this.props.setAttributes({ collapsed: ! this.props.attributes.collapsed });
        } else {
            if ( this.props.attributes.collapsed ) {
                icon.removeClass( 'dashicons-visibility' );
                icon.addClass( 'dashicons-hidden' );
                body.addClass( 'sv-gutenform-hidden' ).slideUp();
            } else {
                icon.removeClass( 'dashicons-hidden' );
                icon.addClass( 'dashicons-visibility' );
                body.removeClass( 'sv-gutenform-hidden' ).slideDown();
            }
        }
    }
}