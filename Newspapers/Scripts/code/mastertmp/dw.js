
/*
'<div class="page-paper-inner-head">',
'Товар відділу: {name}',
'</div>',
'<div class="page-paper-inner-bottom">{id}</div>',
*/

var getDataViewPageCells = function () {
    var dw = new Ext.create({
        id: 'viewPageCells',
        xtype: 'dataview',
        layout: 'fit',
        margin: 5,
        store: getStorePageCells(),
        autoScroll: true,
        tpl: [
            '<tpl for=".">',
                '<div class="conteiner-depart-cell">',
                    '<div class="conteiner-depart-cell-fill"></div>',
                '</div>',
            '</tpl>'],
        singleSelect: true,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.conteiner-depart-cell',
        emptyText: 'No images to display',
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dw.getSelection();
                    if (selected.length > 0) {
                        var record = selected[0];
                        var data = record.data;

                        getWinFillCell(record).show();
                    }                                        
                }
            },
        }
    });

    return dw;
}

/*
var getgridtmp = function (pnls) {

    var p = pnls;

    var gridtmp = Ext.create('Ext.panel.Panel',
     {
         xtype: 'panel',
         flex: 1,
         padding: 5,
         layout: {
             type: 'vbox',
             pack: 'start',
             align: 'stretch'
         },
         items: [
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_1',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     var pc = this;
                                     articuledit(p, pc);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_2',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_3',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_4',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_5',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_6',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_7',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_8',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_9',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_10',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_11',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_12',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             }
         ]
     });

    return gridtmp;
}
*/