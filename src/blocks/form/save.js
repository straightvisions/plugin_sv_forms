// Required Components
const { editPost }                  = wp.data.dispatch( 'core/editor' );
const { getBlocks }                 = wp.data.select( 'core/block-editor' );
const { getEditedPostAttribute }    = wp.data.select( 'core/editor' );
const { InnerBlocks }               = wp.blockEditor;

// Variables
let postIsUpdated                   = false;

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
const updateMeta = () => {
    const postBlocks        = getBlocks();
    const postHasMeta       = typeof getEditedPostAttribute( 'meta' ) === 'object' ? true : false;
    const postHasBlocks     = Object.keys( postBlocks ).length > 0 ? true : false;

    if ( ! postIsUpdated && postHasBlocks && postHasMeta ) {
        const meta          = getEditedPostAttribute( 'meta' )._sv_gutenform_forms;
        let metaObject      = meta && meta !== "" ? JSON.parse( meta ) : {};
        let metaArray       = Object.keys( metaObject );
        const blocksArray   = postBlocks.filter( block => { return block.name === 'straightvisions/sv-gutenform'; } );
        const hasMetaValues = metaArray.length > 0 ? true : false;
        const hasBlocks     = blocksArray.length > 0 ? true : false;

        if ( hasBlocks ) {
            if ( hasMetaValues ) {
                metaArray = removeMissingBlocks( metaArray, metaObject, blocksArray );
            }

            // Updates the values in the meta object
            blocksArray.map( block => {
                metaObject[ block.attributes.blockId ] = block.attributes;
            } );

            // Updates the post meta
            editPost( { meta: { _sv_gutenform_forms: JSON.stringify( metaObject ) } } );

            // Sets the postIsUpdated to true, so the post meta get's only updated once, even when there are more instances of the SV Gutenform Block
            postIsUpdated = true;
        }
    }
}

export default () => {
    updateMeta();

    return <InnerBlocks.Content />;
}