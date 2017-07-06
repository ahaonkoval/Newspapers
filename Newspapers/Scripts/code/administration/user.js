

var useradm = function () {
    var save = function (record) {
        var data = record.data;
        $.ajax({
            url: '/api/user',
            type: 'post',
            data: JSON.stringify(data),
            //data: JSON.stringify(record.data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
            },
            success: function (UserId) {
                var rec = record;
                if (UserId > 0)
                    rec.commit();
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

    var grid = get_usergrid();
    var btnSave = Ext.create('Ext.Button', {
        text: 'Зберегти зміни',
        disabled: true,
        listeners: {
            'click': function () {
                var grd = grid;
                var store = grd.getStore();
                var m = store.getModifiedRecords()
                if (m.length > 0) {
                    m.forEach(function (record) {
                        save(record);
                    });
                }
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

    winuseradm = Ext.create('Ext.Window', {
        title: 'Адміністрування користувачів',
        width: 800,
        height: 600,
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
                    var useradd = get_useradd();
                    useradd.show();
                }
            }
        }, btnSave
        , {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    winuseradm.close();
                }
            }
        }]
    });    

    winuseradm.show();
}

var get_useradd = function () {

    var mpanel = Ext.create('Ext.panel.Panel', {
        xtype: 'panel',
        height: 80,
        html: 'asdfsdfsdfg',
        padding: 10,
        border: false
    });

    var winuseradd = Ext.create('Ext.Window', {
        title: 'Додати користувача',
        width: 800,
        height: 600,
        modal: true,
        closable: false,
        layout: 'fit',

        items: [{
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            border: false,
            padding: '40',
            items: [
                {
                    xtype: 'panel',
                    layout: 'form',
                    flex: 1,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Прізвище',
                            name: 'name1',
                            cls: 'login-form-field-wrapper'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: "Ім'я",
                            name: 'name2'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: "по-батькові",
                            name: 'name3'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: "Логін",
                            name: 'login'
                        }, {
                            xtype: 'combobox',
                            fieldLabel: "Відділ",
                            name: 'Otd'
                        }, {
                            xtype: 'combobox',
                            fieldLabel: "Доступ",
                            name: 'access'
                        }, {
                            xtype: 'textfield',
                            inputType: 'password',
                            fieldLabel: "Пароль",
                            name: 'password'
                        }, {
                            xtype: 'textfield',
                            inputType: 'password',
                            fieldLabel: "Підтвердження паролю",
                            name: 'password_check'
                            }]
                }, mpanel
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {

                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    var win = winuseradd;
                    win.close();
                }
            }
        }]
    });

    return winuseradd;
}
