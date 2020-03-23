// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-submit', {
	title: __( 'Submit Button', 'sv_gutenform' ),
	description: __( 'The submit button for the form.', 'sv_gutenform' ),
	icon,
	parent: [ 
		'straightvisions/sv-gutenform-form', 
		'core/group', 
		'core/cover',
		'core/column',
		'core/media-text',
	],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Submit', 'sv_gutenform' ),
		__( 'Submit', 'sv_gutenform' ),
		__( 'Button', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'full' ],
	},
	attributes: {
		// Text
		content: {
			type: 'string',
			default: __( 'Send', 'sv_gutenform' ),
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