// Required Components
import InspectorControls from './components/inspector_controls';
import { WrapperConsumer, InputsConsumer } from '../../blocks';

const { select } = wp.data;
const { SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
const { updateBlockAttributes } = wp.data.dispatch('core/block-editor');

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.wrapper = {};
        this.inputs = [];
    }

    // React Lifecycle Methos
    componentDidMount = () => {
        if ( ! this.props.attributes.inputId || this.isDuplicate() ) {
            this.props.attributes.inputId = this.props.clientId;
        }

        this.setFormInputs();
        this.updateChilds();
    }

    componentWillUnmount = () => {
        this.removeFormInput();
        this.updateChilds();
    }

    // Updates the formInput attribute in the wrapper block
    setFormInputs = () => {
        let newInputs = this.inputs;
        const { inputId, name, type } = this.props.attributes;

        if ( name ) {
            const newInput = { ID: inputId, name: name, type: type };

            newInputs.push( newInput );

            updateBlockAttributes( this.wrapper.clientId, { formInputs: JSON.stringify( newInputs ) } );
        }
    }

    // Removes this block from the formInputs array
    removeFormInput = () => {
        let newInputs = this.inputs;
        const { inputId } = this.props.attributes;
        const index = newInputs.findIndex( input => { return input.ID === inputId } );
        
        if ( index >= 0 ) {
            newInputs.splice( index, 1 );

            updateBlockAttributes( this.wrapper.clientId, { formInputs: JSON.stringify( newInputs ) } );
        }
    }

    // Updates the child blocks to force a rerender of them
    updateChilds = () => {
        const childBlocks = [
            'straightvisions/sv-forms-thank-you',
            'straightvisions/sv-forms-user-mail',
            'straightvisions/sv-forms-admin-mail',
        ];

        const innerBlocks = wp.data.select('core/block-editor').getBlocks( this.wrapper.clientId );

        innerBlocks.map( block => {
            if ( childBlocks.includes( block.name ) ) {
                wp.data.dispatch('core/block-editor').updateBlock( block.clientId, { attributes: block.attributes } );
            }
        } );
    }

    // Checks if the input block is a duplicate
    isDuplicate = () => {
        if ( ! this.wrapper || ! this.wrapper.clientId ) return false;

        let isDuplicate = false;
        const wrapperBlock  = select('core/block-editor').getBlock( this.wrapper.clientId );
        const formBlock = wrapperBlock.innerBlocks.find( block => { return block.name === 'straightvisions/sv-forms-form'; } );
        
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
        if ( this.props.attributes.label && this.props.attributes.label.length > 0 ) {
            return (
                <label
                    for={ this.props.attributes.name }
                    style={{ 
                        color: this.props.attributes.labelColor,
                        fontSize: this.props.attributes.labelFontSize
                    }}
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
                defaultValue,

                // Input Settings
                name,
                inputFontSize,

                // Label Settings
                label,

                // Color Settings
                inputColor,
                inputColorClass,
                inputBackgroundColor,
                inputBackgroundColorClass,
                inputBorderColor,

                // Border Settings
                borderStyle,
                borderWidthTop,
                borderWidthRight,
                borderWidthBottom,
                borderWidthLeft,
                borderRadius,

                // Validation Settings
                required,

                // Advanced Settings
                disabled,
                readonly,
            }
        } = this.props;

        const parsedOptions = this.props.attributes.options ? JSON.parse( this.props.attributes.options ) : [];
        const style = {
            color:              inputColor, 
            backgroundColor:    inputBackgroundColor, 
            fontSize:           inputFontSize,
            borderColor:        inputBorderColor,
            borderStyle:        borderStyle,
            borderTopWidth:     borderWidthTop,
            borderRightWidth:   borderWidthRight,
            borderBottomWidth:  borderWidthBottom,
            borderLeftWidth:    borderWidthLeft,
            borderRadius:       borderRadius,
        };

        return (
            <Fragment>
                <div className={ className }>
                    <this.Label />
                    <SelectControl
                        name={ name }
                        label={ label }
                        required={ required }
                        value={ defaultValue }
                        onChange={ value => this.setDefaultValue( value ) }
                        options={ parsedOptions }
                        disabled={ disabled }
                        readonly={ readonly }
                        hideLabelFromVision={ true }
                        style={ style }
                        className={ [ 
                            inputColorClass,
                            inputBackgroundColorClass
                        ] }
                    />
                </div>
                <WrapperConsumer>{ wrapper => { this.wrapper = wrapper } }</WrapperConsumer>
                <InputsConsumer>{ inputs => { 
                    this.inputs = inputs;
                    return <InspectorControls props={ this.props } wrapper={ this.wrapper } inputs={ inputs } />;
                } }</InputsConsumer>
            </Fragment>
        );
    }
}