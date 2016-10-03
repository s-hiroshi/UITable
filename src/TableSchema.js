/**
 * Handle table schema.
 *
 * @class schema
 */
export default (function () {

    /**
     * @property exception
     * @public
     * @type {object}
     */
    let exception;

    /**
     * Set error handle object.
     * 
     * @method setException
     * @public
     * @param {Object} ex
     */
    function setException(ex) {
        exception = ex;
    }

    /**
     * @property contextColMenu
     * @private
     * @type {String}
     */
    const contextColMenu = `<span class="it-table-context">
                    <a class="it-table-show-context btn btn-default btn-sm" href="#"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a>
                    <ul class="it-table-context-menu it-table-display-none">
                        <li class="it-table-add-col"><i class="fa fa-plus" aria-hidden="true"></i>&emsp;Add Col</li>
                        <li class="it-table-rm-col"><i class="fa fa-minus" aria-hidden="true"></i>&emsp;Del Col</li>
                        <li class="it-table-convert-col-th"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TH</li>
                        <li class="it-table-convert-col-td"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TD</li>
                        <li class="it-table-close-context"><i class="fa fa-times" aria-hidden="true"></i>&emsp;Close</li>
                    </ul>
                    </span>`;
    /**
     * @property contextRowMenu 
     * @private
     * @type {String}
     */
    const contextRowMenu = `<span class="it-table-context">
                    <a class="it-table-show-context btn btn-default btn-sm" href="#"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a>
                    <ul class="it-table-context-menu it-table-display-none">
                        <li class="it-table-add-row"><i class="fa fa-plus" aria-hidden="true"></i>&emsp;Add Row</li>
                        <li class="it-table-rm-row"><i class="fa fa-minus" aria-hidden="true"></i>&emsp;Del Row</li>
                        <li class="it-table-convert-row-th"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TH</li>
                        <li class="it-table-convert-row-td"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TD</li>
                        <li class="it-table-close-context"><i class="fa fa-times" aria-hidden="true"></i>&emsp;Close</li>
                    </ul>
                    </span>`;

    /**
     * Make table schema.
     *
     * @method makeSchema
     * @public
     * @param params
     *   @param {Object} params.schema jQuery object of that has it-table-schema class.
     *   @param {Number} params.rowsLength Number of row.
     *   @param {Number} params.colsLength Number of cols.
     * @returns {Object} jQuery object of that has it-table schema class.
     */
    function makeSchema( params ) {
        let schema = params.schema;
        const rowsLength = params.rowsLength;
        const colsLength = params.colsLength;
        if ( !rowsLength > 0 || !colsLength > 0 ) {
            exception.output( {
                message: 'Input th number greater than 0.',
                type: 'alert'
            } );
            return false;
        }

        // Make row for adding col.
        const head = $( '<div class="it-table-add-col-area">' );
        for ( var k = 0; k < colsLength; k++ ) {
            if ( k === 0 ) {
                $( '<span class="it-table-blank">&nbsp;</span>' ).appendTo( head );
            }
            $( contextColMenu ).appendTo( head );
        }
        head.appendTo( schema );

        // Make rows for table data.
        for ( var i = 0; i < rowsLength; i++ ) {
            var row = $( '<div class="it-table-row">' ).appendTo( schema );
            for ( var j = 0; j < colsLength; j++ ) {
                if ( j === 0 ) {
                    $( contextRowMenu ).appendTo( row );
                }
                var entryMarkup = `<span class="btn btn-default it-table-entry">
                                       Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                       <input type="hidden" name="content[]">
                                       <input type="hidden" name="th[]">
                                  </span>`;
                $( entryMarkup ).appendTo( row );
            }
        }
        $( 'input[name="showRowsLength"]' ).prop('disabled', true);
        $( 'input[name="showColsLength"]' ).prop('disabled', true);
        
        setHandler( schema );

        return schema;
    }

    /**
     * Set event handler that handle row and column.
     * 
     * @method setHandler
     * @public
     * @param {Object} schema jQuery object that identifies target.
     */
    function setHandler( schema ) {
        setRowHandler( schema );
        setColHandler( schema );
    }

    /**
     * Set event handler that handle row.
     *
     * @method setRowHandler
     * @private
     * @param {Object} schema jQuery object that identifies target.
     */
    function setRowHandler( schema ) {
        $( '.it-table-add-row', schema ).click( addRow );
        $( '.it-table-rm-row', schema ).click( removeRow );
        $( '.it-table-convert-row-th', schema ).click( convertRowToTh );
        $( '.it-table-convert-row-td', schema ).click( convertRowToTd );
    }

    /**
     * Set event Handler that handle column.
     *
     * @method setColHandler
     * @private
     * @param {Object} schema jQuery object that identifies target.
     */
    function setColHandler( schema ) {
        $( '.it-table-add-col', schema ).click( addCol( schema ) );
        $( '.it-table-rm-col', schema ).click( removeCol( schema ) );
        $( '.it-table-convert-col-th', schema ).click( convertColToTh( schema ) );
        $( '.it-table-convert-col-td', schema ).click( convertColToTd( schema ) );
    }

    /**
     * Show context menu.
     *
     * @method showContext
     * @public
     * @returns {boolean}
     */
    function showContext() {
        $( '.it-table-context-menu' ).remove( 'it-table-display' );
        $( '.it-table-context-menu' ).addClass( 'it-table-display-none' );
        const context = $( this ).next();
        context.removeClass( 'it-table-display-none' );
        context.addClass( 'it-table-display' );
        return false;
    }

    /**
     * Close context menu.
     *
     * @method closeContext
     * @public
     * @returns {boolean}
     */
    function closeContext() {
        const context = $( this ).parents( '.it-table-context-menu' );
        context.remove( 'it-table-display' );
        context.addClass( 'it-table-display-none' );
        return false;
    }

    /**
     * Add row.
     *
     * @method addRow
     * @private
     * @return {Boolean} false.
     */
    function addRow() {
        const row = $( this ).parents( '.it-table-row' );
        const menu = $( '.it-table-context-menu', row );
        menu.removeClass( 'it-table-display' );
        menu.addClass( 'it-table-display-none' );
        const addedRow = row.clone( true );
        const addedInput = $( 'input[name="content[]"]', addedRow );
        addedInput.val( '' );
        addedInput.parent().removeClass( 'it-table-th' );
        addedInput.parent().addClass( 'it-table-td' );
        addedInput.parent().removeClass( 'it-table-data-fill' );
        $( 'i', addedInput.parent() ).removeClass( 'fa-pencil-square' );
        $( 'i', addedInput.parent() ).addClass( 'fa-pencil-square-o' );
        $( 'input[name="th[]"]', addedRow ).val( 'false' );
        row.before( addedRow );
        incRowsLength();
        return false;
    }

    /**
     * Remove Row.
     *
     * @method removeRow
     * @private
     * @return {Boolean}
     */
    function removeRow() {
        if ( $( '.it-table-row' ).length < 2 ) {
            return false;
        }
        const row = $( this ).parents( '.it-table-row' );
        row.remove();
        decRowsLength();
        return false;
    }

    /**
     * Convert row to th (Table Header).
     *
     * @method convertRowToTh
     * @private
     * @return {Boolean}
     */
    function convertRowToTh() {
        const row = $( this ).parents( '.it-table-row' );
        const data = $( 'input[name="th[]"]', row );
        const menu = $( '.it-table-context-menu', row );
        data.each( function () {
            $( this ).val( 'true' );
            $( this ).parent().removeClass( 'it-table-td' );
            $( this ).parent().addClass( 'it-table-th' )

        } );
        menu.removeClass( 'it-table-display' );
        menu.addClass( 'it-table-display-none' );
        return false;
    }

    /**
     * Convert row to td (Table Data.
     *
     * @method convertRowToTd
     * @private
     * @return {Boolean}
     */
    function convertRowToTd() {
        const row = $( this ).parents( '.it-table-row' );
        const data = $( 'input[name="th[]"]', row );
        const menu = $( '.it-table-context-menu', row );
        data.each( function () {
            $( this ).val( 'false' );
            $( this ).parent().removeClass( 'it-table-th' );
            $( this ).parent().addClass( 'it-table-td' );
        } );
        menu.removeClass( 'it-table-display' );
        menu.addClass( 'it-table-display-none' );
        return false;
    }

    /**
     * Add column.
     *
     * @method addCol
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function addCol( schema ) {
        return function () {
            const rowsLength = $( 'div', schema ).length;
            const colsLength = $( 'div:first-child span', schema ).length;
            const index = getIndex( $( this ).parents( '.it-table-context' ), '.it-table-add-col-area span' );
            for ( var i = 0; i < rowsLength; i++ ) {
                const row = schema.children().eq( i );
                for ( var j = 0; j < colsLength; j++ ) {
                    if ( j === index ) {
                        if ( i === 0 ) {
                            $( '.it-table-context-menu', row ).removeClass( 'it-table-display' );
                            $( '.it-table-context-menu', row ).addClass( 'it-table-display-none' );
                        }
                        const col = row.children().eq( j );
                        const addedCol = col.clone( true );
                        $( 'input[name="content[]"]', addedCol ).val( '' );
                        $( 'input[name="th[]"]', addedCol ).val( 'false' );
                        if ( j > 0 && i !== 0) {
                            $( 'i', addedCol ).removeClass( 'fa fa-pencil-square' );
                            $( 'i', addedCol ).addClass( 'fa fa-pencil-square-o' );
                        }
                        addedCol.removeClass( 'it-table-th' );
                        addedCol.addClass( 'it-table-td' );
                        addedCol.removeClass( 'it-table-data-fill' );
                        col.before( addedCol );
                    }
                }
            }
            incColsLength();
            return false;
        }
    }

    /**
     * Remove column.
     *
     * @method removeCol
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function removeCol( schema ) {
        return function () {
            const rowsLength = $( 'div', schema ).length;
            const colsLength = $( 'div:first-child span', schema ).length;
            if ( colsLength <= 2 ) {
                return false;
            }
            const index = getIndex( $( this ).parents( '.it-table-context' ), '.it-table-add-col-area span' );
            for ( var i = 0; i < rowsLength; i++ ) {
                const row = schema.children().eq( i );
                for ( var j = 0; j < colsLength; j++ ) {
                    if ( j === index ) {
                        const col = row.children().eq( j );
                        col.remove();
                    }
                }
            }
            decColsLength();
            return false;
        }
    }

    /**
     * Convert column to th.
     *
     * @method convertColToTh
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function convertColToTh( schema ) {
        return function () {
            const rowsLength = $( 'div', schema ).length;
            const colsLength = $( 'div:first-child span', schema ).length;
            const index = getIndex( $( this ).parents( '.it-table-context' ), '.it-table-add-col-area span' );
            for ( var i = 0; i < rowsLength; i++ ) {
                const row = schema.children().eq( i );
                for ( var j = 0; j < colsLength; j++ ) {
                    if ( j === index ) {
                        if ( i === 0 ) {
                            $( '.it-table-context-menu', row ).removeClass( 'it-table-display' );
                            $( '.it-table-context-menu', row ).addClass( 'it-table-display-none' );
                        }
                        const col = row.children().eq( j );
                        const input = $( 'input[name="th[]"]', col );

                        input.val( 'true' );
                        input.parent().removeClass( 'it-table-td' );
                        input.parent().addClass( 'it-table-th' )
                    }
                }
            }
            return false;
        }
    }

    /**
     * Convert column to td.
     *
     * @method convertColToTd
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function convertColToTd( schema ) {
        return function () {
            const rowsLength = $( 'div', schema ).length;
            const colsLength = $( 'div:first-child span', schema ).length;
            const index = getIndex( $( this ).parents( '.it-table-context' ), '.it-table-add-col-area span' );
            for ( var i = 0; i < rowsLength; i++ ) {
                const row = schema.children().eq( i );
                for ( var j = 0; j < colsLength; j++ ) {
                    if ( j === index ) {
                        if ( i === 0 ) {
                            $( '.it-table-context-menu', row ).removeClass( 'it-table-display' );
                            $( '.it-table-context-menu', row ).addClass( 'it-table-display-none' );
                        }
                        const col = row.children().eq( j );
                        const input = $( 'input[name="th[]"]', col );
                        input.val( 'false' );
                        input.parent().removeClass( 'it-table-th' );
                        input.parent().addClass( 'it-table-td' );
                    }
                }
            }
            return false;
        }
    }

    /**
     * Row length increment.
     *
     * @method incRowsLength
     * @private
     */
    function incRowsLength() {
        const rowsLength = $( 'input[name="rowsLength"]' );
        const showRowsLength = $( 'input[name="showRowsLength"]' );
        rowsLength.val( parseInt( rowsLength.val(), 10 ) + 1 );
        showRowsLength.prop( 'disabled', false );
        showRowsLength.val( parseInt( rowsLength.val(), 10 ) );
        showRowsLength.prop( 'disabled', true );
    }

    /**
     * Row length decrement.
     *
     * @method decRowsLength
     * @private
     */
    function decRowsLength() {
        let rowsLength = $( 'input[name="rowsLength"]' );
        const showRowsLength = $( 'input[name="showRowsLength"]' );
        rowsLength.val( parseInt( rowsLength.val(), 10 ) - 1 );
        showRowsLength.prop( 'disabled', false );
        showRowsLength.val( parseInt( rowsLength.val(), 10 ) );
        showRowsLength.prop( 'disabled', true );
    }

    /**
     * Column length increment.
     *
     * @method incColsLength
     * @private
     */
    function incColsLength() {
        const colsLength = $( 'input[name="colsLength"]' );
        const showColsLength = $( 'input[name="showColsLength"]' );
        colsLength.val( parseInt( colsLength.val(), 10 ) + 1 );
        showColsLength.prop( 'disabled', false );
        showColsLength.val( parseInt( colsLength.val(), 10 ) );
        showColsLength.prop( 'disabled', true );
    }

    /**
     * Column length decrement.
     *
     * @method decColsLength
     * @private
     */
    function decColsLength() {
        const colsLength = $( 'input[name="colsLength"]' );
        const showColsLength = $( 'input[name="showColsLength"]' );
        colsLength.val( parseInt( colsLength.val(), 10 ) - 1 );
        showColsLength.prop( 'disabled', false );
        showColsLength.val( parseInt( colsLength.val(), 10 ) );
        showColsLength.prop( 'disabled', true );
    }

    /**
     * Get index for parent element.
     *
     * @method getIndex
     * @private
     * @param {jQuery} target Child element.
     * @param {String} selector css selector of Parent element.
     * @return {Number}
     */
    function getIndex( target, selector ) {
        return $( selector ).index( target );
    }

    return {
        makeSchema: makeSchema,
        showContext: showContext,
        closeContext: closeContext,
        setHandler: setHandler,
        setException: setException
    };
}());
