import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    select, 
    dispatch,
} = wp.data;
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
        this.state.authors = getAuthors();
        this.updatePostMeta( 'update' );
        console.log(this.props.attributes.formInputs);
    }

    componentWillUnmount = () => {
        this.updatePostMeta( 'remove' );
    }

    render = () => {
        return (
            <div className={ this.props.className }>
                <InspectorControls props={ this.props } data={ this.state } />
                <div className='sv_gutenform_header'>
                    <div className='sv_gutenform_form_label_wrapper'>
                        <div className='sv_gutenform_form_label'>{ this.props.attributes.formLabel }</div>
                        <Button 
                            isTertiary 
                            onClick={ () => this.toggleBody( true ) }
                        ><span class="dashicons dashicons-visibility"></span></Button>
                    </div>
                    <div className='sv_gutenform_form_id'>Form ID: { this.props.attributes.formId }</div>
                    <div className='sv_gutenform_title'>{ __( 'SV Gutenform', 'sv_gutenform' ) }</div>
                </div>
                <div class='sv_gutenform_body'>
                    <FormContext.Provider value={ this.props.clientId }>
                        <InnerBlocks 
                            template={ this.template }
                            templateLock={ true }
                        />
                    </FormContext.Provider>
                </div>
            </div>
        );
    }

    // Custom Methods
    doesFormExist = () => {
        const currentMeta   = getEditedPostAttribute( 'meta' );
        const currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : false;

        if ( ! currentForms || ! currentForms[ this.props.attributes.formId ] ) return false;

        return true;
    }

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

    toggleBody = change => {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv_gutenform_body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] > .' + this.props.className + ' > .sv_gutenform_header > .sv_gutenform_form_label_wrapper > button.components-button > span' );

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
}