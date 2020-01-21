// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { Component }     = wp.element;
const { select }        = wp.data;
const { Fragment }      = wp.element;
const { RangeControl }  = wp.components;

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
                    <RangeControl
                        name={ this.props.attributes.name }
                        required={ this.props.attributes.required }
                        disabled={ this.props.attributes.disabled }
                        value={ this.props.attributes.defaultValue }
                        initialPosition={ this.props.attributes.defaultValue }
                        min={ this.props.attributes.min }
                        max={ this.props.attributes.max }
                        step={ this.props.attributes.step }
                        autofocus={ this.props.attributes.autofocus }
                        onChange={ value => this.setDefaultValue( value ) }
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

/*
export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            defaultValue,
            label,
            name,

            // Validation Settings
            required,
            min,
            max,
            step,

            // Color Settings
            labelColor,
            labelColorClass,

            // Advanced Settings
            autofocus,
            disabled,
        } 
    } = props;

    // Functions to set the block attributes
    const setDefaultValue = defaultValue => setAttributes({ defaultValue });

    // Conditional Components
    const Label = () => {
        if ( label.length > 0 ) {
            return (
                <label
                    for={ name }
                    style={{ color: labelColor }}
                    className={ labelColorClass }
                >
                    { label }
                </label>
            );
        }

        return null;
    };

    return (
        <Fragment>
            <div className={ className }>
                <Label />
                <RangeControl
                    name={ name }
                    required={ required }
                    disabled={ disabled }
                    value={ defaultValue }
                    initialPosition={ defaultValue }
                    min={ min }
                    max={ max }
                    step={ step }
                    autofocus={ autofocus }
                    onChange={ value => setDefaultValue( value ) }
                />
            </div>
            <FormContext.Consumer>
            { value => {
                props.formId = value;

                return <InspectorControls props={ props } />;
            }}
            </FormContext.Consumer>
        </Fragment>
    ); 
});
*/