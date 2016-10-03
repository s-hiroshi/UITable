/**
 * @module UITable
 */
/**
 * Handle error, exception
 *
 * @class customException
 */
export default (function () {
    let containerSelector = '.it-table-alert';

    function getContainerSelector() {
        return containerSelector;
    }

    function setContainerSelector( selector ) {
        containerSelector = selector;
    }

    /**
     * Output error.
     *
     * @method output
     * @param {Object} e Custom Error object.
     * @param {String} e.message Error message.
     * @param {String} e.type Error type.
     */
    function output( e ) {
        const container = $( containerSelector );
        container.text( e.message );
        container.addClass( 'bg-danger' );
        container.css( { 'display': 'block' } );
    }

    /**
     * Close output container
     *
     * @method close
     * @return boolean
     */
    function close() {
        $( this ).parent().fadeOut( 'slow' );
        return false;
    }


    return {
        getContainerSelector: getContainerSelector,
        setContainerSelector: setContainerSelector,
        output: output,
        close: close
    }
}());