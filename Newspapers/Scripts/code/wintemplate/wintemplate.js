
var getCreateEditNewspapers = function () {

    var clearColumnGridGant = function () {
        var grid = Ext.getCmp('gridgant');
        do {
            var col = grid.headerCt.getComponent(grid.getColumns().length - 1);
            grid.headerCt.remove(col);
            grid.getView().refresh();
        }
        while (grid.getColumns().length > 0);
    }

    var gant_header_store = Ext.create('Ext.data.Store', {
        fields: ['id', 'name', 'vlc'],
        model: function () {
            return Ext.define('gant_header_model', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'id',
                    type: 'int'
                }, {
                    name: 'name',
                    type: 'string'
                }, {
                    name: 'vlc',
                    type: 'date'
                }]
            });
        },
        data: [
            { "id": "1", "name": "Дата виходу газети:", "vlc": "" },
            { "id": "2", "name": "Погодження кількості артикулів:", "vlc": "" },
            { "id": "3", "name": "Початок підготовки товарів:", "vlc": "" },
            { "id": "4", "name": "Відбір, аналіз, погодження товарів:", "vlc": "" },
            { "id": "5", "name": "Верстка газети:", "vlc": "" },
            { "id": "6", "name": "Коректування товарів:", "vlc": "" },
            { "id": "7", "name": "Фін. погодження, підписання у відділах:", "vlc": "" },
            { "id": "8", "name": "Підготовка до друку, підпис керівництва:", "vlc": "" },
            { "id": "9", "name": "Друк газети:'", "vlc": "" },
            { "id": "10", "name": "Доставка газети:", "vlc": "" }
        ]
    });

    clearColumnGridGant();

    var wintmpl = Ext.create('Ext.Window', {
        title: 'Створити шаблон',
        width: 1000,
        height: 500,
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start',
        },
        items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'anchor',
                    height: 50,
                    padding: 5,
                    items: [{
                        anchor: '100%',
                        xtype: 'textfield',
                        fieldLabel: 'Назва шаблону:'
                    }]
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    padding: 5,
                    items: [{
                        xtype: 'panel',
                        width: 390,
                        layout: 'fit',
                        border: false,
                        padding: 3,
                        items: [{
                            xtype: 'gridpanel',
                            stateful: true,
                            stateId: 'stateful-filter-grid',
                            border: false,
                            hideHeaders: true,
                            store: gant_header_store,
                            viewConfig: {
                                stripeRows: false
                            },
                            columns: [{
                                text: 'Company',
                                sortable: false,
                                dataIndex: 'id',
                                hidden: true
                            }, {
                                text: 'Name',
                                sortable: false,
                                dataIndex: 'name',
                                width: 270,
                            }, {
                                width: 110,
                                xtype: 'widgetcolumn',
                                dataIndex: 'vlc',
                                widget: {
                                    width: 100,
                                    textAlign: 'center',
                                    xtype: 'datefield',
                                    border: false
                                    //handler: function (btn) {
                                    //    var rec = btn.getWidgetRecord();
                                    //    //Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
                                    //    Ext.MessageBox.prompt('Увага', 'Введіть ID розсилки:', function (mp) { });
                                    //}
                                }
                            }]
                        }]
                    }, {
                        xtype: 'panel',
                        flex: 1,
                        padding: 2,
                        items: [
                            gridgant
                        ]
                    }]
                }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Показати графік',
            listeners: {
                'click': function () {
                    var grid = Ext.getCmp('gridgant');
                    do {
                        var col = grid.headerCt.getComponent(grid.getColumns().length - 1);
                        grid.headerCt.remove(col);
                        grid.getView().refresh();
                    }
                    while (grid.getColumns().length > 0);

                    var i = 0;
                    do {
                        var column = Ext.create('Ext.grid.column.Column', {
                            text: 'h', width: 30
                        });
                        grid.headerCt.insert(grid.columns.length, column);

                        i++;
                    } while (i <= 20);

                    grid.getView().refresh();

                    i = 0;
                    do {
                        if (i > 3 && i < 10) {
                            var cellgrid = grid.getView().getCell(5, i);
                            cellgrid.addCls('cell-red-run');
                        }
                        if (i >= 10 && i < 15) {
                            var cellgrid = grid.getView().getCell(6, i);
                            cellgrid.addCls('cell-red-run');
                        }
                        i++;
                    } while (i <= 20);

                }
            }
        }, {
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    //var term = {
                    //    campaign_id: campaign_id,
                    //    campaign_terms_short: Ext.getCmp('campaign_terms_short').getValue(),
                    //    campaign_terms_details: Ext.getCmp('campaign_terms_details').getValue()
                    //}

                    //Ext.Ajax.request({
                    //    url: 'api/term',
                    //    method: 'POST',
                    //    params: { callType: 'setData' },
                    //    jsonData: term,
                    //    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    //    success: function (a) {
                    //        //grid_campaigns_terms.getStore().load();
                    //        Ext.getCmp('grid_campaign_terms').getStore().load();
                    //        Ext.getCmp('campaign_terms_short').setValue('');
                    //        Ext.getCmp('campaign_terms_details').setValue('');
                    //        win_add_terms.close();
                    //    },
                    //    failure: function (error) {

                    //    }
                    //});
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    wintmpl.close();
                }
            }
        }]
    })

    //var wintemplate = function (template_id) {



    //    clearColumnGridGant();

    //    return wintmpl;        
    //}

    //wintmpl.show();
    //return wintemplate;
    return wintmpl;
}