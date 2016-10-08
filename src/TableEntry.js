/**
 * @module UITable
 */
/**
 * Handle entry data.
 *
 * @class entry
 */
export default (function () {
    /**
     * Target of processing.
     *
     * @property
     * @type {Object}
     */
    let current;

    /**
     * Write content to input hidden value.
     *
     * @method save
     * @public
     */
    function save() {
        const data = $( '#it-table-editor-content' ).val();
        const content = $( current ).children( 'input[name="content[]"]' );
        if ( data !== '' ) {
            content.parent().removeClass( 'it-table-data-empty' );
            content.parent().addClass( 'it-table-data-fill' );
            $( 'i', content.parent() ).removeClass( 'fa-pencil-square-o' );
            $( 'i', content.parent() ).addClass( 'fa-pencil-square' );
        }
        if ( data === '' ) {
            content.parent().removeClass( 'it-table-data-fill' );
            content.parent().addClass( 'it-table-data-empty' );
            $( 'i', content.parent() ).removeClass( 'fa-pencil-square' );
            $( 'i', content.parent() ).addClass( 'fa-pencil-square-o' );
        }
        content.val( data );
        $( '#it-table-entry-dialog' ).hide();
        return false;
    }

    /**
     * Display area to edit cell data.
     *
     * Read content to area from input hidden value.
     *
     * @method edit
     * @public
     */
    function edit() {
        $( this ).css( { 'background': '#3276b1' } );
        current = this;
        const content = $( 'input[name="content[]"]', this );
        $( '#it-table-editor-content' ).val( content.val() );
        $( '#it-table-entry-dialog' ).show();
        return false;
    }

    /*
     * Auto save when dialog is close by Save button
     */
    function autoSave() {
        const data = $( '#it-table-editor-content' ).val();
        const content = $( current ).children( 'input[name="content[]"]' );
        content.val( data )
    }

    return {
        edit: edit,
        save: save,
        autoSave: autoSave
    };
}());

