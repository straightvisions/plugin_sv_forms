// Required Components
const { __ }            = wp.i18n;
const { Fragment }      = wp.element;
const { ToggleControl } = wp.components;

export default ( { props } ) => {
    if ( ! props ) return '';

    // Block Attributes
    const { 
        setAttributes,
        attributes: {
            autofocus,
            autocomplete,
            readonly,
            disabled,
        }
    } = props;

    // Functions
    const setAutofocus      = autofocus     =>  setAttributes({ autofocus });
    const setAutocomplete   = autocomplete  =>  setAttributes({ autocomplete });
    const setReadonly       = readonly      =>  setAttributes({ readonly });
    const setDisabled       = disabled      =>  setAttributes({ disabled });

    return(
        <Fragment>
            <ToggleControl
                label={ __( 'Autofocus', 'sv_gutenform' ) }
                checked={ autofocus }
                onChange={ () => setAutofocus( ! autofocus )  }
            />
            <ToggleControl
                label={ __( 'Autocomplete', 'sv_gutenform' ) }
                checked={ autocomplete }
                onChange={ () => setAutocomplete( ! autocomplete )  }
            />
            <ToggleControl
                label={ __( 'Read Only', 'sv_gutenform' ) }
                checked={ readonly }
                onChange={ () => setReadonly( ! readonly )  }
            />
            <ToggleControl
                label={ __( 'Disabled', 'sv_gutenform' ) }
                checked={ disabled }
                onChange={ () => setDisabled( ! disabled )  }
            />
        </Fragment>
    );
}