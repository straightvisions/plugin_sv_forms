// Required Components
import InspectorControls from './components/inspector_controls';

const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;

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
];

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        attributes: {
            action,
            method,
        },
    } = props;

    return (
        <Fragment className={ className }>
            <InspectorControls props={ props } />
            <form action={ action } method={ method } className={ className }>
				<InnerBlocks 
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</form>
        </Fragment>
    );
} );