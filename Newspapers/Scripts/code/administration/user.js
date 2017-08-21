

var getUserAdm = function () {

    //var save = function (record) {
    //    var data = record.data;
    //    $.ajax({
    //        url: '/api/user',
    //        type: 'post',
    //        data: JSON.stringify(data),
    //        //data: JSON.stringify(record.data),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        beforeSend: function (req) {
    //            req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
    //        },
    //        success: function (UserId) {
    //            var rec = record;
    //            if (UserId > 0)
    //                rec.commit();
    //        },
    //        error: function (error) {
    //            if (error.status == 401) {
    //                //alert('Unauthorized');
    //                //на сторінку авторизації
    //            }
    //            else {
    //                //alert('Error calling STS: ' + error.responseText);
    //            }
    //        }
    //    });
    //}
    var win = null;
    var storeAccess = null;
    var storeOtds = getStoreCellOtds(1).load({
        scope: this,
        callback: function (records, operation, success) {
            if (success) {
                storeAccess = getStoreAccess().load({
                    scope: this,
                    callback: function (records, operation, success) {
                        if (success) {
                            win = getWinAdministrationUsers(storeAccess, storeOtds).show();
                        }
                    }
                });
            }
        }
    });
}

var getWinAdministrationUsers = function (storeAccess, storeOtds) {

    var stAccess = storeAccess;
    var stOtds = storeOtds;

    var grid = getUserGrid(stAccess, stOtds);

    var btnSave = Ext.create('Ext.Button', {
        text: 'Зберегти зміни',
        disabled: true,
        listeners: {
            'click': function () {
                var grd = grid;
                var store = grd.getStore();
                store.sync();
                this.setDisabled(true);
            }
        }
    });
    grid.on('validateedit', function (cep, e, eOpts) {
        var btn = btnSave;

        var rowIdx = e.rowIdx,
            fieldName = e.field,
            newVal = e.value,
            storeRow = e.record;

        storeRow.set(fieldName, newVal);
        var enableButtons = Boolean(e.store.getModifiedRecords().length);
        if (enableButtons) {
            btn.setDisabled(false);
        } else {
            btn.setDisabled(true);
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Адміністрування користувачів',
        width: '90%',
        height: '80%',
        modal: true,
        closable: true,
        layout: 'fit',

        items: [{
            xtype: 'panel',
            layout: 'fit',
            items: [
                grid
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    //var win =
                    getWinUserAdd(stAccess, stOtds).show();;
                    //win.show();
                }
            }
        }, btnSave
        , {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                }
            }
        }]
    });

    return win;
}

