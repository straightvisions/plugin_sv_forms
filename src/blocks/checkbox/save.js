export default ( { attributes } ) => {
    const {
        // Input Settings
        isChecked,
        value,
        name,
        label,
        disabled,
    } = attributes;

    return (
        <fieldset>
            {
                label
                ? <label for={ name + '-' + value }>{ label }</label>
                : null
            }
            <input
                type='checkbox'
                id={ name + '-' + value }
                name={ name }
                value={ value }
                disabled={ disabled }
                checked={ isChecked }
            />
        </fieldset>
    );
};