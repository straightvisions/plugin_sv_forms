// Required Components
import { FormContext } from '../../blocks';

const { 
    Button, 
    Tooltip,
    ClipboardButton 
} = wp.components;
const { 
    Component, 
    Fragment 
} = wp.element;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.wrapper = {};
    }

     // React Lifecycle Methos
    componentDidMount = () => {
        this.toggleBody( false );
    }

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

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

    // Creates a clippboard button with the input name as value
    InputValueButton = name => {
        const toolTipText   = __( 'Copy to clippboard.', 'sv_gutenform' );
        const buttonText    = '%' + name + '%';

        return (
            <Tooltip text={ toolTipText }>
                <ClipboardButton
                    isTertiary
                    className='sv_gutenform_input_value'
                    text={ buttonText }
                >
                    { buttonText }
                </ClipboardButton>
            </Tooltip>
        );
    }

    // Returns the available input values
    InputValues = () => {
        if ( ! this.props.attributes.formInputs ) return null;

        const formInputs = JSON.parse( this.props.attributes.formInputs );

        if ( ! formInputs || formInputs.length < 1 ) return null;

        let output = [];

        formInputs.map( input => {
            output.push( this.InputValueButton( input.name ) );
        } );

        return <div className='sv_gutenform_input_values'>{ output }</div>;
    }

    render = () => {
        return (
            <Fragment>
                <div className={ this.props.className }>
                    <div className='sv_gutenform_header'>
                        <div className='sv_gutenform_title_wrapper'>
                            <div className='sv_gutenform_title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                            <Button onClick={ () => this.toggleBody( true ) }>
                                <span class='dashicons dashicons-visibility'></span>
                            </Button>
                        </div>
                        <div className='sv_gutenform_input_values_wrapper'>
                            <div className='sv_gutenform_input_values_title'>{ __( 'Available input values: ', 'sv_gutenform' ) }</div>
                            { this.InputValues() }
                        </div>
                    </div>
                    <div class='sv_gutenform_body'>
                        <InnerBlocks templateLock={ false } />
                    </div> 
                </div>
                <FormContext.Consumer>{ wrapper => { this.wrapper = wrapper } }</FormContext.Consumer>
            </Fragment>
        );
    }
}