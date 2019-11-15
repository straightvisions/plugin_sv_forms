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

// Checks if the current form exists in the meta
const checkForms = ( forms, props ) => {
    const { editPost } = wp.data.dispatch( 'core/editor' );
    const {
        setAttributes,
        attributes,
    } = props;

    if ( ! forms ) {
        const newForms = {
            0: attributes,
        };

        editPost( { meta: { _sv_gutenform_forms: JSON.stringify( newForms ) } } );
        setAttributes({ ID: 0 });
    } else if ( ! Number.isInteger( attributes.ID ) ) {
        let formsObject             = JSON.parse( forms );
        const latestFormID          = Object.keys( formsObject ).length - 1;
        const newFormID             = latestFormID + 1; 

        formsObject[ newFormID ]    = attributes;
        editPost( { meta: { _sv_gutenform_forms: JSON.stringify( formsObject ) } } );
        setAttributes({ ID: newFormID });
    }

    console.log(forms);
}

export default withSelect( ( select, props ) => {
    const { getAuthors } = select( 'core' );
    const { getEditedPostAttribute } = select( 'core/editor' );
    const forms = getEditedPostAttribute( 'meta' )._sv_gutenform_forms;

    //checkForms( forms, props );

    return {
        props,
        data: {
            authors: getAuthors(),
        }
    };
} )( ( { props, data } ) => {
    // Block Properties
    const { className } = props;

    return (
        <Fragment className={ className }>
            <InspectorControls props={ props } data={ data } />
            <form method='POST' className={ className }>
				<InnerBlocks 
					//allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</form>
        </Fragment>
    );
} );