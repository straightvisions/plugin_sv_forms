// Required Components
import shieldIcon from './icons/block';
import honeycombIcon from './icons/honeycomb';
import timerIcon from './icons/timer';
import InspectorControls from './components/inspector_controls';

const { __ }            = wp.i18n;
const { withSelect }    = wp.data;
const { Fragment }      = wp.element;
const {
    Placeholder,
    Button,
} = wp.components;

export default withSelect( ( select, props ) => {
    return props;
} )( ( props ) => {
    // Block Properties
    const {
        className,
        setAttributes,
        attributes: {
            honeypot,
            timeTrap,
        } 
    } = props;

    // Functions
    const setHoneypot = honeypot => setAttributes({ honeypot });
    const setTimeTrap = timeTrap => setAttributes({ timeTrap });

    const honeypotState = honeypot ? 'is-active' : '';
    const timeTrapState = timeTrap ? 'is-active' : '';

    return (
        <Fragment>
            <InspectorControls props={ props } />
            <div className={ className }>
                <Placeholder
                    icon={ shieldIcon }
                    label={ __( 'Spam Guard', 'sv_gutenform' ) }
                    instructions={ __( 'Select your anti spam features.', 'sv_gutenform' ) }
                >
                    <Button 
                        isTertiary 
                        icon={ honeycombIcon } 
                        className={ honeypotState }
                        onClick={ () => setHoneypot( ! honeypot ) }
                    >
                        Honeypot
                    </Button>
                    <Button 
                        isTertiary 
                        icon={ timerIcon } 
                        className={ timeTrapState }
                        onClick={ () => setTimeTrap( ! timeTrap ) }
                    >
                        Time Trap
                    </Button>
                </Placeholder>
            </div>
        </Fragment>
    ); 
});