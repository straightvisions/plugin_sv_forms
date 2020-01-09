// Required Components
const { __ } = wp.i18n;
const {
    PanelBody,
    RangeControl,
} = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            timeTrapWindow,
        }
    } = props;

    // Functions
    const setTimeTrapWindow = timeTrapWindow => setAttributes({ timeTrapWindow });

    return(
        <PanelBody
            title={ __( 'Time Trap Settings', 'sv_gutenform' ) }
            initialOpen={ false }
        >
            <RangeControl
                label={ __( 'Time Window', 'sv_gutenform' ) }
                help={ __( 'The amount of seconds that has to passs after page load, before the form will accept submissions.', 'sv_gutenform' ) }
                value={ timeTrapWindow }
                onChange={ value => setTimeTrapWindow( value ) }
                min="1"
                max="30"
            />
        </PanelBody>
    );
}