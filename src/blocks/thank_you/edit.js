// Required Components
const { __ }            = wp.i18n;
const { withSelect }    = wp.data;
const { InnerBlocks }   = wp.blockEditor;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    return (
        <div className={ props.className }>
            <h2>{ __( 'Thank You Message', 'sv_gutenform' ) }</h2>
            <InnerBlocks />
        </div>
    ); 
});