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
        isRecipient: true,
    }],
    ['straightvisions/sv-gutenform-submit'],
];

export default withSelect( ( select, props ) => {
    const { getAuthors }    = select( 'core' );
    const { getBlocks }     = select( 'core/block-editor' );
    
    // Check for copy of existing block
    if ( Number.isInteger( props.attributes.ID ) ) {
        const blocksObject      = getBlocks();
        const blockFormsArray   = blocksObject.filter( block => { return block.name === 'straightvisions/sv-gutenform'; } );
        
    }

    return {
        props,
        data: {
            authors: getAuthors(),
        }
    };
} )( ( { props, data } ) => {
    // Block Properties
    const { className, attributes: { ID } } = props;

    return (
        <Fragment className={ className }>
            <InspectorControls props={ props } data={ data } />
            <form method='POST' className={ className }>
                <div>Form ID - { ID }</div>
				<InnerBlocks 
					//allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</form>
        </Fragment>
    );
} );