// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { Component }         = wp.element;
const { 
    select, 
    dispatch 
} = wp.data;
const { Fragment }          = wp.element;
const { CheckboxControl }   = wp.components;

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
                    <CheckboxControl
                        name={ this.props.attributes.name }
                        value={ this.props.attributes.value }
                        required={ this.props.attributes.required }
                        disabled={ this.props.attributes.disabled }
                        checked={ this.props.attributes.isChecked }
                        onChange={ () => this.setCheck( ! this.props.attributes.isChecked ) }
                    />
                    { this.Label() }
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

    // Functions
    setCheck = isChecked => this.props.setAttributes({ isChecked });

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
            isChecked,
            label,
            name,
            value,

            // Validation Settings
            required,

            // Color Settings
            labelColor,
            labelColorClass,

            // Advanced Settings
            disabled,
        } 
    } = props;

    // Functions
    const setCheck = isChecked => setAttributes({ isChecked });

    // Conditional Components
    const Label = () => {
        if ( label.length > 0 ) {
            return (
                <label
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
                <CheckboxControl
                    name={ name }
                    value={ value }
                    required={ required }
                    disabled={ disabled }
                    checked={ isChecked }
                    onChange={ () => setCheck( ! isChecked ) }
                />
                <Label />
            </div>
            <FormContext.Consumer>
            { clientId => {
                props.formId = clientId;

                return <InspectorControls props={ props } />;
            }}
            </FormContext.Consumer>
        </Fragment>
    ); 
});
*/