// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { Component }     = wp.element;
const { select }        = wp.data;
const { Fragment }      = wp.element;
const { TextControl }   = wp.components;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props  = props;
    }

     // React Lifecycle Methos
     componentDidMount = () => {
        if ( ! this.props.attributes.inputId || this.isDuplicate() ) {
            this.props.attributes.inputId = this.props.clientId;

            this.updateFormInputs();
        }
    }

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

    render = () => {
        return (
            <Fragment>
                <div className={ this.props.className }>
                    { this.Label() }
                    <TextControl
                        type={ this.props.attributes.type }
                        name={ this.props.attributes.name }
                        label={ this.props.attributes.label }
                        required={ this.props.attributes.required }
                        disabled={ this.props.attributes.disabled }
                        readonly={ this.props.attributes.readonly }
                        value={ this.props.attributes.defaultValue }
                        min={ this.props.attributes.min }
                        max={ this.props.attributes.max }
                        autofocus={ this.props.attributes.autofocus }
                        placeholder={ this.props.attributes.placeholder }
                        style={{ 
                            color: this.props.attributes.inputColor, 
                            backgroundColor: this.props.attributes.inputBackgroundColor, 
                            borderRadius: this.props.attributes.borderRadius 
                        }}
                        className={ [ 
                            this.props.attributes.inputColorClass, 
                            this.props.attributes.inputBackgroundColorClass 
                        ] }
                        onChange={ value => this.setDefaultValue( value ) }
                        hideLabelFromVision={ true }
                    />
                </div>
                <FormContext.Consumer>
                { formClientId => {
                    this.props.formClientId = formClientId;
    
                    return <InspectorControls props={ this.props } />;
                }}
                </FormContext.Consumer>
            </Fragment>
        );
    }

     // Checks if the input block is a duplicate
     isDuplicate = () => {
        if ( ! this.props.formClientId ) return false;

        let isDuplicate     = false;
        const wrapperBlock  = select('core/block-editor').getBlock( this.props.formClientId );
        const formBlock     = wrapperBlock.innerBlocks.find( block => { return block.name === 'straightvisions/sv-gutenform-form'; } );
        
        formBlock.innerBlocks.map( block => {
            if ( 
                block.name === this.props.name 
                && block.clientId !== this.props.clientId
                && block.attributes.inputId
                && block.attributes.inputId === this.props.attributes.inputId 
            ) {
                isDuplicate = true;
            }
        } );

        return isDuplicate;
    }

    // Updates the formInput attribute in the wrapper block
    updateFormInputs = () => {
        if ( this.props.formClientId && this.props.attributes.name ) {
            const formInputs    = select('core/block-editor').getBlockAttributes( this.props.formClientId ).formInputs;
            const newFormInput  = { 
                ID: this.props.attributes.inputId, 
                name: this.props.attributes.name, 
                type: this.props.attributes.type 
            };
            let newFormInputs   = [ newFormInput ];

            if ( formInputs ) {
                newFormInputs = JSON.parse( formInputs );
                newFormInputs.push( newFormInput );
            }

            dispatch('core/block-editor').updateBlockAttributes( this.props.formClientId, { formInputs: JSON.stringify( newFormInputs ) } );
        }
    }

    // Functions to set the block attributes
    setDefaultValue = defaultValue => this.props.setAttributes({ defaultValue });

    // Conditional Components
    Label = () => {
        if ( this.props.attributes.label.length > 0 ) {
            return (
                <label
                    for={ this.props.attributes.name }
                    style={{ color: this.props.attributes.labelColor }}
                    className={ this.props.attributes.labelColorClass }
                >
                    { this.props.attributes.label }
                </label>
            );
        }

        return null;
    };
}