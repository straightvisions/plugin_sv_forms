// Required Components
import InspectorControls from './components/inspector_controls';

const { __ }            = wp.i18n;
const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const { InnerBlocks }   = wp.blockEditor;

// Allowed Blocks
const allowedBlocks = [
    'core/heading',
    'core/spacer',
    'straightvisions/sv-gutenform-text',
    'straightvisions/sv-gutenform-email',
    'straightvisions/sv-gutenform-url',
    'straightvisions/sv-gutenform-checkbox',
    'straightvisions/sv-gutenform-radio',
    'straightvisions/sv-gutenform-textarea',
    'straightvisions/sv-gutenform-submit',
];

// Default Form Template
const template = [
    ['core/heading', { 
        content: __( 'Contact', 'sv_gutenform' ), 
        level: 3,
    }],
    ['straightvisions/sv-gutenform-text', {
        label: __( 'Name', 'sv_gutenform' ),
        name: 'name',
        required: true,
        autofocus: true,
    }],
    ['straightvisions/sv-gutenform-email', {
        label: __( 'E-Mail', 'sv_gutenform' ),
        name: 'email',
        required: true,
    }],
    ['straightvisions/sv-gutenform-url', {
        label: __( 'Website', 'sv_gutenform' ),
        name: 'website',
    }],
    ['straightvisions/sv-gutenform-textarea', {
        label: __( 'Message', 'sv_gutenform' ),
        name: 'message',
        required: true,
    }],
    ['straightvisions/sv-gutenform-submit'],
    ['straightvisions/sv-gutenform-thank-you'],
];

// Functions
const checkBlockIds = ( props, data ) => {
    const { 
        clientId,
        setAttributes,
        attributes: {
            blockId,
        }
    } = props;
    const setBlockId    = blockId => setAttributes({ blockId });
    const isDuplicate   = blockId => data.blocks.find( block => {
        return block.attributes.blockId === blockId ? true : false;
    } );

    // Checks if the block is new one or a duplicate from an existing one
    if ( ! blockId || ( blockId !== clientId && isDuplicate( blockId ) ) ) {
        setBlockId( clientId );
        props.attributes.blockId = clientId;
    }
}

export default withSelect( ( select, props ) => {
    const { getBlocks }     = select( 'core/block-editor' );
    const { getAuthors }    = select( 'core' );
    const data = {
        authors: getAuthors(),
        blocks: getBlocks(),
    };

    return { props, data };
} )( ( { props, data } ) => {
    // Makes sure that all new added blocks have a unique blockId
    checkBlockIds( props, data );

    return (
        <Fragment className={ props.className }>
            <InspectorControls props={ props } data={ data } />
            <form method='POST' className={ props.className }>
				<InnerBlocks 
					//allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</form>
        </Fragment>
    );
} );