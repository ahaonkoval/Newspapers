

var getGridGoods = function (store, stSizes) {
    var storeSizes = stSizes;

    var goodgridCellEditing = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    });

    var cmbGoodSize = new Ext.form.field.ComboBox({
        //id: 'cmbGoodSize',
        displayField: 'Name',
        valueField: 'SizeId',
        editable: false,
        store: storeSizes
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: [
            {
                dataIndex: 'Number',
                text: '#',
                width: 70,
            }
            ,
            //{
            //    dataIndex: 'Name',
            //    width: 150,
            //    text: 'Назва',
            //    flex: 1,
            //}
            {
                text: 'Button',
                width: 105,
                //xtype: 'actioncolumn',//'widgetcolumn',
                dataIndex: 'Name',
                flex: 1,
                editor: {
                    allowBlank: false
                }
                //widget: {
                //    //width: 90,
                //    //height: 17,
                //    textAlign: 'left',
                //    xtype: 'textfield',
                //    iconCls: 'widget-grid-user',
                //    disabled: true,
                //    listeners: {
                //        dblclick: {
                //            fn: function (a, b, c, d) {
                //                //console.log("double click");
                //                //var s = grid.getSelection();
                //                alert(rc.get('Name'));
                //            },
                //            // You can also pass 'body' if you don't want click on the header or
                //            // docked elements
                //            element: 'el',
                //            scope: this
                //        }
                //    }
                //    //editable: false,
                //    //handler: function (a, b, c) {
                //    //    alert(rc.get('Name'));
                //    //}
                //}
            }
            ,
            {
                dataIndex: 'Keywords', width: 150, text: 'Ключові слова',
                editor: {
                    allowBlank: false
                }
            }
            , {
                text: 'Розміри',
                width: 120,
                dataIndex: 'SizeId',
                editor: cmbGoodSize,
                renderer: function (value, a1, a2) {
                    //var st = getStoreCellSizes();
                    var c = cmbGoodSize; //Ext.getCmp('cmbGoodSize');
                    var st = storeSizes;//c.getStore();
                    if (value) {
                        if (Number.isInteger(value)) {
                            recordIndex = st.find('SizeId', value);
                        }
                        return st.getAt(recordIndex).get('Name'); //value;
                    } else {
                        return '';
                    }
                    //return value;
                }
            }

        ],
        loadMask: true,
        listeners : {
            itemdblclick: function (dv, record, item, index, e) {
                //rc = record;
                //var flyTarget = Ext.fly(e.target);
                //if (flyTarget.hasCls('x-action-col-icon') || flyTarget.hasCls('x-grid-cell-inner-action-col')) {
                //    e.stopEvent();
                //    return;
                //}
                //alert();
            }
        },
        plugins: [
            goodgridCellEditing
        ]
    });

    return grid;
}



