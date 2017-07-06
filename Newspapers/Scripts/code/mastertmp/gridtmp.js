
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
