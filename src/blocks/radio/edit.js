// Required Components
import InspectorControls from './components/inspector_controls';

const { withSelect }        = wp.data;
const { Fragment }          = wp.element;
const { CheckboxControl }   = wp.components;

export default withSelect( ( select, props ) => {
    const blocks    = select('core/block-editor').getBlocks();
    let radioBlocks = [];


    blocks.forEach( block => {
        if ( block.name === 'straightvisions/sv-gutenform' && block.innerBlocks.length > 0 ) {
            block.innerBlocks.forEach( innerBlock => {
                if ( innerBlock.name === 'straightvisions/sv-gutenform-radio' ) {
                    radioBlocks.push( innerBlock );
                }
            } );
        }
    });


    return { 
        props,
        radioBlocks
    };
} )( ({ props, radioBlocks }) => {
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
    const setCheck = isChecked => { 
        radioBlocks.forEach( radioBlock => {
            if ( radioBlock.clientId !== props.clientId && radioBlock.attributes.name === props.attributes.name ) {
                radioBlock.attributes.isChecked = false;
            } else {
                setAttributes({ isChecked });
            }
        } );
    };

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
            <InspectorControls props={ props } />
            <div className={ className }>
                <CheckboxControl
                    type="radio"
                    name={ name }
                    value={ value }
                    required={ required }
                    disabled={ disabled }
                    checked={ isChecked }
                    onChange={ () => setCheck( true ) }
                />
                <Label />
            </div>
        </Fragment>
    ); 
});