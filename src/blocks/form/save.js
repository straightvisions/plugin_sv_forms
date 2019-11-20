// Required Components
const { editPost }                  = wp.data.dispatch( 'core/editor' );
const { getBlocks }                 = wp.data.select( 'core/block-editor' );
const { getEditedPostAttribute }    = wp.data.select( 'core/editor' );
const { InnerBlocks }               = wp.blockEditor;

// Functions
// Removes missing blocks from the meta object and returns the updated meta array
const removeMissingBlocks = ( metaArray, metaObject, blocksArray ) => {
    metaArray.map( key => {
        const remove = blocksArray.map( block => { 
            return key !== block.attributes.blockId ? true : false; 
        } );

        if ( remove ) {
            delete metaObject[ key ];
        }
    } );

    return Object.keys( metaObject );
}

// Updated the post meta
const updateMeta = ( blockId ) => {
    const postBlocks        = getBlocks();
    const postHasMeta       = typeof getEditedPostAttribute( 'meta' ) === 'object' ? true : false;
    const postHasBlocks     = Object.keys( postBlocks ).length > 0 ? true : false;

    if ( postHasBlocks && postHasMeta ) {
        const blocksArray   = postBlocks.filter( block => { return block.name === 'straightvisions/sv-gutenform'; } );
        const hasBlocks     = blocksArray.length > 0 ? true : false;

        if ( hasBlocks ) {
            const isFirstBlock  = blockId === blocksArray[0].attributes.blockId ? true : false;

            if ( isFirstBlock ) {
                const meta          = getEditedPostAttribute( 'meta' )._sv_gutenform_forms;
                let metaObject      = meta && meta !== "" ? JSON.parse( meta ) : {};
                let metaArray       = Object.keys( metaObject );
                const hasMetaValues = metaArray.length > 0 ? true : false;

                if ( hasMetaValues ) {
                    metaArray = removeMissingBlocks( metaArray, metaObject, blocksArray );
                }

                // Updates the values in the meta object
                blocksArray.map( block => {
                    metaObject[ block.attributes.blockId ] = block.attributes;
                } );

                // Updates the post meta
                editPost( { meta: { _sv_gutenform_forms: JSON.stringify( metaObject ) } } );
            }
        }
    }
}

export default ( props ) => {
    updateMeta( props.attributes.blockId );

    return <InnerBlocks.Content />;
}