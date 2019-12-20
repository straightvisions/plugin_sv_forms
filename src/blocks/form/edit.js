import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    select, 
    dispatch 
}                                   = wp.data;
const { Component }                 = wp.element;
const { __ }                        = wp.i18n;
const { InnerBlocks }               = wp.blockEditor;
const { editPost }                  = dispatch( 'core/editor' );
const { getEditedPostAttribute }    = select( 'core/editor' );
const { getAuthors }                = select( 'core' );

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props      = props;
        this.state      = {};
        this.template   = [
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
            this.props.attributes.formId = this.props.clientId;
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
                <div className='header'>
                    <div className='title'>{ __( 'SV Gutenform', 'sv_gutenform' ) }</div>
                    <div className='description'>
                        { __( 'Everything inside this block will be the content of the form.', 'sv_gutenform' ) }
                    </div>
                </div>
                <div class="body">
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
    }
}