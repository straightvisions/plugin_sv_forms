// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
        }
    } = props;

    return(
        <PanelBody
            title={ __( 'Time Trap Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
        </PanelBody>
    );
}