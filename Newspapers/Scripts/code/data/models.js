



Ext.define('Papers', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('Years', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});