export default ( { attributes, className } ) => {
    const {
        // Input Settings
        defaultValue,
        name,
        placeholder,
        label,
        disabled,

        // Color Settings
        textColor,
        textColorClass,
        backgroundColor,
        backgroundColorClass,
    } = attributes;

    let classes = '';
    
    if ( textColorClass ) classes += textColorClass + ' ';
    if ( backgroundColorClass ) classes += backgroundColorClass;

    return (
        <fieldset
            className={ className }
        >
            {
                label
                ? <label for={ name }>{ label }</label>
                : null
            }
            <textarea
                id={ name }
                name={ name }
                value={ defaultValue }
                placeholder={ placeholder }
                class={ classes }
                style={{ 
                    color: ! textColorClass ? textColor : null, 
                    backgroundColor: ! backgroundColorClass ? backgroundColor : null, 
                }}
                disabled={ disabled }
            />
        </fieldset>
    );
};