// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    Component, 
    Fragment 
} = wp.element;
const { select } = wp.data;
const { CheckboxControl } = wp.components;

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

    componentWillUnmount = () => {
        this.removeFormInput();
    }

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

    // Removes this block from the formInputs array
    removeFormInput = () => {
        if ( ! this.wrapper || ! this.wrapper.clientId || ! this.props.attributes.inputId ) return false;

        const { formInputs } = select('core/block-editor').getBlockAttributes( this.wrapper.clientId );
        const { inputId } = this.props.attributes;
        let newFormInputs = JSON.parse( formInputs );
        const index = newFormInputs.findIndex( input => { return input.ID === inputId } );
        
        if ( index ) {
            newFormInputs.splice( index, 1 );

            this.wrapper.setAttributes({ formInputs: JSON.stringify( newFormInputs ) });
        }
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

    // Updates the isChecked attribute of this block
    setCheck = isChecked => this.props.setAttributes({ isChecked });

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
                name,
                value,
                isChecked,
                required,
                disabled,
            }
        } = this.props;
        
        return (
            <Fragment>
                <div className={ className }>
                    <CheckboxControl
                        name={ name }
                        value={ value }
                        required={ required }
                        disabled={ disabled }
                        checked={ isChecked }
                        onChange={ () => this.setCheck( ! isChecked ) }
                    />
                    { this.Label() }
                </div>
                <FormContext.Consumer>{ wrapper => { this.wrapper = wrapper } }</FormContext.Consumer>
                <InspectorControls props={ this.props } wrapper={ this.wrapper } />
            </Fragment>
        ); 
    }
}