import InspectorControls from './components/inspector_controls';
import { WrapperProvider, InputsConsumer } from '../../blocks';

const { __ } = wp.i18n;
const { Button } = wp.components;
const { select, dispatch } = wp.data;
const { InnerBlocks } = wp.blockEditor;
const { Component, Fragment } = wp.element;
const { editPost } = dispatch( 'core/editor' );
const { 
    getBlock,
    getEditedPostAttribute, 
    __experimentalGetReusableBlocks
} = select( 'core/editor' );

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.template = [
            ['straightvisions/sv-forms-form'],
            ['straightvisions/sv-forms-thank-you'],
            ['straightvisions/sv-forms-user-mail'],
            ['straightvisions/sv-forms-admin-mail'],
        ];

        /**
         * Eventlistener that listens on changes in the reuseable blocks count.
         * 
         * If the current block is a Forms block, the amount of reuseable blocks
         * increases and the current block is missing in the editor, it means 
         * that the current Forms block was transformed into a reuseable block.
         */
        const currentReuseableBlocks = __experimentalGetReusableBlocks();
        const currentReuseableBlocksCount = Object.values( currentReuseableBlocks ).length;

        wp.data.subscribe( () => {
            if ( this.props.name !== 'straightvisions/sv-forms' ) return false;

            const newReuseableBlocks = __experimentalGetReusableBlocks();
            const newReuseableBlocksCount = Object.values( newReuseableBlocks ).length;

            // Checks if the reuseable blocks count has changed
            const reuseableBlockAdded = currentReuseableBlocksCount < newReuseableBlocksCount ? true : false;

            // Checks if the current block exists
            const currentBlockExists = getBlock( this.props.clientId ) ? true : false;

            // The current block was converted into a reuseable block
            if ( reuseableBlockAdded && ! currentBlockExists ) { 
                console.log( this.props.attributes.formLabel + ' is now a reuseable block.' );
            }
        } );
    }

    // React Lifecycle Methos
    componentDidMount = () => {
        if ( ! this.doesFormExist() || ( this.doesFormExist() && this.isDuplicate() ) ) {
            this.props.setAttributes({ postId: select('core/editor').getCurrentPostId() });
            this.props.setAttributes({ formId: this.props.clientId });
            
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
        const currentForms  = currentMeta._sv_forms_forms ? JSON.parse( currentMeta._sv_forms_forms ) : false;

        if ( ! currentForms || ! currentForms[ this.props.attributes.formId ] ) return false;

        return true;
    }

    // Checks if this block is a duplicate of an existing one in the current post
    isDuplicate = () => {
        const currentBlocks = wp.data.select('core/block-editor').getBlocks();
        let formsWithSameId = 0;

        currentBlocks.forEach( block => {
            if ( 
                block.name === 'straightvisions/sv-forms' 
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
        if ( ! this.props.attributes.formId ) return false;

        const currentMeta = getEditedPostAttribute( 'meta' );
        let currentForms  = currentMeta._sv_forms_forms ? JSON.parse( currentMeta._sv_forms_forms ) : {};

        switch ( action ) {
            case 'update':
                //console.log( '=== UPDATE ===' );
                //console.log( 'Form ID: ', this.props.attributes.formId )
                //console.log( 'Before: ', currentForms );

                currentForms[ this.props.attributes.formId ] = this.props.attributes;

                //console.log( 'After: ', currentForms );
                break;
            case 'remove':
                //console.log( '=== REMOVE ===' );
                //console.log( 'Form ID: ', this.props.attributes.formId )
                //console.log( 'Before: ', currentForms );

                delete currentForms[ this.props.attributes.formId ];

                //console.log( 'After: ', currentForms );
                break;

        }
        
        const newMeta = { ...currentMeta, _sv_forms_forms: JSON.stringify( currentForms ) };

        editPost( { meta: newMeta } );
    }

    // Togles the collapsed state of the body
    toggleBody = change => {
        const body = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_forms_body' );
        const icon = jQuery( 'div[data-block="' + this.props.clientId + '"] .' + this.props.className + ' > .sv_forms_header > .sv_forms_label_wrapper > button.components-button > span' );

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
                    <div className='sv_forms_header'>
                        <div className='sv_forms_label_wrapper'>
                            <div className='sv_forms_form_label'>{ this.props.attributes.formLabel }</div>
                            <Button onClick={ () => this.toggleBody( true ) }>
                                <span class='dashicons dashicons-visibility'></span>
                            </Button>
                        </div>
                        <div className='sv_forms_form_id'>Form ID: { this.props.attributes.formId }</div>
                        <div className='sv_forms_title'>{ __( 'SV Forms', 'sv_forms' ) }</div>
                    </div>
                    <div class='sv_forms_body'>
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