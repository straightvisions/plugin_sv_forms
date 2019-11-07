// Required Components
const { InnerBlocks } = wp.blockEditor;

export default ( { attributes } ) => {
    const {
        action,
        method,
    } = attributes;

    return (
        <form action={ action } method={ method }>
            <InnerBlocks.Content />
        </form>
    ); 
}