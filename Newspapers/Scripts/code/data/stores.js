
var getStoreAccess = function () {
    var store = Ext.create('Ext.data.JsonStore', {
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
        idProperty: 'AccessId',
        proxy: {
            type: 'rest',
            url: ('/api/dict/GetAccessList/0'),
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

    return store;
}

var getStoreCellOtds = function () {
    var store = Ext.create('Ext.data.JsonStore', {
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
        idProperty: 'OtdId',
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

    return store;
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
        idProperty: 'DepartId',
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
};

var getStoreUsers = function () {
    var store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'Ps',
                type: 'int'
            }, {
                name: 'UserId',
                type: 'int'
            }, {
                name: 'Name1',
                type: 'string'
            }, {
                name: 'Name2',
                type: 'string'
            }, {
                name: 'Name3',
                type: 'string'
            }, {
                name: 'Login',
                type: 'string'
            }, {
                name: 'OtdId',
                type: 'int',
                convert: function (v, record) {
                    //if (v == null) {
                    //    var otd_id = record.get('OtdId');
                    //    var otd = otd_store.findRecord('OtdId', otd_id);

                    //    if (otd != null) {
                    //        return otd.data.Name;
                    //    } else {
                    //        return v;
                    //    }
                    //} else {
                    //    var otd = otd_store.findRecord('OtdId', v);
                    //    return otd.data.Name;
                    //}
                    return v;
                }
            }, {
                name: 'AccessId',
                type: 'int'
            }]
        }),
        autoLoad: false,
        idProperty: 'UserId',
        proxy: {
            type: 'rest',
            api: {
                read: '/api/user/',
                create: '/api/user/',
                update: '/api/user/',
                destroy: '/api/user/'
            },
            actionMethods:
            {
                destroy: 'POST',
                read: 'GET',
                create: 'POST',
                update: 'POST'
            },
            writer: {
                type: 'json',
                writeAllFields: true,       // --<----------------------
                root: 'cell',
                allowSingle: true, // set false to send a single record in array
                listful: true,
                encode: false,
            },
            headers: {
                'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
            //writer: new Ext.data.JsonWriter(
            //{
                
            //    writeAllFields: true,
                
            //})
        },
        remoteSort: false,
        sorters: [{
            property: 'Ps',
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