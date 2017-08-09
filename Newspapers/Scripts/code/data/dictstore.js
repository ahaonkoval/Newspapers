/*
var access_store = Ext.create('Ext.data.JsonStore', {
    model: Ext.define('Access', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'AccessId',
            type: 'int'
        }, {
            name: 'Name',
            type: 'string'
        }]
    }),
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
*/

var getStoreCellOtds = function () {
    var otd_store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('Otds', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'OtdId',
                type: 'int'
            }, {
                name: 'Name',
                type: 'string'
            }]
        }),
        autoDestroy: true,
        autoLoad: true,
        proxy: {
            type: 'rest',
            url: ('/api/dict/GetOtdList/0'),
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

    return otd_store;
};

var getStoreCellDeparts = function (otdId) {
    if (otdId == undefined) {
        otdId = 0
    }
    var store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('Departs', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'DepartId',
                type: 'int'
            }, {
                name: 'OtdId',
                type: 'int'
            }, {
                name: 'Lf0Id',
                type: 'int'
            }, {
                name: 'Name0',
                type: 'string'
            }, {
                name: 'Lf1Id',
                type: 'int'
            }, {
                name: 'Name1',
                type: 'string'
            }]
        }),
        autoDestroy: true,
        autoLoad: true,
        proxy: {
            type: 'rest',
            url: ('/api/dict/GetDepartList/' + otdId), //
            headers: {
                'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'DepartId',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'DepartId',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    return store;
}

//var getStoreCellDeparts = function () {
//    var store = Ext.create('Ext.data.Store', {
//        fields: ['id', 'name'],
//        data: [
//            { "id": 1, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 2, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 3, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 4, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 5, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 6, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 7, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 8, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
//            { "id": 9, "otd_id": 100, "name": "100 (ДЕКО)" },
//            { "id": 10, "otd_id": 100, "name": "100 (ДЕКО)" },
//            { "id": 11, "otd_id": 100, "name": "100 (ДЕКО)" },
//            { "id": 12, "otd_id": 100, "name": "100 (ДЕКО)" }

//        ],
//        model: Ext.define('model_deptforcell', {
//            extend: 'Ext.data.Model',
//            fields: [{
//                name: 'id',
//                type: 'int'
//            }, {
//                name: 'otd_id',
//                type: 'int'
//            }, {
//                name: 'name',
//                type: 'string'
//            }]
//        })
//    });

//    return store;
//};