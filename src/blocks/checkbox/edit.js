// Required Components
import InspectorControls from './components/inspector_controls';
import { WrapperConsumer, InputsProvider, InputsConsumer } from '../../blocks';

const { select } = wp.data;
const { CheckboxControl } = wp.components;
const { Component, Fragment } = wp.element;

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

            <InputsProvider value={ newInputs } />
        }
    }

    // Removes this block from the formInputs array
    removeFormInput = () => {
        let newInputs = this.inputs;
        const { inputId } = this.props.attributes;
        const index = newInputs.findIndex( input => { return input.ID === inputId } );
        
        if ( index >= 0 ) {
            newInputs.splice( index, 1 );

            <InputsProvider value={ newInputs } />
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

    // Updates the isChecked attribute of this block
    setCheck = isChecked => this.props.setAttributes({ isChecked });

    // Returns a Label components
    Label = () => {
        if ( this.props.attributes.label && this.props.attributes.label.length > 0 ) {
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
                // Input Settings
                name,
                value,
                isChecked,

                // Color Settings
                inputBackgroundColor,
                inputBackgroundColorClass,
                inputBorderColor,

                // Validation Settings
                required,

                // Border Settings
                borderRadius,
                borderWidthTop,
                borderWidthRight,
                borderWidthBottom,
                borderWidthLeft,

                // Advanced Settings
                disabled,
                readonly,
            }
        } = this.props;

        const style = {
            backgroundColor:    inputBackgroundColor, 
            borderColor:        inputBorderColor,
            borderRadius:       borderRadius,
            borderTopWidth:     borderWidthTop,
            borderRightWidth:   borderWidthRight,
            borderBottomWidth:  borderWidthBottom,
            borderLeftWidth:    borderWidthLeft,
        };
        
        return (
            <Fragment>
                <div className={ className }>
                    <CheckboxControl
                        name={ name }
                        value={ value }
                        required={ required }
                        disabled={ disabled }
                        readonly={ readonly }
                        checked={ isChecked }
                        style={ style }
                        className={ [ inputBackgroundColorClass ] }
                        onChange={ () => this.setCheck( ! isChecked ) }
                    />
                    <this.Label />
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