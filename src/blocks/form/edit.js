import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    select, 
    dispatch 
}                                   = wp.data;
const { Component }                 = wp.element;
const { __ }                        = wp.i18n;
const { InnerBlocks }               = wp.blockEditor;
const { Button }                    = wp.components;
const { editPost }                  = dispatch( 'core/editor' );
const { getEditedPostAttribute }    = select( 'core/editor' );
const { getAuthors }                = select( 'core' );

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
            ['straightvisions/sv-gutenform-thank-you'],
        ];
    }

    // React Lifecycle Methos
    componentDidMount() {
        if ( ! this.doesFormExist() || ( this.doesFormExist() && this.isDuplicate() ) ) {
            this.props.attributes.postId = select('core/editor').getCurrentPostId();

            if ( ! this.props.attributes.formId ) {
                this.props.attributes.formId = this.props.clientId;
            }
            
            this.updatePostMeta( 'update' );
        }
    }

    componentDidUpdate() {
        this.state.authors = getAuthors();
        this.updatePostMeta( 'update' );
    }

    componentWillUnmount() {
        this.updatePostMeta( 'remove' );
    }

    render() {
        return (
            <div className={ this.props.className }>
                <InspectorControls props={ this.props } data={ this.state } />
                <div className='sv-gutenform-header'>
                    <div className='sv-gutenform-form-label-wrapper'>
                        <div className='sv-gutenform-form-label'>{ this.props.attributes.formLabel }</div>
                        <Button 
                            isTertiary 
                            onClick={ () => this.toggleBody() }
                        ><span class="dashicons dashicons-visibility"></span></Button>
                    </div>
                    <div className='sv-gutenform-form-id'>Form ID: { this.props.attributes.formId }</div>
                    <div className='sv-gutenform-title'>{ __( 'SV Gutenform', 'sv_gutenform' ) }</div>
                    <div className='sv-gutenform-description'>
                        { __( 'Everything inside this block will be the content of the form.', 'sv_gutenform' ) }
                    </div>
                </div>
                <div class='sv-gutenform-body'>
                    <FormContext.Provider value={ this.props.clientId }>
                        <InnerBlocks 
                            template={ this.template }
                            templateLock={ false }
                        />
                    </FormContext.Provider>
                </div>
            </div>
        );
    }

    // Custom Methods
    doesFormExist() {
        const currentMeta   = getEditedPostAttribute( 'meta' );
        const currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : false;

        if ( ! currentForms || ! currentForms[ this.props.attributes.formId ] ) return false;

        return true;
    }

    isDuplicate() {
        const currentBlocks = wp.data.select('core/block-editor').getBlocks();
        let formsWithSameId = 0;

        currentBlocks.forEach( block => {
            if ( 
                block.name === 'straightvisions/sv-gutenform' 
                && block.attributes.formId === this.props.attributes.formId  
            ) {
                formsWithSameId++;
            }
        } );

        if ( formsWithSameId > 1 ) {
            return true;
        }

        return false;
    }

    updatePostMeta( action ) {
        const currentMeta = getEditedPostAttribute( 'meta' );
        let currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : {};

        switch ( action ) {
            case 'update':
                currentForms[ this.props.attributes.formId ] = this.props.attributes;
                break;
            case 'remove':
                delete currentForms[ this.props.attributes.formId ];
                break;
        }

        const newMeta = { ...currentMeta, _sv_gutenform_forms: JSON.stringify( currentForms ) };

        editPost( { meta: newMeta } );
        console.log(this.props.attributes);
    }

    toggleBody() {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv-gutenform-body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv-gutenform-header > .sv-gutenform-form-name-wrapper > button.components-button > span' );

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
}