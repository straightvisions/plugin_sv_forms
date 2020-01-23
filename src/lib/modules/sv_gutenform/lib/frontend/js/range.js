(function( jQuery ) {
    jQuery( document ).ready( function() {
        jQuery( '.wp-block-straightvisions-sv-gutenform-range input[type="range"]' ).on( 'input',  function() {
            const range     = jQuery( this );
            const number    = jQuery( '.wp-block-straightvisions-sv-gutenform-range input[type="number"]' );
        
            number.attr( 'value', range.attr( 'value' ) );
        } );
        
        jQuery( '.wp-block-straightvisions-sv-gutenform-range input[type="number"]' ).on( 'input',  function() {
            const number   = jQuery( this );
            const range    = jQuery( '.wp-block-straightvisions-sv-gutenform-range input[type="range"]' );;
        
            range.attr( 'value', number.attr( 'value' ) );
        } );
    } );
}( jQuery ));