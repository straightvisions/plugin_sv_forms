// Required Components
import shieldIcon from './icons/block';
import honeycombIcon from './icons/honeycomb';
import timerIcon from './icons/timer';

import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { __ }            = wp.i18n;
const { Fragment }      = wp.element;
const { 
    withSelect, 
    dispatch,
} = wp.data;
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
            timeTrapWindow,
        } 
    } = props;

    // Functions to set the block attributes
    const setHoneypot           = honeypot  => setAttributes({ honeypot });
    const setTimeTrap           = timeTrap  => setAttributes({ timeTrap });
    const updateFormAttributes  = formId    => {        
        const newAttributes     = {
            sgHoneypot: honeypot,
            sgTimeTrap: timeTrap,
            sgTimeTrapWindow: timeTrapWindow,
        };

        dispatch( 'core/block-editor' ).updateBlockAttributes( formId, newAttributes );
    };

    // State vars
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
            <FormContext.Consumer>{ value => updateFormAttributes( value ) }</FormContext.Consumer>
        </Fragment>
    ); 
});