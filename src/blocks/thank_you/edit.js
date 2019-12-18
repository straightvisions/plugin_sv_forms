// Required Components
import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { 
    withSelect,
    select 
} = wp.data;
const { InnerBlocks }   = wp.blockEditor;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    const {
        setAttributes,
        attributes: { inputNames }
    } = props;

    const setInputNames = formId => {
        const formBlocks        = select( 'core/block-editor' ).getBlocks( formId );
        const filteredBlocks    = formBlocks.filter( block => {
            return block.attributes.name;
        } );
        const names             = filteredBlocks.map( block => {
            return '%' + block.attributes.name + '%';
        } );

        const uniqueNames = [...new Set(names)];

        if ( inputNames !== uniqueNames ) {
            setAttributes({ inputNames: uniqueNames.join( ', ' ) });
        }
    }

    return (
        <div className={ props.className }>
            <div className='header'>
                <div className='title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                <div className='description'>
                    { __( 'Everything inside this block will be the content of the submission confirmation.', 'sv_gutenform' ) }
                    <div className='input-values-wrapper'>
                        <div className='input-values-title'>{ __( 'Available input values: ', 'sv_gutenform' ) }</div>
                        <div className='input-values'>
                        {
                            inputNames 
                            ? inputNames.split( ',' ).map( name => {
                                return <div className='input-value'>{ name }</div>;
                            } )
                            : ''
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <InnerBlocks />
            </div>
            <FormContext.Consumer>{ value => setInputNames( value ) }</FormContext.Consumer>
        </div>
    ); 
});