// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    Component,
    Fragment 
} = wp.element;
const { __ } = wp.i18n;
const { select } = wp.data;
const { Button } = wp.components;
const { withState } = wp.compose;
const { getBlockContent } = wp.blocks;
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

    // Returns the innerBlocks content as string
    getMailContent = () => {
        const innerBlocks = select( 'core/block-editor' ).getBlocks( this.props.clientId );

        return innerBlocks.map( block => { return  getBlockContent( block ) } ).join( '' );
    }

    // Updates the wrapper attributes
    setWrapperAttributes = wrapper => {
        this.wrapper = wrapper;

        // Admin Mail Attributes
        const {
            mailSend, 
            mailSubject,
            mailFromTitle,
            mailFromMail,
            mailToUsers,
            mailToMails,
        } = this.props.attributes;

        // Updated Wrapper Attributes
        const newAttributes = {
            adminMailSend: mailSend,
            adminMailSubject: mailSubject,
            adminMailFromTitle: mailFromTitle,
            adminMailFromMail: mailFromMail,
            adminMailToUsers: mailToUsers,
            adminMailToMails: mailToMails,
            adminMailContent: this.getMailContent(),
        };

        wrapper.setAttributes( newAttributes );
    }

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
            <Fragment>
                <div className={ this.props.className }>
                    <div className='sv_gutenform_header'>
                        <div className='sv_gutenform_title_wrapper'>
                            <div className='sv_gutenform_title'>{ __( 'Admin Mail', 'sv_gutenform' ) }</div>
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
                <FormContext.Consumer>{ wrapper => { this.setWrapperAttributes( wrapper ) } }</FormContext.Consumer>
                <InspectorControls props={ this.props } authors={ select( 'core' ).getAuthors() } />
            </Fragment>
        );
    }
}