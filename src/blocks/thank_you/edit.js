// Required Components
import { InputsConsumer } from '../../blocks';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { Component, Fragment } = wp.element;
const { Button, Tooltip,ClipboardButton } = wp.components;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
    }

     // React Lifecycle Methos
    componentDidMount = () => {
        this.toggleBody( false );
    }

    // Returns all allowed blocks
    getAllowedBlocks = () => {
        const availableBlocks = wp.data.select('core/blocks').getBlockTypes();
        let allowedBlocks = [];

        availableBlocks.map( block => {
            if ( ! block.name.startsWith( 'straightvisions/sv-gutenform' ) ) {
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
    getInputValues = inputs => {
        let output = [];

        inputs.map( input => {
            if ( input.name ) {
                output.push( this.InputValueButton( input.name ) );
            }
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
                            <InputsConsumer>{ inputs => this.getInputValues( inputs ) }</InputsConsumer>
                        </div>
                    </div>
                    <div class='sv_gutenform_body'>
                        <InnerBlocks 
                            allowedBlocks={ this.getAllowedBlocks() }
                            templateLock={ false } 
                        />
                    </div> 
                </div>
            </Fragment>
        );
    }
}