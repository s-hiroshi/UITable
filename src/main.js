import tableSchema from './TableSchema.js';
import tableEntry from './TableEntry.js';
import tablePreview from './TablePreview.js';
import tableAlert from './TableAlert.js';

tableSchema.setAlert(tableAlert);

const table = $( '.it-table' );
const schema = $( '.it-table-schema' );
const rows = $( '.it-table-toolbar-rows' );
const cols = $( '.it-table-toolbar-cols' );
const btnMaker = $( '.it-table-toolbar-make' );
const btnPreview = $( '.it-table-toolbar-preview' );

// Make sure one dialog.
if ( $( '#it-table-entry-dialog' ).length < 1 ) {
    const editor = `<div id="it-table-entry-dialog" title="Edit data.">
                        <div class="form-group">
                            <textarea id="it-table-editor-content" class="form-control"></textarea>
                        </div>
                        <div class="it-table-text-right">
                            <button class="btn btn-success it-table-entry-save">Save Data</button>
                        </div>
                    </div>
                    <!-- #it-table-entry-dialog -->`;
    $( editor ).appendTo( table )
}

// Set toolbar action
rows.on( 'change', function () {
    $( 'input[name="rowsLength"]' ).val( parseInt( $( this ).val(), 10 ) );
} );

cols.on( 'change', function () {
    $( 'input[name="colsLength"]' ).val( parseInt( $( this ).val(), 10 ) );
} );

// Make table schema.
btnMaker.on( 'click', function () {
    $( '.it-table-schema' ).empty();
    $( '.it-table-alert' ).css( { 'display': 'none' } );
    let result = tableSchema.makeSchema( {
        schema: schema,
        rowsLength: parseInt( $( 'input[name="rowsLength"]' ).val(), 10 ),
        colsLength: parseInt( $( 'input[name="colsLength"]' ).val(), 10 )
    } );
    if ( result !== false ) {
        $( this ).prop( 'disabled', true );
    }
    return false;
} );

// Preview table.
btnPreview.on( 'click', function () {
    let data = [];
    let th = [];
    let thData = $( ('input[name="th[]"]') );
    let entryData = $( 'input[name="content[]"]' );
    entryData.each( function ( i ) {
        data[i] = $( this ).val();
    } );
    thData.each( function ( i ) {
        th[i] = $( this ).val();
    } );
    let preview = $( '.it-table-preview' );
    if ( preview.children().length > 0 ) {
        preview.remove();
    }
    var previewTable = tablePreview.preview( {
        data: data,
        th: th,
        rowsLength: parseInt( rows.val(), 10 ),
        colsLength: parseInt( cols.val(), 10 )
    } );
    previewTable.appendTo( table );
    return false;
} );

// Set event handler.
$( document ).on( 'click', '.it-table-show-context', tableSchema.showContext );
$( document ).on( 'click', '.it-table-close-context', tableSchema.closeContext );
$( document ).on( 'click', '.it-table-entry', tableEntry.edit );
$( document ).on( 'click', '.it-table-entry-save', tableEntry.save );
$( document ).on( 'click', function () {
    $( '.it-table-context-menu' ).removeClass( 'it-table-display' );
    $( '.it-table-context-menu' ).addClass( 'it-table-display-none' );
} );

if ( schema.children().length > 0 ) {
    $( tableSchema.setHandler( schema ) );
}

