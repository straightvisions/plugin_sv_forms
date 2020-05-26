// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-submit', {
	title: __( 'Submit Button', 'sv_forms' ),
	description: __( 'The submit button for the form.', 'sv_forms' ),
	icon,
	parent: [ 'straightvisions/sv-forms-form' ],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms Submit', 'sv_forms' ),
		__( 'Submit', 'sv_forms' ),
		__( 'Button', 'sv_forms' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'full' ],
	},
	attributes: {
		// Text
		content: {
			type: 'string',
			default: __( 'Send', 'sv_forms' ),
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
		borderColor: {
			type: 'string',
			default: '#ddd',
		},

		// Border Settings
		borderRadius: {
			type: 'number',
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