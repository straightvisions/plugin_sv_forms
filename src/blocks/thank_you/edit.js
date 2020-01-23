// Required Components
import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { withState }     = wp.compose;
const { InnerBlocks }   = wp.blockEditor;
const { 
    Button,
    ClipboardButton,
    Tooltip,
} = wp.components;
const { 
    withSelect,
    select 
} = wp.data;

export default withSelect( ( select, props ) => {
    return {
        innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ),
        props
    };
} )( ({ innerBlocks, props }) => {
    const {
        className,
        setAttributes,
        attributes: { 
            inputNames, 
        }
    } = props;

    // Fetches all input names of the blocks inside the form block
    const setInputNames = formId => {
        const wrapperBlocks = select( 'core/block-editor' ).getBlocks( formId );
        const formBlock = wrapperBlocks.find( block => block.name === 'straightvisions/sv-gutenform-form' );
        
        if ( ! formBlock ) return null;

        const formBlocks = select( 'core/block-editor' ).getBlocks( formBlock.clientId );

        if ( formBlocks.length < 1 ) return null;

        const filteredBlocks = formBlocks.filter( block => {
            return block.attributes.name;
        } );
        const names = filteredBlocks.map( block => {
            return '%' + block.attributes.name + '%';
        } );

        const uniqueNames = [...new Set(names)];

        if ( inputNames !== uniqueNames ) {
            setAttributes({ inputNames: uniqueNames.join( ', ' ) });
        }
    }

    // Creates a clippboard button with the input name as value
    const InputValueButton = withState( {
        hasCopied: false,
    } )( ( { hasCopied, setState, text } ) => {
        const toolTipText = hasCopied ? __( 'Copied to clippboard.', 'sv_gutenform' ) : __( 'Copy to clippboard.', 'sv_gutenform' );

        return (
            <Tooltip text={ toolTipText }>
                <ClipboardButton
                    isTertiary
                    className='sv_gutenform_input_value'
                    text={ text }
                    onCopy={ () => setState( { hasCopied: true } ) }
                    onFinishCopy={ () => setState( { hasCopied: false } ) }
                >
                    { text }
                </ClipboardButton>
            </Tooltip>
        ); 
    });

    // Returns the available input values
    const InputValues = () => {
        if ( ! inputNames || inputNames.length < 1 ) return null;

        let output = [];

        inputNames.split( ',' ).map( name => {
            output.push( <InputValueButton text={ name } /> );
        } );

        return <div className='sv_gutenform_input_values'>{ output }</div>;
    }

    return (
        <div className={ className }>
            <div className='sv_gutenform_header'>
                <div className='sv_gutenform_title_wrapper'>
                    <div className='sv_gutenform_title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                    <Button 
                        isTertiary 
                        onClick={ () => toggleBody() }
                    ><span class='dashicons dashicons-visibility'></span></Button>
                </div>
                <div className='sv_gutenform_input_values_wrapper'>
                    <div className='sv_gutenform_input_values_title'>{ __( 'Available input values: ', 'sv_gutenform' ) }</div>
                    <InputValues />
                </div>
            </div>
            <div className='sv_gutenform_body'>
                <InnerBlocks templateLock={ false } />
            </div>
            <FormContext.Consumer>{ value => setInputNames( value ) }</FormContext.Consumer>
        </div> 
    ); 
});