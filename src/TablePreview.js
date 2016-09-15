/**
 * @module UITable
 */
/**
 * Handle table preview.
 *
 * テーブルのプレビュー機能を提供します。
 *
 * @class preview
 */
export default (function () {
    /**
     * Preview table.
     *
     * @method preview
     * @public
     * @param params
     *   @param {Number} params.rowsLength Row length.
     *   @param {Number} params.colsLength column length.
     *   @param {Array} params.data Input data.
     *   @param {Array} params.th   TH/TD Flag. TH is true.
     * @returns {String} Table markup.
     */
    function preview( params ) {
        const data = params.data;
        const th = params.th;
        const rowsLength = params.rowsLength;
        const colsLength = params.colsLength;
        const previewTable = $( '<table class="preview-table table">' );
        for ( var i = 0; i < rowsLength; i++ ) {
            let row = $( '<tr>' ).appendTo( previewTable );
            for ( var j = 0; j < colsLength; j++ ) {
                if ( th[i * colsLength + j] === 'true' ) {
                    $( `<th>${filterBr( data[i * colsLength + j] )}</th>` ).appendTo( row );
                } else {
                    $( `<td>${filterBr( data[i * colsLength + j] )}</td>` ).appendTo( row );
                }
            }
        }
        return previewTable;
    }

    /**
     * Convert Line Break to br tag.
     *
     * @param {String} data Input data.
     * @returns {XML|void|String|*}
     */
    function filterBr( data ) {
        return data.replace( /\n/g, '<br>' );
    }

    return {
        preview: preview
    };
}());

