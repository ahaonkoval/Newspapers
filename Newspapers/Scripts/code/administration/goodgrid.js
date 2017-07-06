
var goodgrid_model = Ext.define('goodgrid_model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'keywords',
        type: 'string'
    }, {
        name: 'size',
        type: 'string'
    }]
});

var goodgrid_store = Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'keywords', 'size'],
    model: goodgrid_model,
    data: [
        { "id": "1", "name": "", "keywords": "", "size": ""},
        { "id": "2", "name": "", "keywords": "", "size": "" },
        { "id": "3", "name": "", "keywords": "", "size": "" },
        { "id": "4", "name": "", "keywords": "", "size": "" },
        { "id": "5", "name": "", "keywords": "", "size": "" },
        { "id": "6", "name": "", "keywords": "", "size": "" },
        { "id": "7", "name": "", "keywords": "", "size": "" },
        { "id": "8", "name": "", "keywords": "", "size": "" },
        { "id": "9", "name": "", "keywords": "", "size": "" },
        { "id": "10", "name": "", "keywords": "", "size": "" }
    ]
});

var goodgrid_columns = function (finish, start) {

    var columns = [
        {
            dataIndex: 'id',
            text: 'ID',
            width: 70,
        }
        , {
            dataIndex: 'name',
            width: 150,
            text: 'Назва',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }
        , {
            dataIndex: 'keywords', width: 150, text: 'Ключові слова', editor: {
                allowBlank: false
            }
        }
        , {
            text: 'Розміри',
            width: 120,
            //xtype: 'widgetcolumn',
            dataIndex: 'size',
            editor: new Ext.form.field.ComboBox({
                //typeAhead: true,
                //triggerAction: 'all',
                store: [
                    ['1/3 клітинки','1/3 клітинки'],
                    ['1/2 клітинки','1/3 клітинки'],
                    ['Клітинка','Клітинка'],
                    ['Дві кітинки','Дві кітинки']
                ]
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
        
    ];

    return columns.slice(start || 0, finish);
};

var goodgridCellEditing = new Ext.grid.plugin.CellEditing({
    clicksToEdit: 1
});

var goodgrid = Ext.create('Ext.grid.Panel', {   
    stateful: true,
    stateId: 'stateful-filter-grid',
    border: false,
    store: goodgrid_store,
    columns: goodgrid_columns(8),
    loadMask: true,
    plugins: [
        goodgridCellEditing
    ]

});