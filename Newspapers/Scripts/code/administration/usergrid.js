
var get_usergrid = function () {

    var usergrid_store = Ext.create('Ext.data.JsonStore', {
        model: 'User',
        autoLoad: false,
        proxy: {
            type: 'rest',
            //url: ('/api/user'),
            api: {
                read: '/api/user/',
                create: '/api/user/',
                update: '/api/user/'
            },
            headers: {
                'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            },
            writer: new Ext.data.JsonWriter(
            {
                encode: false,
                writeAllFields: true,
                listful: true
            })
        },
        remoteSort: false,
        sorters: [{
            property: 'id',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    var usergrid_columns = function (finish, start) {
        var columns = [
            {
                dataIndex: 'Number',
                text: 'ID',
                width: 60,
            }, {
                dataIndex: 'Name1',
                width: 100,
                text: 'Прізвище',
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Name2',
                width: 100,
                text: "Ім'я",
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Name3',
                width: 100,
                text: "по-батькові",
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Login',
                width: 150,
                text: 'Логін',
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'OtdId',
                width: 150,
                text: 'Відділ',
                editor: new Ext.form.field.ComboBox({
                    id: 'cmbOtd',
                    store: otd_store,
                    displayField: 'Name',
                    valueField: 'OtdId',
                    editable: false,
                    forceSelection: true,
                    mode: 'local',
                    triggerAction: 'all'
                }),
                renderer: function (value, a1, a2) {
                    if (value) {
                        var recordIndex = -1;
                        if (Number.isInteger(value)) {
                            recordIndex = otd_store.find('OtdId', value);
                        } else {
                            recordIndex = otd_store.find('Name', value);
                        }

                        if (recordIndex === -1) {
                            return 'Unknown value: ' + value;
                        }
                        return otd_store.getAt(recordIndex).get('Name');
                    }
                },
            }, {
                text: 'Доступ',
                width: 120,
                dataIndex: 'AccessId',
                editor: new Ext.form.field.ComboBox({                    
                    store: access_store,
                    displayField: 'Name',
                    valueField: 'AccessId',
                    editable: false,
                    forceSelection: true,
                    mode: 'local',
                    triggerAction: 'all'
                }),
                renderer: function (value) {
                    if (value) {
                        var recordIndex = -1;
                        if (Number.isInteger(value)) {
                            recordIndex = access_store.find('AccessId', value);
                        } else {
                            recordIndex = access_store.find('Name', value);
                        }

                        if (recordIndex === -1) {
                            return 'Unknown value: ' + value;
                        }
                        return access_store.getAt(recordIndex).get('Name');
                    }
                }
            }
        ];
        return columns.slice(start || 0, finish);
    };

    var usergridEditing = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    });

    var usergrid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        id: 'usergrid',
        stateId: 'stateful-filter-grid',
        border: false,
        store: usergrid_store,
        columns: usergrid_columns(8),
        loadMask: true,
        frame: true,
        plugins: [
            usergridEditing
        ],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: usergrid_store
        })],
        //listeners: {
        //    'validateedit': function (cep, e, eOpts) {
        //        var me = this,
        //            rowIdx = e.rowIdx, // row index
        //            fieldName = e.field,
        //            newVal = e.value,
        //            storeRow = e.record;

        //        storeRow.set(fieldName, newVal);
        //        //storeRow.save(rowIdx);
        //        //storeRow.endEdit();
        //        // if modified records > 0 then enable buttons
        //        var enableButtons = Boolean(e.store.getModifiedRecords().length);
        //        if (enableButtons) {
        //            //me.down('#btnSaveChangeUsers').setDisabled(false);
        //            //var btn = Ext.getCmp('btnSaveChangeUsers');
        //            //btn.setDisabled(false);
        //            /* enable buttons */
        //        } else { /* disable buttons */
        //            //me.down('#btnSaveChangeUsers').setDisabled(true);
        //            //var btn = Ext.getCmp('btnSaveChangeUsers');
        //            //btn.setDisabled(true);
        //        }

        //    }, scope: this
        //}

    });

    usergrid_store.load();

    return usergrid;
}