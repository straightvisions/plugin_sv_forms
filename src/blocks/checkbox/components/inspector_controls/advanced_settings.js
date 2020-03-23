// Required Components
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: { disabled }
    } = props;

    // Functions to set the block attributes
    const setDisabled = disabled => setAttributes({ disabled });

    return(
        <Fragment>
            <ToggleControl
                label={ __( 'Disabled', 'sv_forms' ) }
                checked={ disabled }
                onChange={ () => setDisabled( ! disabled )  }
            />
        </Fragment>
    );
}