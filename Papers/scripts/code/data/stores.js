
var Router = {
    home: window.location.origin,

    getHome: function () {
        if (window.location.host == window.location.hostname) {
            var m = window.location.pathname.split('/')
            return window.location.origin + '/' + m[1];
        } else {
            return window.location.origin;
        }
    }
};

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
            url: (Router.getHome() + '/api/dict/GetAccessList/0'),
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

var getStoreCellOtds = function (type) {
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
            url: (Router.getHome() + '/api/dict/GetOtdList/' + type),
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
            url: (Router.getHome() + '/api/dict/GetDepartList/' + otdId), //
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
            idProperty: 'UserId',
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
                read: Router.getHome() + '/api/user/',
                create: Router.getHome() + '/api/user/',
                update: Router.getHome() + '/api/user/',
                destroy: Router.getHome() + '/api/user/'
            },
            actionMethods:
            {
                destroy: 'POST',
                read: 'GET',
                create: 'POST',
                update: 'PUT'
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

var getStoreGoods = function () {
    var store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('GoodGridModel', {
            extend: 'Ext.data.Model',
            idProperty: 'GoodtmpId',
            fields: [{
                name: 'GoodtmpId',
                type: 'int'
            }, {
                name: 'Number',
                type: 'int'
            },{
                name: 'Name',
                type: 'string'
            }, {
                name: 'Keywords',
                type: 'string'
            }, {
                name: 'SizeId',
                type: 'int'
            }]
        }),
        autoLoad: true,
        idProperty: 'GoodtmpId',
        proxy: {
            type: 'rest',
            api: {
                read: Router.getHome() + '/api/goods/',
                create: Router.getHome() + '/api/goods/',
                update: Router.getHome() + '/api/goods/',
                destroy: Router.getHome() + '/api/goods/'
            },
            actionMethods:
            {
                destroy: 'POST',
                read: 'GET',
                create: 'POST',
                update: 'PUT'
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
                idProperty: 'GoodtmpId',
                totalProperty: 'total'
            }
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

var getStoreCellSizes = function () {
    var store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('CellSizes', {
            extend: 'Ext.data.Model',
            idProperty: 'SizeId',
            fields: [{
                name: 'SizeId',
                type: 'int'
            }, {
                name: 'Name',
                type: 'string'
            }]
        }),
        autoDestroy: true,
        autoLoad: true,
        idProperty: 'SizeId',
        proxy: {
            type: 'rest',
            url: (Router.getHome() + '/api/dict/GetGoodsSizes/0'),
            headers: {
                'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'SizeId',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'SizeId',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    return store;
}
