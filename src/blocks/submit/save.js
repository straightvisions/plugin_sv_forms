export default ( { attributes } ) => {
    const {
        content,
        textColor,
        textColorClass,
        backgroundColor,
        backgroundColorClass,
    } = attributes;

    return (
        <button
            className={ [ textColorClass, backgroundColorClass ] }
            style={{ 
                color: ! textColorClass ? textColor : null, 
                backgroundColor: ! backgroundColorClass ? backgroundColor : null, 
            }}
            type='submit'
        >
            { content }
        </button>
    );
};