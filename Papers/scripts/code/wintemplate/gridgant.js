
var gridgant_model = Ext.define('gridgant_model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'g1',
        type: 'string'
    }, {
        name: 'g2',
        type: 'string'
    }, {
        name: 'g3',
        type: 'string'
    }, {
        name: 'g4',
        type: 'string'
    }, {
        name: 'g5',
        type: 'string'
    }, {
        name: 'g6',
        type: 'string'
    }, {
        name: 'g7',
        type: 'string'
    }]
});

var gridgant_store = Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    model: gridgant_model,
    data: [
        { "id": "1", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "2", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "3", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "4", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "5", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "6", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "7", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "8", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "9", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" },
        { "id": "10", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "" }
    ]
});

var gridgant_columns = function (finish, start) {

    var columns = [
        {
            dataIndex: 'id',
            text: 'Створено',
            xtype: 'datecolumn',
            width: 90,
            hidden: true
        }
        , { dataIndex: 'g1', width: 30 }
        , { dataIndex: 'g2', width: 30 }
        , { dataIndex: 'g3', width: 30 }
        , { dataIndex: 'g4', width: 30 }
        , { dataIndex: 'g5', width: 30 }
        , { dataIndex: 'g6', width: 30 }
        , { dataIndex: 'g7', width: 30 }
    ];

    return columns.slice(start || 0, finish);
};

var current_col = 0;

var gridgant = Ext.create('Ext.grid.Panel', {
    id: 'gridgant',
    stateful: true,
    stateId: 'stateful-filter-grid',
    border: false,
    store: gridgant_store,
    columns: gridgant_columns(8),
    //plugins: 'gridfilters',
    loadMask: true,
    hideHeaders: true
    //viewConfig: {
    //    getRowClass: function (record, rowIndex) {
    //        //var c = record.get('change');
    //        //if (c < 0) {
    //        //    return 'price-fall';
    //        //} else if (c > 0) {
    //        //    return 'price-rise';
    //        //}            
    //        if (record.id == '10') {
    //            //if (colIndex > 3)
    //            //return 'cell-red-run';
    //            current_col++;
    //        }

    //        if (record.id == 1) {
    //            if (current_col == 2) {
    //                return 'cell-red-run';
    //            }
    //        }
    //    }
    //}
    //renderTo: Ext.getBody()

});
