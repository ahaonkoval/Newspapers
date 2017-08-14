
var getUserGrid = function (stAccess, stOtds) {

    var storeAccess = stAccess;
    var storeOtds = stOtds;

    var getColumns = function (finish, start) {
        var columns = [
            //{
            //    dataIndex: 'UserId',
            //    text: 'ID',
            //    visible: false
            //},
            {
                dataIndex: 'Ps',
                text: '№',
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
                text: 'Відділ'
            }, {
                dataIndex: 'OtdId',
                width: 150,
                text: 'Відділ',
                editor: new Ext.form.field.ComboBox({
                    id: 'cmbOtd',
                    store: getStoreCellOtds(),
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
                    store: getStoreAccess(),
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

    var store = getStoreUsers();

    var usergridEditing = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        id: 'grdUserAdm',
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: [
            //{
            //    dataIndex: 'UserId',
            //    text: 'ID',
            //    visible: false
            //},
            {
                dataIndex: 'Ps',
                text: '№',
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
                    store: storeOtds,//getStoreCellOtds(),
                    displayField: 'Name',
                    valueField: 'OtdId',
                    editable: false,
                    forceSelection: true,
                    mode: 'local',
                    triggerAction: 'all'
                }),
                renderer: function (value, a1, a2) {
                    //if (value) {
                    //    var recordIndex = -1;
                    //    if (Number.isInteger(value)) {
                    //        recordIndex = otd_store.find('OtdId', value);
                    //    } else {
                    //        recordIndex = otd_store.find('Name', value);
                    //    }

                    //    if (recordIndex === -1) {
                    //        return 'Unknown value: ' + value;
                    //    }
                    //    return otd_store.getAt(recordIndex).get('Name');
                    //}
                    if (value) {
                        if (Number.isInteger(value)) {
                            recordIndex = storeOtds.find('OtdId', value);
                        }
                        return storeOtds.getAt(recordIndex).get('Name'); //value;
                    } else {
                        return '';
                    }
                    //return value;
                },
            }, {
                text: 'Доступ',
                width: 120,
                dataIndex: 'AccessId',
                editor: new Ext.form.field.ComboBox({
                    store: storeAccess,
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
                            recordIndex = storeAccess.find('AccessId', value);
                        } else {
                            recordIndex = storeAccess.find('Name', value);
                        }

                        if (recordIndex === -1) {
                            return 'Unknown value: ' + value;
                        }
                        return storeAccess.getAt(recordIndex).get('Name');
                    }
                }
            }
        ],
        loadMask: true,
        frame: true,
        plugins: [
            usergridEditing
        ],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
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

    store.load();

    return grid;
}