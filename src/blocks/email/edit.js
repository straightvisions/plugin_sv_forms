// Required Components
import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { Fragment }      = wp.element;
const { TextControl }   = wp.components;
const { createBlock }   = wp.blocks;
const { 
    select, 
    dispatch 
} = wp.data;

export default props => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            // Input Settings
            defaultValue,
            label,
            name,
            placeholder,
            sendMail,

            // Validation Settings
            required,
            minlength,
            maxlength,

            // Color Settings
            labelColor,
            labelColorClass,
            inputColor,
            inputColorClass,
            inputBackgroundColor,
            inputBackgroundColorClass,

            // Advanced Settings
            autofocus,
            autocomplete,
            readonly,
            disabled,
        } 
    } = props;

    // Functions
    const setDefaultValue       = defaultValue => setAttributes({ defaultValue });
    const updateFormAttributes  = formId => {
        addUserMailBlock( formId );
        
        const newAttributes     = {
            userMail: sendMail,
            userMailInputName: name,
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes );
    };
    const addUserMailBlock      = formId => {
        if ( sendMail ) {
            const isUserMailBlock = select('core/block-editor').getBlocks( formId ).some( block => { 
                return block.name === 'straightvisions/sv-gutenform-user-mail';
            });
    
            if ( ! isUserMailBlock ) {
                const userMailBlock = createBlock( 'straightvisions/sv-gutenform-user-mail' );
    
                dispatch( 'core/block-editor' ).insertBlock( userMailBlock, 0, formId );
            }
        }
    };

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
            <InspectorControls props={ props } />
            <div className={ className }>
                <Label />
                <TextControl
                    type='email'
                    name={ name }
                    label={ label }
                    required={ required }
                    disabled={ disabled }
                    readonly={ readonly }
                    value={ defaultValue }
                    minlength={ minlength > 0 ? minlength : -1 }
                    maxlength={ maxlength > 0 ? maxlength : -1 }
                    autofocus={ autofocus }
                    placeholder={ placeholder }
                    autocomplete={ autocomplete }
                    style={{ color: inputColor, backgroundColor: inputBackgroundColor }}
                    className={ [ inputColorClass, inputBackgroundColorClass ] }
                    onChange={ value => setDefaultValue( value ) }
                    hideLabelFromVision={ true }
                />
            </div>
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </Fragment>
    ); 
};