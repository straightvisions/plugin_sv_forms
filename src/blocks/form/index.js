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
		postId: {
			type: 'number',
		},
		formId: {
			type: 'string',
		},
		saveSubmits: {
			type: 'boolean',
			default: true,
		},

		// Mail Settings
		// Admin Mails
		adminMail: {
			type: 'string',
			default: 'disabled',
		},
		adminMailUser: {
			type: 'number',
		},
		adminMailAdress: {
			type: 'string',
		},
		adminMailSubject: {
			type: 'string',
		},
		adminMailFromTitle: {
			type: 'string',
		},
		adminMailFromMail: {
			type: 'string',
		},
		adminMailContent: {
			type: 'string',
		},

		// User Mails
		userMail: {
			type: 'boolean',
		},
		userMailInputName: {
			type: 'string',
		},
		userMailSubject: {
			type: 'string',
		},
		userMailFromTitle: {
			type: 'string',
		},
		userMailFromMail: {
			type: 'string',
		},
		userMailContent: {
			type: 'string',
		},

		// Spam Guard Settings
		// Honeypot
		sgHoneypot: {
			type: 'boolean',
		},

		// Time Trap
		sgTimeTrap: {
			type: 'boolean',
		},
		sgTimeTrapWindow: {
			type: 'number',
			default: 10,
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