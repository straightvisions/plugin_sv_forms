// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-spam-guard', {
	title: __( 'Spam Guard', 'sv_gutenform' ),
	description: __( 'Provides features to prevent spam in your form.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform-form'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Spam Guard', 'sv_gutenform' ),
		__( 'Spam Guard', 'sv_gutenform' ),
		__( 'Anti Spam', 'sv_gutenform' ),
	],
	attributes: {
		// Honeypot Settings
		honeypot: {
			type: 'bool',
		},

		// Time Trap Settings
		timeTrap: {
			type: 'bool',
		},
		timeTrapWindow: {
			type: 'number',
			default: 5,
		},

		// Advanced Settings
		className: {
			type: 'string',
		},
	},
	edit,
	save: () => {
		return null;
	}
} );