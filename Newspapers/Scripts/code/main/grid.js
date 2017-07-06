
var grid_tmp_list_model = Ext.define('grid_tmp_list_model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

/*
var grid_tmp_list_store = function (campaign_id) {
    return Ext.create('Ext.data.JsonStore', {
        autoLoad: false,
        // store configs
        //autoDestroy: true,
        model: grid_tmp_list_model,
        proxy: {
            type: 'ajax',
            url: ('api/campaign/GetCampaignsTerms/' + campaign_id),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'campaigns_terms_id',
            direction: 'ASC'
        }],
        pageSize: 50
    })
};
*/

var grid_tmp_list_store = Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    data: [
        { "id": "1", "name": "Газета №1" },
        { "id": "2", "name": "Газета №2" },
        { "id": "3", "name": "Газета №3" }
    ]
});

var createColumns_tmp_list = function (finish, start) {

    var columns = [
        {
            dataIndex: 'id',
            text: 'Створено',
            xtype: 'datecolumn',
            width: 90,
            hidden: true
        }, {
            dataIndex: 'name',
            text: 'Назва шаблону',
            flex: 1
        }
    ];

    return columns.slice(start || 0, finish);
};

var grid_tmp_list = Ext.create('Ext.grid.Panel', {
    stateful: true,
    stateId: 'stateful-filter-grid',
    border: false,
    store: grid_tmp_list_store,
    columns: createColumns_tmp_list(2),
    //plugins: 'gridfilters',
    loadMask: true,
    listeners: {
        'rowdblclick': function (grid, record, e) {
            /* открываєм окно редактирования */
            window.location.href = "../pages/storyboard.aspx";
        }
    }

    //initComponent: function () {
    //    var me = this;

    //    me.width = 250;
    //    me.columns = [
    //        {
    //            text: 'Company',
    //            flex: 1,
    //            sortable: false,
    //            dataIndex: 'name'
    //        },
    //        {
    //            text: 'Price',
    //            width: 95,
    //            sortable: true,
    //            formatter: 'usMoney',
    //            dataIndex: 'price'
    //        }

    //    ];

    //    me.callParent();
    //}
});
