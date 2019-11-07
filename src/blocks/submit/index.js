// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-submit', {
	title: __( 'Submit Button' ),
	description: __( 'The submit button for the form.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Submit', 'sv_gutenform' ),
		__( 'Submit', 'sv_gutenform' ),
		__( 'Button', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		// Text
		text: {
			type: 'string',
			default: __( 'Submit', 'sv_gutenform' ),
		},

		// Color Settings
		textColor: {
			type: 'string',
		},
		textColorClass: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		backgroundColorClass: {
			type: 'string',
		},

		// Advanced
		className: {
			type: 'string',
		},
	},
	edit,
	save,
} );