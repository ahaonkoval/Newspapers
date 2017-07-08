
Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Number',
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
});

Ext.define('Access', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'AccessId',
        type: 'int'
    }, {
        name: 'Name',
        type: 'string'
    }]
});

Ext.define('Otd', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OtdId',
        type: 'int'
    }, {
        name: 'Name',
        type: 'string'
    }]
});

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