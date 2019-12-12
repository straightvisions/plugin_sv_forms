// Required Components
const { __ }            = wp.i18n;
const { InnerBlocks }   = wp.blockEditor;

const template = [
    ['core/heading', { 
        content: __( 'Thank You!', 'sv_gutenform' ), 
        level: 3,
    }],
];

export default props => {
    return (
        <div className={ props.className }>
            <h2>{ __( 'Confirmation Mail', 'sv_gutenform' ) }</h2>
            <InnerBlocks 
                template={ template }
                templateLock={ false }
            />
        </div>
    );
}