// Required Components
import { FormContext } from '../../blocks';

const { __ }                = wp.i18n;
const { InnerBlocks }       = wp.blockEditor;
const { getBlockContent }   = wp.blocks;
const { 
    withSelect, 
    dispatch 
}                           = wp.data;

export default withSelect( ( select, props ) => {
    return {
        innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ),
        props
    };
} )( ({ innerBlocks, props }) => {
    // Functions
    // Returns the innerBlocks content as string
    const getMailContent = () => {
        return innerBlocks.map( block => { return  getBlockContent( block ) } ).join( '' );
    }

    // Updates the userMailContent atrribute of the sv-gutenform block
    const updateFormAttributes = formId => {
        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, { userMailContent: getMailContent() } );
    }

    return (
        <div className={ props.className }>
            <h2>{ __( 'User Mail', 'sv_gutenform' ) }</h2>
            <p>{ __( 'Everything inside this block will be the content of the user mail.', 'sv_gutenform' ) }</p>
            <InnerBlocks />
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </div>
    );
});