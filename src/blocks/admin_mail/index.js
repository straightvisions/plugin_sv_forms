// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-admin-mail', {
	title: __( 'Admin Mail', 'sv_gutenform' ),
	description: __( 'Create a mail that the admin/author will recieve, when the form is submitted.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Admin Mail', 'sv_gutenform' ),
		__( 'Admin Mail', 'sv_gutenform' ),
		__( 'User Mail', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
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
		return null;
	},
} );