// Required Components
const { __ }            = wp.i18n;
const { withSelect }    = wp.data;
const { InnerBlocks }   = wp.blockEditor;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    return (
        <div className={ props.className }>
            <div className='header'>
                <div className='title'>{ __( 'Thank You Message', 'sv_gutenform' ) }</div>
                <div className='description'>
                    { __( 'Everything inside this block will be the content of the submission confirmation.', 'sv_gutenform' ) }
                </div>
            </div>
            <div class="body">
                <InnerBlocks />
            </div>
        </div>
    ); 
});