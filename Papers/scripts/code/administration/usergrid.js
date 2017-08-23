
var getUserGrid = function (stAccess, stOtds) {

    var storeAccess = stAccess;
    var storeOtds = stOtds;
    var currentLogin = '';

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
                    store: getStoreCellOtds(1),
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

    var fReturnValue = function(g, ctrl){
        var sell = g.getSelection();
        var row = sell[0];
        row.set('Login', currentLogin);
        //var v = row.get('Login');        
        ctrl.setValue(currentLogin);
        row.cancelEdit();
    };

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
                width: 40,
                tdCls: 'price-fall'
            }, {
                dataIndex: 'Name1',
                width: 100,
                text: 'Прізвище',
                //flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Name2',
                width: 100,
                text: "Ім'я",
                //flex: 2,
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Name3',
                width: 100,
                text: "по-батькові",
                flex: 3,
                editor: {
                    allowBlank: false
                }
            }, {
                dataIndex: 'Login',
                width: 150,
                text: 'Логін',
                //flex: 4,
                editor: new Ext.form.field.Text({
                    allowBlank: false,
                    listeners: {
                        focus: function(ctrl, event, eOpts ) {
                            currentLogin = ctrl.getValue();
                        },
                        blur : function(ctrl, event, eOpts ) {
                            var c = ctrl;
                            var currentValue = ctrl.getValue();
                            if (currentValue != currentLogin){
                                $.ajax({
                                    url: Router.getHome() + '/api/login/LoginVerificated/0',
                                    type: 'GET',
                                    data: {
                                        login: currentValue
                                    },
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    //beforeSend: function (req) {
                                    //    req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
                                    //},
                                    success: function (status) {
                                        var c = ctrl;
                                        var g = grid;
                                        if (status == 'IsExists') {
                                            var cr = currentValue;
                                            Ext.Msg.alert(
                                                'Увага!', 
                                                "Вказаний логін '"+currentValue+"' вже використовується.", 
                                                fReturnValue(g, c)
                                            );
                                            //c.setValue('eeee');
                                        } else if (status == 'IsNotExists') {
                                            //c.removeCls('red-field');
                                        }
                                    },
                                    error: function (error) {

                                    }
                                });
                            }
                        }
                    }
                },)
                //{
                //    allowBlank: false
                //}
            }, {
                dataIndex: 'OtdId',
                width: 150,
                text: 'Відділ',
                flex: 5,
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
            },{
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 28,
                items: [{
                    icon: Router.getHome() + '/css/img/Delete.ico',
                    tooltip: 'Видалити',
                    handler: function(grid, rowIndex, colIndex) {
                        var store = grid.getStore();
                        var rec = store.getAt(rowIndex);
                        Ext.Msg.show({
                            title : 'Увага!',
                            msg : "Видалити користувача '" + rec.get('Name1') + ' ' + rec.get('Name2') + ' ' + rec.get('Name3') + "'",
                            width : 300,
                            closable : false,
                            buttons : Ext.Msg.YESNO,
                            buttonText : 
                            {
                                yes : 'Видалити',
                                no : 'Ні'
                                //cancel : 'Discard'
                            },
                            multiline : false,
                            fn : function(buttonValue, inputText, showConfig) {
                                var rm = rec;
                                store.remove(rm);
                                store.sync();
                            },
                            icon : Ext.Msg.QUESTION
                        });
                    }
                }]
            },{
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 28,
                items: [{
                    icon: Router.getHome() + '/css/img/icons/automated.ico',
                    tooltip: 'Редагувати',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        getWinSetPassword(rec).show();
                    }
                }]
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
        viewConfig: {
            getRowClass: function(record, rowIndex, rowParams, store) {
                //var c = record.get('change');
                //if (c < 0) {
                //    return 'price-fall';
                //} else if (c > 0) {
                //    return 'price-rise';
                //}
                return 'column-number';
            }
        }
    });

    store.load();

    return grid;
}

var getWinSetPassword = function(row) {

    var txtPassword = Ext.create('Ext.form.TextField', {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: "Пароль",
        name: 'password'
    });

    var win = Ext.create('Ext.Window', {
        title: 'Змінити пароль',
        width: 400,
        height: 200,
        modal: true,
        closable: false,
        layout: 'form',
        items: [txtPassword],
        buttons: [
            { 
                xtype: 'button',
                text: 'Змінити',
                handler: function(){

                    //var o = {
                    //    pss: txtPassword.getValue()
                    //}

                    $.ajax({
                        url: Router.getHome() + 'api/user/change/' + row.data.UserId,
                        type: 'POST',
                        data: txtPassword.getValue(),//JSON.stringify(o),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function (req) {
                            req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
                        },
                        success: function (UserId) {
                            ////var rec = record;
                            //if (UserId > 0) {
                            //    record = store.findRecord("Login", row[0].data.Login);
                            //    var max = store.max('Ps', false);
                            //    record.set("UserId", UserId);
                            //    record.set("Ps", max + 1);
                            //    record.commit();
                            win.close();
                            //}
                        },
                        error: function (error) {
                            if (error.status == 401) {
                                //alert('Unauthorized');
                                //на сторінку авторизації
                            }
                            else {
                                //alert('Error calling STS: ' + error.responseText);
                            }
                        }
                    });
                }
            }, 
            { 
                xtype: 'button',
                text: 'Закрити',
                handler: function(){
                    win.hide();
                }
            }]
    });

    return win;
}