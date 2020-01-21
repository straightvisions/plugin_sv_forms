import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { Component }     = wp.element;
const { InnerBlocks }   = wp.blockEditor;
const { Button }        = wp.components;

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
        ];
    }

    // React Lifecycle Methos
    componentDidMount = () => {}

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

    render = () => {
        return (
            <div className={ this.props.className }>
                <div className='sv_gutenform_header'>
                    <div className='sv_gutenform_title_wrapper'>
                        <div className='sv_gutenform_title'>{ __( 'Form', 'sv_gutenform' ) }</div>
                    </div>
                </div>
                <div className='sv_gutenform_body'>
                    <InnerBlocks 
                        template={ this.template }
                        templateLock={ false }
                    />
                </div>
                <FormContext.Consumer>{ clientId => this.setFormId( clientId ) }</FormContext.Consumer>
            </div>
        );
    }

    // Custom Methods
    setFormId = clientId => { 
        this.state.formId = clientId;

        if ( ! this.props.attributes.formId ) {
            const wrapperBlock = wp.data.select('core/block-editor').getBlock( clientId );

            if ( wrapperBlock ) {
                this.props.setAttributes({ formId: wrapperBlock.attributes.formId }); 
            }
        }
    };

    updateFormInputs = () => {
        if ( ! this.props.attributes.formInputs ) {
            const formBlock = this.props.innerBlocks.find( block => { return block.name === 'straightvisions/sv-gutenform-form'; } );
            let formInputs = [];

            formBlock.innerBlocks.map( block => {
                if ( 
                    block.name.startsWith('straightvisions/sv-gutenform-')
                    && block.attributes.inputId
                    && block.attributes.name
                    && block.attributes.type
                ) {
                    const newInput = {
                        ID: block.attributes.inputId,
                        name: block.attributes.name,
                        type: block.attributes.type,
                    };

                    formInputs.push( newInput )
                }
            } );

            this.props.attributes.formInputs = JSON.stringify( formInputs );
        }
    }
}