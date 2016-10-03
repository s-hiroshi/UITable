(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @module UITable
 */
/**
 * Handle error, exception
 *
 * @class customException
 */
exports.default = function () {
    var containerSelector = '.it-table-alert';

    function getContainerSelector() {
        return containerSelector;
    }

    function setContainerSelector(selector) {
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
    function output(e) {
        var container = $(containerSelector);
        container.text(e.message);
        container.addClass('bg-danger');
        container.css({ 'display': 'block' });
    }

    /**
     * Close output container
     *
     * @method close
     * @return boolean
     */
    function close() {
        $(this).parent().fadeOut('slow');
        return false;
    }

    return {
        getContainerSelector: getContainerSelector,
        setContainerSelector: setContainerSelector,
        output: output,
        close: close
    };
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @module UITable
 */
/**
 * Handle table data.
 *
 * @class entry
 */
exports.default = function () {
    /**
     * Target of processing.
     *
     * @property
     * @type {Object}
     */
    var current = void 0;

    /**
     * Write content to input hidden value.
     *
     * @method save
     * @public
     */
    function save() {
        var data = $('#it-table-editor-content').val();
        var content = $(current).children('input[name="content[]"]');
        if (data !== '') {
            content.parent().removeClass('it-table-data-empty');
            content.parent().addClass('it-table-data-fill');
            $('i', content.parent()).removeClass('fa-pencil-square-o');
            $('i', content.parent()).addClass('fa-pencil-square');
        }
        if (data === '') {
            content.parent().removeClass('it-table-data-fill');
            content.parent().addClass('it-table-data-empty');
            $('i', content.parent()).removeClass('fa-pencil-square');
            $('i', content.parent()).addClass('fa-pencil-square-o');
        }
        content.val(data);
        $('#it-table-entry-dialog').dialog('destroy');
        return false;
    }

    /**
     * Read content from input hidden value.
     *
     * @method edit
     * @public
     */
    function edit() {
        current = this;
        var content = $('input[name="content[]"]', this);
        $('#it-table-editor-content').val(content.val());
        $('#it-table-entry-dialog').dialog();
        return false;
    }

    return {
        edit: edit,
        save: save
    };
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @module UITable
 */
/**
 * Handle table preview.
 *
 * @class preview
 */
exports.default = function () {
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
    function preview(params) {
        var data = params.data;
        var th = params.th;
        var rowsLength = params.rowsLength;
        var colsLength = params.colsLength;
        var previewTable = $('<table class="preview-table">');
        for (var i = 0; i < rowsLength; i++) {
            var row = $('<tr>').appendTo(previewTable);
            for (var j = 0; j < colsLength; j++) {
                if (th[i * colsLength + j] === 'true') {
                    $('<th>' + filterBr(data[i * colsLength + j]) + '</th>').appendTo(row);
                } else {
                    $('<td>' + filterBr(data[i * colsLength + j]) + '</td>').appendTo(row);
                }
            }
        }
        return previewTable;
    }

    /**
     * Convert Line Break to br tag.
     *
     * @param {String} data Input data.
     * @returns {String}
     */
    function filterBr(data) {
        return data.replace(/\n/g, '<br>');
    }

    return {
        preview: preview
    };
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Handle table schema.
 *
 * @class schema
 */
exports.default = function () {

    /**
     * @property exception
     * @public
     * @type {object}
     */
    var exception = void 0;

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
    var contextColMenu = '<span class="it-table-context">\n                    <a class="it-table-show-context btn btn-default btn-sm" href="#"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a>\n                    <ul class="it-table-context-menu it-table-display-none">\n                        <li class="it-table-add-col"><i class="fa fa-plus" aria-hidden="true"></i>&emsp;Add Col</li>\n                        <li class="it-table-rm-col"><i class="fa fa-minus" aria-hidden="true"></i>&emsp;Del Col</li>\n                        <li class="it-table-convert-col-th"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TH</li>\n                        <li class="it-table-convert-col-td"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TD</li>\n                        <li class="it-table-close-context"><i class="fa fa-times" aria-hidden="true"></i>&emsp;Close</li>\n                    </ul>\n                    </span>';
    /**
     * @property contextRowMenu 
     * @private
     * @type {String}
     */
    var contextRowMenu = '<span class="it-table-context">\n                    <a class="it-table-show-context btn btn-default btn-sm" href="#"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a>\n                    <ul class="it-table-context-menu it-table-display-none">\n                        <li class="it-table-add-row"><i class="fa fa-plus" aria-hidden="true"></i>&emsp;Add Row</li>\n                        <li class="it-table-rm-row"><i class="fa fa-minus" aria-hidden="true"></i>&emsp;Del Row</li>\n                        <li class="it-table-convert-row-th"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TH</li>\n                        <li class="it-table-convert-row-td"><i class="fa fa-arrow-right" aria-hidden="true"></i>&emsp;TD</li>\n                        <li class="it-table-close-context"><i class="fa fa-times" aria-hidden="true"></i>&emsp;Close</li>\n                    </ul>\n                    </span>';

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
    function makeSchema(params) {
        var schema = params.schema;
        var rowsLength = params.rowsLength;
        var colsLength = params.colsLength;
        if (!rowsLength > 0 || !colsLength > 0) {
            exception.output({
                message: '0以上の値を入力してください。',
                type: 'alert'
            });
            return false;
        }

        // Make row for adding col.
        var head = $('<div class="it-table-add-col-area">');
        for (var k = 0; k < colsLength; k++) {
            if (k === 0) {
                $('<span class="it-table-blank">&nbsp;</span>').appendTo(head);
            }
            $(contextColMenu).appendTo(head);
        }
        head.appendTo(schema);

        // Make rows for table data.
        for (var i = 0; i < rowsLength; i++) {
            var row = $('<div class="it-table-row">').appendTo(schema);
            for (var j = 0; j < colsLength; j++) {
                if (j === 0) {
                    $(contextRowMenu).appendTo(row);
                }
                var entryMarkup = '<span class="btn btn-default it-table-entry">\n                                       Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n                                       <input type="hidden" name="content[]">\n                                       <input type="hidden" name="th[]">\n                                  </span>';
                $(entryMarkup).appendTo(row);
            }
        }
        $('input[name="showRowsLength"]').prop('disabled', true);
        $('input[name="showColsLength"]').prop('disabled', true);

        setHandler(schema);

        return schema;
    }

    /**
     * Set event handler that handle row and column.
     * 
     * @method setHandler
     * @public
     * @param {Object} schema jQuery object that identifies target.
     */
    function setHandler(schema) {
        setRowHandler(schema);
        setColHandler(schema);
    }

    /**
     * Set event handler that handle row.
     *
     * @method setRowHandler
     * @private
     * @param {Object} schema jQuery object that identifies target.
     */
    function setRowHandler(schema) {
        $('.it-table-add-row', schema).click(addRow);
        $('.it-table-rm-row', schema).click(removeRow);
        $('.it-table-convert-row-th', schema).click(convertRowToTh);
        $('.it-table-convert-row-td', schema).click(convertRowToTd);
    }

    /**
     * Set event Handler that handle column.
     *
     * @method setColHandler
     * @private
     * @param {Object} schema jQuery object that identifies target.
     */
    function setColHandler(schema) {
        $('.it-table-add-col', schema).click(addCol(schema));
        $('.it-table-rm-col', schema).click(removeCol(schema));
        $('.it-table-convert-col-th', schema).click(convertColToTh(schema));
        $('.it-table-convert-col-td', schema).click(convertColToTd(schema));
    }

    /**
     * Show context menu.
     *
     * @method showContext
     * @public
     * @returns {boolean}
     */
    function showContext() {
        $('.it-table-context-menu').remove('it-table-display');
        $('.it-table-context-menu').addClass('it-table-display-none');
        var context = $(this).next();
        context.removeClass('it-table-display-none');
        context.addClass('it-table-display');
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
        var context = $(this).parents('.it-table-context-menu');
        context.remove('it-table-display');
        context.addClass('it-table-display-none');
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
        var row = $(this).parents('.it-table-row');
        var menu = $('.it-table-context-menu', row);
        menu.removeClass('it-table-display');
        menu.addClass('it-table-display-none');
        var addedRow = row.clone(true);
        var addedInput = $('input[name="content[]"]', addedRow);
        addedInput.val('');
        addedInput.parent().removeClass('it-table-th');
        addedInput.parent().addClass('it-table-td');
        addedInput.parent().removeClass('it-table-data-fill');
        $('i', addedInput.parent()).removeClass('fa-pencil-square');
        $('i', addedInput.parent()).addClass('fa-pencil-square-o');
        $('input[name="th[]"]', addedRow).val('false');
        row.before(addedRow);
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
        if ($('.it-table-row').length < 2) {
            return false;
        }
        var row = $(this).parents('.it-table-row');
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
        var row = $(this).parents('.it-table-row');
        var data = $('input[name="th[]"]', row);
        var menu = $('.it-table-context-menu', row);
        data.each(function () {
            $(this).val('true');
            $(this).parent().removeClass('it-table-td');
            $(this).parent().addClass('it-table-th');
        });
        menu.removeClass('it-table-display');
        menu.addClass('it-table-display-none');
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
        var row = $(this).parents('.it-table-row');
        var data = $('input[name="th[]"]', row);
        var menu = $('.it-table-context-menu', row);
        data.each(function () {
            $(this).val('false');
            $(this).parent().removeClass('it-table-th');
            $(this).parent().addClass('it-table-td');
        });
        menu.removeClass('it-table-display');
        menu.addClass('it-table-display-none');
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
    function addCol(schema) {
        return function () {
            var rowsLength = $('div', schema).length;
            var colsLength = $('div:first-child span', schema).length;
            var index = getIndex($(this).parents('.it-table-context'), '.it-table-add-col-area span');
            for (var i = 0; i < rowsLength; i++) {
                var row = schema.children().eq(i);
                for (var j = 0; j < colsLength; j++) {
                    if (j === index) {
                        if (i === 0) {
                            $('.it-table-context-menu', row).removeClass('it-table-display');
                            $('.it-table-context-menu', row).addClass('it-table-display-none');
                        }
                        var col = row.children().eq(j);
                        var addedCol = col.clone(true);
                        $('input[name="content[]"]', addedCol).val('');
                        $('input[name="th[]"]', addedCol).val('false');
                        if (j > 0 && i !== 0) {
                            $('i', addedCol).removeClass('fa fa-pencil-square');
                            $('i', addedCol).addClass('fa fa-pencil-square-o');
                        }
                        addedCol.removeClass('it-table-th');
                        addedCol.addClass('it-table-td');
                        addedCol.removeClass('it-table-data-fill');
                        col.before(addedCol);
                    }
                }
            }
            incColsLength();
            return false;
        };
    }

    /**
     * Remove column.
     *
     * @method removeCol
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function removeCol(schema) {
        return function () {
            var rowsLength = $('div', schema).length;
            var colsLength = $('div:first-child span', schema).length;
            if (colsLength <= 2) {
                return false;
            }
            var index = getIndex($(this).parents('.it-table-context'), '.it-table-add-col-area span');
            for (var i = 0; i < rowsLength; i++) {
                var row = schema.children().eq(i);
                for (var j = 0; j < colsLength; j++) {
                    if (j === index) {
                        var col = row.children().eq(j);
                        col.remove();
                    }
                }
            }
            decColsLength();
            return false;
        };
    }

    /**
     * Convert column to th.
     *
     * @method convertColToTh
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function convertColToTh(schema) {
        return function () {
            var rowsLength = $('div', schema).length;
            var colsLength = $('div:first-child span', schema).length;
            var index = getIndex($(this).parents('.it-table-context'), '.it-table-add-col-area span');
            for (var i = 0; i < rowsLength; i++) {
                var row = schema.children().eq(i);
                for (var j = 0; j < colsLength; j++) {
                    if (j === index) {
                        if (i === 0) {
                            $('.it-table-context-menu', row).removeClass('it-table-display');
                            $('.it-table-context-menu', row).addClass('it-table-display-none');
                        }
                        var col = row.children().eq(j);
                        var input = $('input[name="th[]"]', col);

                        input.val('true');
                        input.parent().removeClass('it-table-td');
                        input.parent().addClass('it-table-th');
                    }
                }
            }
            return false;
        };
    }

    /**
     * Convert column to td.
     *
     * @method convertColToTd
     * @private
     * @param {Object} schema jQuery object of that has it-table-schema class.
     * @return {Function}
     */
    function convertColToTd(schema) {
        return function () {
            var rowsLength = $('div', schema).length;
            var colsLength = $('div:first-child span', schema).length;
            var index = getIndex($(this).parents('.it-table-context'), '.it-table-add-col-area span');
            for (var i = 0; i < rowsLength; i++) {
                var row = schema.children().eq(i);
                for (var j = 0; j < colsLength; j++) {
                    if (j === index) {
                        if (i === 0) {
                            $('.it-table-context-menu', row).removeClass('it-table-display');
                            $('.it-table-context-menu', row).addClass('it-table-display-none');
                        }
                        var col = row.children().eq(j);
                        var input = $('input[name="th[]"]', col);
                        input.val('false');
                        input.parent().removeClass('it-table-th');
                        input.parent().addClass('it-table-td');
                    }
                }
            }
            return false;
        };
    }

    /**
     * Row length increment.
     *
     * @method incRowsLength
     * @private
     */
    function incRowsLength() {
        var rowsLength = $('input[name="rowsLength"]');
        var showRowsLength = $('input[name="showRowsLength"]');
        rowsLength.val(parseInt(rowsLength.val(), 10) + 1);
        showRowsLength.prop('disabled', false);
        showRowsLength.val(parseInt(rowsLength.val(), 10));
        showRowsLength.prop('disabled', true);
    }

    /**
     * Row length decrement.
     *
     * @method decRowsLength
     * @private
     */
    function decRowsLength() {
        var rowsLength = $('input[name="rowsLength"]');
        var showRowsLength = $('input[name="showRowsLength"]');
        rowsLength.val(parseInt(rowsLength.val(), 10) - 1);
        showRowsLength.prop('disabled', false);
        showRowsLength.val(parseInt(rowsLength.val(), 10));
        showRowsLength.prop('disabled', true);
    }

    /**
     * Column length increment.
     *
     * @method incColsLength
     * @private
     */
    function incColsLength() {
        var colsLength = $('input[name="colsLength"]');
        var showColsLength = $('input[name="showColsLength"]');
        colsLength.val(parseInt(colsLength.val(), 10) + 1);
        showColsLength.prop('disabled', false);
        showColsLength.val(parseInt(colsLength.val(), 10));
        showColsLength.prop('disabled', true);
    }

    /**
     * Column length decrement.
     *
     * @method decColsLength
     * @private
     */
    function decColsLength() {
        var colsLength = $('input[name="colsLength"]');
        var showColsLength = $('input[name="showColsLength"]');
        colsLength.val(parseInt(colsLength.val(), 10) - 1);
        showColsLength.prop('disabled', false);
        showColsLength.val(parseInt(colsLength.val(), 10));
        showColsLength.prop('disabled', true);
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
    function getIndex(target, selector) {
        return $(selector).index(target);
    }

    return {
        makeSchema: makeSchema,
        showContext: showContext,
        closeContext: closeContext,
        setHandler: setHandler,
        setException: setException
    };
}();

},{}],5:[function(require,module,exports){
'use strict';

var _TableSchema = require('./TableSchema.js');

var _TableSchema2 = _interopRequireDefault(_TableSchema);

var _TableEntry = require('./TableEntry.js');

var _TableEntry2 = _interopRequireDefault(_TableEntry);

var _TablePreview = require('./TablePreview.js');

var _TablePreview2 = _interopRequireDefault(_TablePreview);

var _Exception = require('./Exception.js');

var _Exception2 = _interopRequireDefault(_Exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TableSchema2.default.setException(_Exception2.default);

var table = $('.it-table');
var schema = $('.it-table-schema');
var rows = $('.it-table-toolbar-rows');
var cols = $('.it-table-toolbar-cols');
var btnMaker = $('.it-table-toolbar-make');
var btnPreview = $('.it-table-toolbar-preview');

// Make sure one dialog.
if ($('#it-table-entry-dialog').length < 1) {
    var editor = '<div id="it-table-entry-dialog" title="Edit data.">\n                        <div class="form-group">\n                            <textarea id="it-table-editor-content" class="form-control"></textarea>\n                        </div>\n                        <div>\n                            <button class="btn btn-default btn-block it-table-entry-save">Save Data</button>\n                        </div>\n                    </div>\n                    <!-- #it-table-entry-dialog -->';
    $(editor).appendTo(table);
}

// Set toolbar action
rows.on('change', function () {
    $('input[name="rowsLength"]').val(parseInt($(this).val(), 10));
});

cols.on('change', function () {
    $('input[name="colsLength"]').val(parseInt($(this).val(), 10));
});

// Make table schema.
btnMaker.on('click', function () {
    $('.it-table-schema').empty();
    $('.it-table-alert').css({ 'display': 'none' });
    var result = _TableSchema2.default.makeSchema({
        schema: schema,
        rowsLength: parseInt($('input[name="rowsLength"]').val(), 10),
        colsLength: parseInt($('input[name="colsLength"]').val(), 10)
    });
    if (result !== false) $(this).prop('disabled', true);
    return false;
});

// Preview table.
btnPreview.on('click', function () {
    var data = [];
    var th = [];
    var thData = $('input[name="th[]"]');
    var entryData = $('input[name="content[]"]');
    entryData.each(function (i) {
        data[i] = $(this).val();
    });
    thData.each(function (i) {
        th[i] = $(this).val();
    });
    var preview = $('.preview-table');
    if (preview.children().length > 0) {
        preview.remove();
    }
    var previewTable = _TablePreview2.default.preview({
        data: data,
        th: th,
        rowsLength: parseInt(rows.val(), 10),
        colsLength: parseInt(cols.val(), 10)
    });
    previewTable.appendTo(table);
    return false;
});

// Set event handler.
$(document).on('click', '.it-table-show-context', _TableSchema2.default.showContext);
$(document).on('click', '.it-table-close-context', _TableSchema2.default.closeContext);
$(document).on('click', '.it-table-entry', _TableEntry2.default.edit);
$(document).on('click', '.it-table-entry-save', _TableEntry2.default.save);
$(document).on('click', function () {
    $('.it-table-context-menu').removeClass('it-table-display');
    $('.it-table-context-menu').addClass('it-table-display-none');
});

if (schema.children().length > 0) {
    $(_TableSchema2.default.setHandler(schema));
}

},{"./Exception.js":1,"./TableEntry.js":2,"./TablePreview.js":3,"./TableSchema.js":4}]},{},[5]);
