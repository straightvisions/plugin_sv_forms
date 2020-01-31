// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
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
		formLabel: {
			type: 'string',
		},
		saveSubmissions: {
			type: 'boolean',
			default: true,
		},
		formInputs: {
			type: 'string',
		},
		collapsed: {
			type: 'boolean',
		},

		// Admin Mail Block
		adminMailSend: {
			type: 'boolean',
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
		adminMailToUsers: {
			type: 'string',
		},
		adminMailToMails: {
			type: 'string',
		},
		adminMailContent: {
			type: 'string',
		},

		// User Mail Block
		userMailSend: {
			type: 'boolean',
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
		userMailToMails: {
			type: 'string',
		},
		userMailContent: {
			type: 'string',
		},

		// Spam Guard Block
		sgHoneypot: {
			type: 'boolean',
		},
		sgTimeTrap: {
			type: 'boolean',
		},
		sgTimeTrapWindow: {
			type: 'number',
			default: 5,
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