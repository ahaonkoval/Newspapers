

var getGridGoods = function (store) {

    var goodgridCellEditing = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
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
            , {
                dataIndex: 'Name',
                width: 150,
                text: 'Назва',
                flex: 1,
                //editor: {
                //    allowBlank: false
                //}
            }
            , {
                dataIndex: 'Keywords', width: 150, text: 'Ключові слова',
                editor: {
                    allowBlank: false
                }
            }
            , {
                text: 'Розміри',
                width: 120,
                //xtype: 'widgetcolumn',
                dataIndex: 'size',
                editor: new Ext.form.field.ComboBox({
                    displayField: 'Name',
                    valueField: 'SizeId',
                    editable: false,
                    store: getStoreCellSizes()
                })
                //widget: {
                //    width: 70,
                //    textAlign: 'center',
                //    xtype: 'combobox',
                //    handler: function (btn) {
                //        //var rec = btn.getWidgetRecord();
                //        //var hidden_campaign_id = Ext.getCmp('hidden_campaign_id');
                //        //hidden_campaign_id.setValue(rec.get('id'));
                //        //var campaign_id = rec.get('id');
                //        //getCustomers(campaign_id);
                //    }
                //}
            }

        ],
        loadMask: true,
        plugins: [
            goodgridCellEditing
        ]
    });

    return grid;
    //store.load();
}



