/**
 * @module UITable
 */
/**
 * Handle error, exception, notice
 *
 * @class alert
 */
export default (function () {
    /**
     * Display error message to container element.
     *
     * @method message
     * @param {Object} e Custom error object.
     * @param {String} e.container Error container.
     * @param {String} e.message Error message.
     */
    function message( e ) {
        const container = $( e.container);
        container.text( e.message );
        container.addClass( 'bg-danger' );
        container.css( { 'display': 'block' } );
    }

    /**
     * Display confirm dialog.
     */
    function confirm(e) {
        return window.confirm(e.message);
        
    }

    /**
     * Close alert container
     *
     * @method close
     * @return boolean
     */
    function close() {
        $( this ).parent().fadeOut( 'slow' );
        return false;
    }

    return {
        message: message,
        confirm: confirm,
        close: close
    }
}());