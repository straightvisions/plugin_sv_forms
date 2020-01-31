// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    Component, 
    Fragment 
} = wp.element;
const { select } = wp.data;
const { TextControl } = wp.components;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.wrapper = {};
    }

    // React Lifecycle Methos
    componentDidMount = () => {
        if ( ! this.props.attributes.inputId || this.isDuplicate() ) {
            this.props.attributes.inputId = this.props.clientId;

            this.setFormInputs();
        }
    }

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

    // Updates the formInput attribute in the wrapper block
    setFormInputs = () => {
        if ( ! this.wrapper || ! this.wrapper.clientId || ! this.props.attributes.name ) return false;

        const { formInputs } = select('core/block-editor').getBlockAttributes( this.wrapper.clientId );
        const {
            inputId,
            name,
            type,
        } = this.props.attributes;
        const newFormInput = { 
            ID: inputId, 
            name: name, 
            type: type 
        };
        let newFormInputs = [ newFormInput ];

        if ( formInputs ) {
            newFormInputs = JSON.parse( formInputs );
            newFormInputs.push( newFormInput );
        }

        this.wrapper.setAttributes({ formInputs: JSON.stringify( newFormInputs ) });
    }

    // Checks if the input block is a duplicate
    isDuplicate = () => {
        if ( ! this.wrapper || ! this.wrapper.clientId ) return false;

        let isDuplicate = false;
        const wrapperBlock  = select('core/block-editor').getBlock( this.wrapper.clientId );
        const formBlock = wrapperBlock.innerBlocks.find( block => { return block.name === 'straightvisions/sv-gutenform-form'; } );
        
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

    // Updates the defaultValue attribute of this block
    setDefaultValue = defaultValue => this.props.setAttributes({ defaultValue });

    // Returns a Label components
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

    render = () => {
        const {
            className,
            attributes: {
                type,
                name,
                label,
                required,
                disabled,
                readonly,
                defaultValue,
                minlength,
                maxlength,
                placeholder,
                inputColor,
                inputColorClass,
                inputBackgroundColor,
                inputBackgroundColorClass,
                borderRadius,
            }
        } = this.props;

        return (
            <Fragment>
                <div className={ className }>
                    { this.Label() }
                    <TextControl
                        type={ type }
                        name={ name }
                        label={ label }
                        required={ required }
                        disabled={ disabled }
                        readonly={ readonly }
                        value={ defaultValue }
                        minlength={ minlength > 0 ? minlength : -1 }
                        maxlength={ maxlength > 0 ? maxlength : -1 }
                        placeholder={ placeholder }
                        style={{ 
                            color: inputColor, 
                            backgroundColor: inputBackgroundColor, 
                            borderRadius: borderRadius 
                        }}
                        className={ [ 
                            inputColorClass, 
                            inputBackgroundColorClass 
                        ] }
                        onChange={ value => this.setDefaultValue( value ) }
                        hideLabelFromVision={ true }
                    />
                </div>
                <FormContext.Consumer>{ wrapper => { this.wrapper = wrapper } }</FormContext.Consumer>
                <InspectorControls props={ this.props } wrapper={ this.wrapper } />
            </Fragment>
        );
    }
}