
var getStoreCellDeparts = function () {
    var store = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data: [
            { "id": 1, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 2, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 3, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 4, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 5, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 6, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 7, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 8, "otd_id": 10, "name": "10 (САД, ГОРОД)" },
            { "id": 9, "otd_id": 100, "name": "100 (ДЕКО)" }
        ],
        model: Ext.define('model_deptforcell', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'otd_id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }]
        })
    });

    return store;
};

var getStoreDictDeparts = function () {
    var store = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data: [
            { "id": "10", "name": "10 (САД, ГОРОД)" },
            { "id": "20", "name": "20 (ІНСТРУМЕНТИ)" },
            { "id": "30", "name": "30 (ЕЛЕКТРОТЕХНІКА)" },
            { "id": "40", "name": "40 (ВИРОБИ З МЕТАЛУ)" },
            { "id": "50", "name": "50 (ДЕКОР)" },
            { "id": "60", "name": "60 (ПОКРИТТЯ ДЛЯ ПІДЛОГИ)" },
            { "id": "70", "name": "70 (САНТЕХНІКА)" },
            { "id": "80", "name": "80 (ВИРОБИ З ДЕРЕВА)" },
            { "id": "90", "name": "90 (БУДІВЕЛЬНІ МАТЕРІАЛИ)" },
            { "id": "100", "name": "100 (ДЕКО)" },
            { "id": "800", "name": "800 (ІНТЕРСПОРТ)" }
        ],
        model: Ext.define('model_dictdept', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }]
        })
    });

    return store;
};

function getDataStorePapersPage() {
    var store = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data: [
            { "id": "1", "departs1": "10", "departs2": "10", "p1": 22, "p2": 1 },
            { "id": "2", "departs1": "20", "departs2": "10", "p1": 2, "p2": 3 },
            { "id": "3", "departs1": "30", "departs2": "10", "p1": 4, "p2": 5 },
            { "id": "4", "departs1": "40", "departs2": "10", "p1": 6, "p2": 7 },
            { "id": "5", "departs1": "50", "departs2": "10", "p1": 8, "p2": 9 },
            { "id": "6", "departs1": "60", "departs2": "10", "p1": 10, "p2": 11 },
            { "id": "7", "departs1": "70", "departs2": "10", "p1": 12, "p2": 13 },
            { "id": "8", "departs1": "80", "departs2": "10", "p1": 14, "p2": 15 },
            { "id": "9", "departs1": "90", "departs2": "10", "p1": 16, "p2": 17 },
            { "id": "10", "departs1": "100", "departs2": "10", "p1": 18, "p2": 19 },
            { "id": "11", "departs1": "800", "departs2": "10", "p1": 20, "p2": 21 }
        ],
        model: Ext.define('model_pages', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id', type: 'int'
            }, {
                name: 'departs1', type: 'string'
            }, {
                name: 'departs2', type: 'string'
            }, {
                name: 'p1', type: 'int'
            }, {
                name: 'p2', type: 'int'
            }]
        })
    });

    return store;
};