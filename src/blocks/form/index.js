// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { InnerBlocks } 		= wp.blockEditor;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform', {
	title: __( 'SV Gutenform', 'sv_gutenform' ),
	description: __( 'Create a form.', 'sv_gutenform' ),
	icon,
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform', 'sv_gutenform' ),
		__( 'Form', 'sv_gutenform' ),
		__( 'Contact Form', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'wide', 'full' ],
	},
	attributes: {
		// Hidden
		blockId: {
			type: 'string',
		},

		// Form Settings
		adminMail: {
			type: 'string',
			default: 'disabled',
		},
		adminMailUser: {
			type: 'number',
		},
		adminMailCustom: {
			type: 'string',
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