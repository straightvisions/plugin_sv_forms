// Required Components
import InspectorControls from './components/inspector_controls';
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
    const {
        attributes: {
            subject,
            fromTitle,
            fromMail,
        }
    } = props;

    // Functions
    // Returns the innerBlocks content as string
    const getMailContent = () => {
        return innerBlocks.map( block => { return  getBlockContent( block ) } ).join( '' );
    }

    // Updates the atrributes of the sv-gutenform block
    const updateFormAttributes = formId => {
        const newAttributes     = {
            userMailSubject: subject,
            userMailFromTitle: fromTitle,
            userMailFromMail: fromMail,
            userMailContent: getMailContent(),
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes);
    }

    return (
        <div className={ props.className }>
            <InspectorControls props={ props } />
            <div className='header'>
                <div className='title'>{ __( 'User Mail', 'sv_gutenform' ) }</div>
                <div className='description'>
                    { __( 'Everything inside this block will be the content of the user mail.', 'sv_gutenform' ) }
                </div>
            </div>
            <div class="body">
                <InnerBlocks />
            </div>
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </div>
    );
});