var getWinUserAdd = function (stAccess, stOtds) {

    var storeAccess = stAccess;
    var storeOtds = stOtds;
    var user = {
        name1: '',
        name2: '',
        name3: '',
        login: '',
        otd: null,
        access: null,
        password: '',
        password_check: ''
    };

    var txtName1 = Ext.create('Ext.form.TextField', {
        fieldLabel: 'Прізвище',
        name: 'name1',
        bind: '{mname1}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtName2 = Ext.create('Ext.form.TextField', {
        //xtype: 'textfield',
        fieldLabel: "Ім'я",
        name: 'name2',
        bind: '{mname2}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtName3 = Ext.create('Ext.form.TextField', {
        fieldLabel: "по-батькові",
        name: 'name3',
        bind: '{mname3}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtLogin = Ext.create('Ext.form.TextField', {
        xtype: 'textfield',
        fieldLabel: "Логін",
        name: 'login',
        bind: '{mlogin}',
        listeners: {
            blur: function (ctrl) {
                var v = ctrl.getValue();
                $.ajax({
                    url: '/api/login/LoginVerificated/0',
                    type: 'GET',
                    data: {
                        login: v
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function (req) {
                        req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
                    },
                    success: function (status) {
                        var c = ctrl;
                        if (status == 'IsExists') {
                            c.addCls('red-field')
                        } else if (status == 'IsNotExists') {
                            c.removeCls('red-field');
                        }
                    },
                    error: function (error) {

                    }
                });
            },
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtOtd = Ext.create('Ext.form.ComboBox', {
        //xtype: 'combobox',
        fieldLabel: "Відділ",
        name: 'otd',
        store: storeOtds,
        displayField: 'Name',
        valueField: 'OtdId',
        editable: false,
        bind: '{motd}',
        //id: 'txtOtd',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtAccess = Ext.create('Ext.form.ComboBox', {
        //xtype: 'combobox',
        fieldLabel: "Доступ",
        editable: false,
        name: 'access',
        store: storeAccess,
        displayField: 'Name',
        valueField: 'AccessId',
        bind: '{maccess}',
        //id: 'txtAccess',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtPassword = Ext.create('Ext.form.TextField', {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: "Пароль",
        name: 'password',
        bind: '{mpassword}',
        // id: 'txtPassword',
        listeners: {
            blur: function (ctrl) {
                ctrl.removeCls('red-field');
            },
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtPasswordCheck = Ext.create('Ext.form.TextField', {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: "Підтвердження паролю",
        name: 'password_check',
        bind: '{mpassword_check}',
        //id: 'txtPasswordCheck',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Додати користувача',
        width: 800,
        height: 600,
        modal: true,
        closable: false,
        layout: 'fit',
        viewModel: {
            data: {
                rec: user
            },
            formulas: {
                mname1: {
                    get: function (get) {
                        return user.name1;
                    },
                    set: function (value) {
                        user.name1 = value;
                    }
                },
                mname2: {
                    get: function (get) {
                        return user.name2;
                    },
                    set: function (value) {
                        user.name2 = value;
                    }
                },
                mname3: {
                    get: function (get) {
                        return user.name3;
                    },
                    set: function (value) {
                        user.name3 = value;
                    }
                },
                mlogin: {
                    get: function (get) {
                        return user.login;
                    },
                    set: function (value) {
                        user.login = value;
                    }
                },
                motd: {
                    get: function (get) {
                        return user.otd;
                    },
                    set: function (value) {
                        user.otd = value;
                    }
                },
                maccess: {
                    get: function (get) {
                        return user.access;
                    },
                    set: function (value) {
                        user.access = value;
                    }
                },
                mpassword: {
                    get: function (get) {
                        return user.password;
                    },
                    set: function (value) {
                        user.password = value;
                    }
                },
                mpassword_check: {
                    get: function (get) {
                        return user.password_check;
                    },
                    set: function (value) {
                        user.password_check = value;
                    }
                }
            }
        },
        items: [{
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            border: false,
            padding: '60',
            items: [
                {
                    xtype: 'panel',
                    layout: 'form',
                    flex: 1,
                    border: false,
                    items: [txtName1, txtName2, txtName3, txtLogin, txtOtd, txtAccess, txtPassword, txtPasswordCheck]
                }
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            handler: function () {
                var is_save = true;
                var us = user;
                /* Перевряємо несені дані */
                //var rec = win.getViewModel().getData().rec;
                if (us.password == '') {
                    txtPassword.addCls('red-field');
                    is_save = false;
                }
                if (us.password != us.password_check) {
                    txtPasswordCheck.addCls('red-field');
                    is_save = false;
                }
                if (us.login == '') {
                    txtLogin.addCls('red-field');
                    is_save = false;
                }
                if (us.access == null) {
                    txtAccess.addCls('red-field');
                    is_save = false;
                }
                if (us.otd == null) {
                    is_save = false;
                    txtOtd.addCls('red-field');
                }
                if (us.access == null) {
                    is_save = false;
                    txtAccess.addCls('red-field');
                }
                if (us.name1 == '') {
                    is_save = false;
                    txtName1.addCls('red-field');
                }
                if (us.name2 == '') {
                    is_save = false;
                    txtName2.addCls('red-field');
                }

                if (is_save) {
                    var grid = Ext.getCmp('grdUserAdm');
                    var store = grid.getStore();
                    var row = store.add({
                        Ps: 0,
                        UserId: 0,
                        Name1: us.name1,
                        Name2: us.name2,
                        Name3: us.name3,
                        Login: us.login,
                        OtdId: us.otd,
                        AccessId: us.access
                    });

                    //store.sync();
                    $.ajax({
                        url: '/api/user/',
                        type: 'POST',
                        data: JSON.stringify(row[0].data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function (req) {
                            req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
                        },
                        success: function (UserId) {
                            //var rec = record;
                            if (UserId > 0) {
                                record = store.findRecord("Login", row[0].data.Login);
                                var max = store.max('Ps', false);
                                record.set("UserId", UserId);
                                record.set("Ps", max + 1);
                                record.commit();
                                win.close();
                            }
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
                        
                } else {
                    Ext.Msg.alert('Увага!', "Не заповнены поля обов'язкові поля!");
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    //win.hide();
                    win.close();
                    win = null;
                    //win.close();
                }
            }
        }]
    });

    return win;
}
