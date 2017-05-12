import assert from 'power-assert';
import tableSchema from '../src/tableSchema.js';
global.document = require( 'jsdom' ).jsdom( '<html><div class="it-table-schema"></div></html>' );
global.window = document.defaultView;
global.$ = require( 'jquery' );

/** @test {TableSchema} */
describe( 'Schema', () => {
    /** @test {TableSchema#makeTable} */
    describe( 'makeTable', () => {
        it( 'Return 6 element that has it-table-entry class when input 2 to row, input 3 column.', () => {
            global.$( '.it-table.schema' ).empty();
            const params = {
                "schema": global.$( '.it-table-schema' ),
                "rowsLength": 2,
                "colsLength": 3
            };
            const schema = tableSchema.makeSchema( params );
            assert( global.$( ".it-table-entry", schema ).length === 6 );
        } );
    } );
    /** @test {TableSchema#addRow} */
    describe( 'Add row', () => {
        it( 'Return 9 element that has it-table-entry class when Click Add Row then.', () => {
            const schema = global.$( '.it-table-schema' );
            global.$( '.it-table-add-row:first', schema ).click();
            assert( global.$( ".it-table-entry", schema ).length === 9 );
        } );
    } );
    /** @test {TableSchema#removeRow} */
    // describe( 'Remove row', () => {
    //     it( 'Return 6 element that has it-table-entry class when Click Del Row.', () => {
    //         const schema = global.$( '.it-table-schema' );
    //         global.$( '.it-table-rm-row:first', schema ).click();
    //         assert( global.$( ".it-table-entry", schema ).length === 6 );
    //     } );
    // } );
    /** @test {TableSchema#addCol} */
    // describe( 'addCol', () => {
    //     it( 'Return 8 element that has it-table-entry class when Click Add Col.', () => {
    //         const schema = global.$( '.it-table-schema' );
    //         global.$( '.it-table-add-col:first', schema ).click();
    //         assert( global.$( ".it-table-entry", schema ).length === 8 );
    //     } );
    // } );
    /** @test {TableSchema#removeCol} */
    // describe( 'removeCol', () => {
    //     it( 'Return 6 element that has it-table-entry class when Click Del Col.', () => {
    //         const schema = global.$( '.it-table-schema' );
    //         global.$( '.it-table-rm-col:first', schema ).click();
    //         assert( global.$( ".it-table-entry", schema ).length === 6 );
    //     } );
    // } );
} );