export default ( { attributes } ) => {
    const {
        // Input Settings
        defaultValue,
        name,
        placeholder,
        label,

        // Validation Settings
        required,
        minlength,
        maxlength,

        // Color Settings
        textColor,
        textColorClass,
        backgroundColor,
        backgroundColorClass,

        // Advanced Settings
        autofocus,
        autocomplete,
        readonly,
        disabled,
    } = attributes;

    return (
        <fieldset>
            {
                label
                ? <label for={ name }>{ label }</label>
                : null
            }
            <input
                type='url'
                id={ name }
                name={ name }
                label={ label }
                required={ required }
                disabled={ disabled }
                readonly={ readonly }
                value={ defaultValue }
                minlength={ minlength > 0 ? minlength : '' }
                maxlength={ maxlength > 0 ? maxlength : '' }
                autofocus={ autofocus }
                placeholder={ placeholder }
                autocomplete={ autocomplete ? 'on' : 'off' }
                className={ [ textColorClass, backgroundColorClass ] }
                style={{ 
                    color: ! textColorClass ? textColor : null, 
                    backgroundColor: ! backgroundColorClass ? backgroundColor : null, 
                }}
            />
        </fieldset>
    );
};