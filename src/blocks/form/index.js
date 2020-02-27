// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-form', {
	title: __( 'Form', 'sv_gutenform' ),
	description: __( 'This block holds the form itself.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Form', 'sv_gutenform' ),
		__( 'Form Block', 'sv_gutenform' ),
		__( 'Contact Form', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'wide', 'full' ],
	},
	attributes: {
		formId: {
			type: 'string',
		},
		collapsed: {
			type: 'boolean',
			default: false,
		},
		
		// Advanced
		className: {
			type: 'string',
		},
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );