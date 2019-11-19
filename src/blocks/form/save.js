// Required Components
const { InnerBlocks }               = wp.blockEditor;
const { editPost }                  = wp.data.dispatch( 'core/editor' );
const { getBlocks }                 = wp.data.select( 'core/block-editor' );
const { getEditedPostAttribute }    = wp.data.select( 'core/editor' );

// Stores if the meta was saved and makes sure that it will be only saved once per post save/update
let metaSaved                       = false;

export default () => {
    const metaObject    = getEditedPostAttribute( 'meta' );
    const blocksObject  = getBlocks();

    // When the post get's saved/updated meta will be available
    if ( typeof metaObject === 'object' && ! metaSaved ) {
        // When post has blocks
        if ( Object.keys( blocksObject ).length > 0 ) {
            const blockFormsArray   = blocksObject.filter( block => { return block.name === 'straightvisions/sv-gutenform'; } );

            // When post has SV Gutenform Blocks
            if ( blockFormsArray.length > 0 ) {
                let metaFormsObject     = {};
                if ( metaObject._sv_gutenform_forms && metaObject._sv_gutenform_forms !== "" ) {
                    metaFormsObject = JSON.parse( metaObject._sv_gutenform_forms );
                }
    
                let metaFormsArray      = Object.keys( metaFormsObject );

                 // Removes missing forms from meta
                if ( metaFormsArray.length > 0 ) {
                    metaFormsArray.map( ID => {
                        const remove = blockFormsArray.map( block => {
                            const blockID = block.attributes.ID;

                            if ( Number.isInteger( blockID ) ) {
                                return blockID !== ID ? true : false;
                            }

                            return true;
                        } )[0];

                        if ( remove ) {
                            delete metaFormsObject[ ID ];
                        }
                    } );

                    metaFormsArray = Object.keys( metaFormsObject );
                }

                // Adds and updated forms
                const lastFormID    = metaFormsArray.length - 1;
                let newFormID       = lastFormID + 1; 

                // Needs check for copy of existing block
                blockFormsArray.map( block => {
                    // Block does not have the ID attribute
                    if ( ! Number.isInteger( block.attributes.ID ) ) {
                        block.attributes.ID = newFormID;
                        metaFormsObject[ newFormID ] = block.attributes;

                        newFormID++;
                    } else {
                        metaFormsObject[ block.attributes.ID ] = block.attributes;
                    }
                } );

                console.log(metaFormsObject);
                console.log(blockFormsArray);
                // Updates the meta value
                editPost( { meta: { _sv_gutenform_forms: JSON.stringify( metaFormsObject ) } } );
            }
        }

        metaSaved = true;
    }

    return <InnerBlocks.Content />;
}