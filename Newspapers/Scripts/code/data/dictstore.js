
var access_store = Ext.create('Ext.data.JsonStore', {
    model: 'Access',
    autoDestroy: true,
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: ('/api/dict/getaccess/0'),
        headers: {
            'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: 'AccessId',
            totalProperty: 'total'
        }
    },
    remoteSort: false,
    sorters: [{
        property: 'AccessId',
        direction: 'ASC'
    }],
    pageSize: 50
});

var otd_store = Ext.create('Ext.data.JsonStore', {
    model: 'Otd',
    autoDestroy: true,
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: ('/api/dict/getotd/0'),
        headers: {
            'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: 'OtdId',
            totalProperty: 'total'
        }
    },
    remoteSort: false,
    sorters: [{
        property: 'OtdId',
        direction: 'ASC'
    }],
    pageSize: 50
});
