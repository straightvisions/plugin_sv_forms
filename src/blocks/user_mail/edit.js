// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    Component,
    Fragment 
} = wp.element;
const { 
    Button,
    Tooltip,
    ClipboardButton
} = wp.components;
const { __ } = wp.i18n;
const { select } = wp.data;
const { getBlockContent } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.wrapper = {};
        this.styles = [];
        this.allowedBlocks = [
            'core/button',
            'core/heading',
            'core/image',
            'core/list',
            'core/paragraph',
            'core/table',
            'core/separator',
            'core/spacer',
            'core/html',
        ];
    }

     // React Lifecycle Methos
    componentDidMount = () => {
        this.toggleBody( false );
    }

    componentDidUpdate = () => {
        const innerBlocks = select( 'core/block-editor' ).getBlocks( this.props.clientId );

        this.addStyles( innerBlocks );
    }

    componentWillUnmount = () => {}

    // Returns the innerBlocks content as string
    getMailContent = () => {
        const innerBlocks = select( 'core/block-editor' ).getBlocks( this.props.clientId );
        const content = innerBlocks.map( block => { return  getBlockContent( block ) } ).join( '' );

        return content;
    }

    getStyles = () => {
        let output = '';
        
        this.styles.map( style => {
            output += style.name + '{' + style.styles + ';}';
        } );

        return output;
    } 

    styleExists = className => {
        return this.styles.find( style => { return style.name === className; } ) ? true : false;
    }

    // Fetches style attributes of blocks, retrieves their style rules 
    // and saves the classname to rules relation in the styles array
    addStyles = innerBlocks => {
        innerBlocks.map( block => {
            if ( block.attributes ) {
                const {
                    textColor,
                    backgroundColor,
                    gradient,
                    fontSize,
                } = block.attributes;

                // Text Color
                if ( textColor ) {
                    const className = '.has-' + textColor + '-color';

                    if ( ! this.styleExists( className ) ) {
                        const value = jQuery( className ).css('color');

                        if ( value ) {
                            this.styles.push( { name: className, styles: 'color:' + value } );
                        }
                    }
                }

                // Background Color
                if ( backgroundColor ) {
                    const className = '.has-' + backgroundColor + '-background-color';

                    if ( ! this.styleExists( className ) ) {
                        const value = jQuery( className ).css('background-color');

                        if ( value ) {
                            this.styles.push( { name: className, styles: 'background-color:' + value } );
                        }
                    }
                }

                // Gradient
                if ( gradient ) {
                    const className = '.has-' + gradient + '-gradient-background';

                    if ( ! this.styleExists( className ) ) {
                        const value = jQuery( className ).css('background-image');

                        if ( value ) {
                            this.styles.push( { name: className, styles: 'background:' + value } );
                        }
                    }
                }

                // Font Size
                if ( fontSize ) {
                    const className = '.has-' + fontSize + '-font-size';

                    if ( ! this.styleExists( className ) ) {
                        const value = jQuery( className ).css('font-size');

                        if ( value ) {
                            this.styles.push( { name: className, styles: 'font-size:' + value } );
                        }
                    }
                }
            }
        } );
    }

    // Updates the wrapper attributes
    setWrapperAttributes = wrapper => {
        this.wrapper = wrapper;

        // User Mail Attributes
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
            userMailSend: mailSend,
            userMailSubject: mailSubject,
            userMailFromTitle: mailFromTitle,
            userMailFromMail: mailFromMail,
            userMailToUsers: mailToUsers,
            userMailToMails: mailToMails,
            userMailContent: this.getMailContent(),
            userMailBlockStyles: this.getStyles(),
        };

        wrapper.setAttributes( newAttributes );
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
    InputValues = () => {
        if ( ! this.wrapper || ! this.wrapper.clientId ) return false;

        const { formInputs } = wp.data.select('core/block-editor').getBlockAttributes( this.wrapper.clientId );

        if ( ! formInputs ) return null;

        const inputs = JSON.parse( formInputs );

        if ( formInputs.length < 1 ) return null;

        let output = [];

        inputs.map( input => {
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
                            <div className='sv_gutenform_title'>{ __( 'User Mail', 'sv_gutenform' ) }</div>
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
                        <InnerBlocks 
                            templateLock={ false } 
                            allowedBlocks={ this.allowedBlocks }
                        />
                    </div> 
                </div>
                <FormContext.Consumer>{ wrapper => { this.setWrapperAttributes( wrapper ) } }</FormContext.Consumer>
                <InspectorControls props={ this.props } wrapper={ this.wrapper } />
            </Fragment>
        );
    }
}