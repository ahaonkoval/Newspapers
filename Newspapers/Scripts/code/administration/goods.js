
var getWinGoodsAdm = function () {
    var win = null;
    var storeSizes = getStoreCellSizes().load({
        scope: this,
        callback: function (records, operation, success) {
            if (success) {
                win = getWinGoods(storeSizes).show();
            }
        }
    });
}

var getWinGoods = function (stSizes) {
    var store = getStoreGoods();
    var storeSizes = stSizes;

    var btnSave = Ext.create('Ext.Button', {
        text: 'Зберегти зміни',
        disabled: true,
        listeners: {
            'click': function () {
                store.sync();
                this.setDisabled(true);
            }
        }
    });
    var grid = getGridGoods(store, stSizes);
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

    win = Ext.create('Ext.Window', {
        title: 'Адміністрування товарів',
        width: '90%',
        height: '80%',
        modal: true,
        closable: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            items: [grid]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    getWinGoodAdd(store).show();
                }
            }
        },
        btnSave,
        {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                }
            }
        }]
    })

    return win;
}

var getWinGoodAdd = function (st) {
    var store = st;

    var txtName = Ext.create('Ext.form.TextArea', {
        fieldLabel: 'Назва товару',
        autoScroll: true,
        name: 'name',
        bind: '{name}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var txtKeywords = Ext.create('Ext.form.TextField', {
        fieldLabel: "Ключове слово в назві",
        name: 'keywords',
        bind: '{keywords}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });
    var cmbSize = Ext.create('Ext.form.ComboBox', {
        fieldLabel: "Розмір",
        name: 'sizeid',
        store: getStoreCellSizes(),
        displayField: 'Name',
        valueField: 'SizeId',
        editable: false,
        bind: '{sizeid}',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                ctrl.removeCls('red-field');
            }
        }
    });

    var gd = {
        GoodTmpId: 0,
        Name: '',
        Keywords: '',
        SizeId: null
    };

    var win = Ext.create('Ext.Window', {
        title: 'Додати користувача',
        width: 600,
        height: 400,
        modal: true,
        closable: false,
        layout: 'fit',
        padding: 20,
        viewModel: {
            //data: {
            //    rec: gd
            //},
            formulas: {
                name: {
                    get: function (get) {
                        return gd.Name
                    },
                    set: function (value) {
                        gd.Name = value;
                    }
                },
                keywords: {
                    get: function (get) {
                        return gd.Keywords
                    },
                    set: function (value) {
                        gd.Keywords = value
                    }
                },
                sizeid: {
                    get: function (get) {
                        return gd.SizeId
                    },
                    set: function (value) {
                        gd.SizeId = value
                    }
                }
            }
        },
        items: [
            {
                xtype: 'panel',
                layout: 'form',
                items: [txtName, txtKeywords, cmbSize]
            }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            handler: function () {
                var good = gd;
                var is_save = true;

                if (good.Name == '') {
                    txtName.addCls('red-field');
                    is_save = false;
                }
                if (good.Keywords == '') {
                    txtKeywords.addCls('red-field');
                    is_save = false;
                }
                if (good.SizeId == null) {
                    cmbSize.addCls('red-field');
                }
                if (is_save) {
                    var row = store.add({
                        GoodtmpId: 0,
                        Number: 0,
                        Name: good.Name,
                        Keywords: good.Keywords,
                        SizeId: good.SizeId
                    });
                    $.ajax({
                        url: '/api/goods/0',
                        type: 'Post',
                        data: JSON.stringify(good),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function (req) {
                            req.setRequestHeader('Authorization', 'tk ' + btoa(sessionStorage.getItem("token")));
                        },
                        success: function (GoodTmpId) {
                            //var rec = row;
                            if (GoodTmpId > 0) {
                                
                                record = store.findRecord("GoodtmpId", 0);
                                var max = store.max('Number', false);
                                record.set("GoodtmpId", GoodTmpId);
                                record.set("Number", max + 1);
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

                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                    win = null;
                }
            }
        }]
    });
    return win;
}
