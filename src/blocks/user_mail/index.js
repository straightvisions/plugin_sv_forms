// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } 		= wp.blockEditor;

registerBlockType( 'straightvisions/sv-gutenform-user-mail', {
	title: __( 'User Mail', 'sv_gutenform' ),
	description: __( 'Create a mail that the user will recieve, when submitting the form.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform User Mail', 'sv_gutenform' ),
		__( 'User Mail', 'sv_gutenform' ),
		__( 'User Mail', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		// Hidden
		inputNames: {
			type: 'string',
		},

		// Collapse Settings
		collapsed: {
			type: 'boolean',
			default: false,
		},

		// E-Mail Settings
		subject: {
			type: 'string',
		},
		fromTitle: {
			type: 'string',
		},
		fromMail: {
			type: 'string',
		},

		// Advanced Settings
		className: {
			type: 'string',
		},
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );