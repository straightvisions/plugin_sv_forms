import InspectorControls from './components/inspector_controls';
import { WrapperProvider, InputsConsumer } from '../../blocks';

const { __ } = wp.i18n;
const { Button } = wp.components;
const { select, dispatch } = wp.data;
const { InnerBlocks } = wp.blockEditor;
const { Component, Fragment } = wp.element;
const { editPost } = dispatch( 'core/editor' );
const { getEditedPostAttribute } = select( 'core/editor' );

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.template = [
            ['straightvisions/sv-gutenform-form'],
            ['straightvisions/sv-gutenform-thank-you'],
            ['straightvisions/sv-gutenform-user-mail'],
            ['straightvisions/sv-gutenform-admin-mail'],
        ];
    }

    // React Lifecycle Methos
    componentDidMount = () => {
        if ( ! this.doesFormExist() || ( this.doesFormExist() && this.isDuplicate() ) ) {
            this.props.attributes.postId = select('core/editor').getCurrentPostId();

            if ( ! this.props.attributes.formId ) {
                this.props.attributes.formId = this.props.clientId;
            }
            
            this.updatePostMeta( 'update' );
        }

        this.toggleBody( false );
    }

    componentDidUpdate = () => {
        this.updatePostMeta( 'update' );
    }

    componentWillUnmount = () => {
        this.updatePostMeta( 'remove' );
    }

    // Checks if the block already exists inside the current post
    doesFormExist = () => {
        const currentMeta   = getEditedPostAttribute( 'meta' );
        const currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : false;

        if ( ! currentForms || ! currentForms[ this.props.attributes.formId ] ) return false;

        return true;
    }

    // Checks if this block is a duplicate of an existing one in the current post
    isDuplicate = () => {
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

    // Updates the current post meta with the block attributes
    updatePostMeta = action => {
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
    }

    // Togles the collapsed state of the body
    toggleBody = change => {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_gutenform_body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_gutenform_header > .sv_gutenform_label_wrapper > button.components-button > span' );

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

    updateFormInputs = inputs => {
        if ( inputs.length > 0 ) {
            this.props.setAttributes({ formInputs: JSON.stringify( inputs ) });
        }
    }

    render = () => {
        return (
            <Fragment>
                <div className={ this.props.className }>
                    <div className='sv_gutenform_header'>
                        <div className='sv_gutenform_label_wrapper'>
                            <div className='sv_gutenform_form_label'>{ this.props.attributes.formLabel }</div>
                            <Button onClick={ () => this.toggleBody( true ) }>
                                <span class='dashicons dashicons-visibility'></span>
                            </Button>
                        </div>
                        <div className='sv_gutenform_form_id'>Form ID: { this.props.attributes.formId }</div>
                        <div className='sv_gutenform_title'>{ __( 'SV Gutenform', 'sv_gutenform' ) }</div>
                    </div>
                    <div class='sv_gutenform_body'>
                        <WrapperProvider value={ this.props }>
                            <InnerBlocks 
                                allowedBlocks={ this.template }
                                template={ this.template }
                                templateLock={ true }
                            />
                        </WrapperProvider>
                    </div>
                </div>
                <InspectorControls props={ this.props } />
                <InputsConsumer>{ inputs => this.updateFormInputs( inputs ) }</InputsConsumer>
            </Fragment>
        );
    }
}