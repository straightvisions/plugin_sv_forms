// Required Components
import { FormContext } from '../../blocks';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button } = wp.components;
const { withState } = wp.compose;
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
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv_gutenform_body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv_gutenform_header > .sv_gutenform_title_wrapper > button.components-button > span' );

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
    InputValueButton = withState( {
        hasCopied: false,
    } )( ( { hasCopied, setState, text } ) => {
        const toolTipText = hasCopied ? __( 'Copied to clippboard.', 'sv_gutenform' ) : __( 'Copy to clippboard.', 'sv_gutenform' );

        return (
            <Tooltip text={ toolTipText }>
                <ClipboardButton
                    isTertiary
                    className='sv_gutenform_input_value'
                    text={ text }
                    onCopy={ () => setState( { hasCopied: true } ) }
                    onFinishCopy={ () => setState( { hasCopied: false } ) }
                >
                    { text }
                </ClipboardButton>
            </Tooltip>
        ); 
    });

    // Returns the available input values
    InputValues = () => {
        if ( ! this.wrapper || ! this.wrapper.attributes ) return null;

        const inputNames = this.wrapper.attributes.inputNames;

        if ( ! inputNames || inputNames.length < 1 ) return null;

        let output = [];

        inputNames.split( ',' ).map( name => {
            output.push( <InputValueButton text={ name } /> );
        } );

        return <div className='sv_gutenform_input_values'>{ output }</div>;
    }

    render = () => {
        return (
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
                <FormContext.Consumer>{ wrapper => { this.wrapper = wrapper; } }</FormContext.Consumer>
            </div>
        );
    }
}