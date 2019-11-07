export default ( { attributes } ) => {
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

    return (
        <fieldset>
            {
                label
                ? <label for={ name }>{ label }</label>
                : null
            }
            <input
                type='text'
                id={ name }
                name={ name }
                value={ defaultValue }
                placeholder={ placeholder }
                className={ [ textColorClass, backgroundColorClass ] }
                style={{ 
                    color: ! textColorClass ? textColor : null, 
                    backgroundColor: ! backgroundColorClass ? backgroundColor : null, 
                }}
                disabled={ disabled }
            />
        </fieldset>
    );
};