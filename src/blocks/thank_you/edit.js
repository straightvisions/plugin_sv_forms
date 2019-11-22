// Required Components
const { __ }            = wp.i18n;
const { withSelect }    = wp.data;
const { InnerBlocks }   = wp.blockEditor;

// Default Form Template
const template = [
    ['core/heading', { 
        content: __( 'Thank You!', 'sv_gutenform' ), 
        level: 3,
    }],
    ['core/paragraph', { 
        content: __( 'We have received your request and will contact you as soon as possible!', 'sv_gutenform' ), 
    }],
];

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    return (
        <div className={ props.className }>
            <h2>{ __( 'Thank You Message', 'sv_gutenform' ) }</h2>
            <InnerBlocks template={ template } />
        </div>
    ); 
});