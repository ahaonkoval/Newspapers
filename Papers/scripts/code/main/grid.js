
var getPapersGrid = function () {

    //var store = Ext.create('Ext.data.Store', {
    //    model: 'Papers',
    //    fields: ['id', 'name'],
    //    data: [
    //        { "id": "1", "name": "Газета №1" },
    //        { "id": "2", "name": "Газета №2" },
    //        { "id": "3", "name": "Газета №3" }
    //    ]
    //});

    var store = getStorePapers();

    var createColumns = function (finish, start) {
        var columns = [
            {
                dataIndex: 'Ps',
                text: '№',
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
    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(2),
        //plugins: 'gridfilters',
        loadMask: true,
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                window.location.href = Router.getHome() + "/pages/storyboard.aspx";
            }
        }
    });
    return grid;
}