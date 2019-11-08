// Required Components
const { __ } = wp.i18n;
const { Fragment } = wp.element;
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

    return(
        <Fragment>
            <ToggleControl
                label={ __( 'Autofocus', 'sv_gutenform' ) }
                checked={ autofocus }
                onChange={ () => setAttributes( { autofocus: ! autofocus } )  }
            />
            <ToggleControl
                label={ __( 'Autocomplete', 'sv_gutenform' ) }
                checked={ autocomplete }
                onChange={ () => setAttributes( { autocomplete: ! autocomplete } )  }
            />
            <ToggleControl
                label={ __( 'Read Only', 'sv_gutenform' ) }
                checked={ readonly }
                onChange={ () => setAttributes( { readonly: ! readonly } )  }
            />
            <ToggleControl
                label={ __( 'Disabled', 'sv_gutenform' ) }
                checked={ disabled }
                onChange={ () => setAttributes( { disabled: ! disabled } )  }
            />
        </Fragment>
    );
}