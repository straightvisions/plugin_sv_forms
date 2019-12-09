import InspectorControls from './components/inspector_controls';

const { 
    Component,
    Fragment 
}                                   = wp.element;
const { __ }                        = wp.i18n;
const { InnerBlocks }               = wp.blockEditor;
const { 
    select, 
    dispatch 
}                                   = wp.data;
const { editPost }                  = dispatch( 'core/editor' );
const { getEditedPostAttribute }    = select( 'core/editor' );
const { getAuthors }                = select( 'core' );

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props      = props;
        this.state      = {};
        this.template   = [
            ['core/heading', { 
                content: __( 'Contact', 'sv_gutenform' ), 
                level: 3,
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

    componentDidMount() {
        if ( ! this.doesFormExist() ) {
            this.props.attributes.blockId = this.props.clientId;
            this.updatePostMeta( 'add' );
        }
    }

    componentDidUpdate() {
        this.state.authors = getAuthors();
        this.updatePostMeta( 'add' );
    }

    componentWillUnmount() {
        this.updatePostMeta( 'remove' );
    }

    doesFormExist() {
        const currentMeta = getEditedPostAttribute( 'meta' );
        const currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : false;

        if ( ! currentForms || ! currentForms[ this.props.attributes.blockId ] ) return false;

        return true;
    }

    updatePostMeta( action ) {
        const currentMeta = getEditedPostAttribute( 'meta' );
        let currentForms  = currentMeta._sv_gutenform_forms ? JSON.parse( currentMeta._sv_gutenform_forms ) : {};

        switch ( action ) {
            case 'add':
                    currentForms[ this.props.attributes.blockId ] = this.props.attributes;
                break;
            case 'remove':
                delete currentForms[ this.props.attributes.blockId ];
                break;
        }

        const newMeta = { ...currentMeta, _sv_gutenform_forms: JSON.stringify( currentForms ) };

        editPost( { meta: newMeta } );
    }

    render() {
        return (
            <Fragment className={ this.props.className }>
                <InspectorControls props={ this.props } data={ this.state } />
                <form method='POST' className={ this.props.className }>
                    <InnerBlocks 
                        template={ this.template }
                        templateLock={ false }
                    />
                </form>
            </Fragment>
        );
    }
}