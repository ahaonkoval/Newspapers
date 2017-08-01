
/*
    вікно для призначення відділів в кожну клітинку...
*/
var getWinDepartCell = function () {
    /* кожна клітинка відповідає клітнці на сторінці газети */
    var dataview = new Ext.create({
        xtype: 'dataview',
        store: getStoreCellDeparts(),
        tpl: [
            '<tpl for=".">',
                '<div class="conteiner-depart-cell">',
                    '<div class="page-paper-inner-head">',
                        'Товар відділу: {name}',
                    '</div>',
                    '<div class="page-paper-inner-bottom">{id}</div>',
                '</div>',
            '</tpl>'],
        singleSelect: true,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.conteiner-depart-cell',
        emptyText: 'No images to display',
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /* відкриваємо формочку зі списком відділів */
                    getWinSetDepartByCell(dataview).show();
                }
            },
        }
    });
    /**/
    var comboSelectDepart = new Ext.create({
        xtype: 'combobox',
        width: '100%',
        store: getStoreDictDeparts(),
        displayField: 'name',
        valueField: 'id',
        fieldLabel: 'Відділи',
        labelWidth: 45,
    });
    /* панель з компонентом клітинок сторінки */
    var ctrl = new Ext.create('Ext.panel.Panel', {
        xtype: 'panel',
        height: 480,
        border: false,
        layout: 'fit',
        padding: '3 3 3 3',
        margin: 15,
        items: [dataview]
    });
    /* віконце що відповідає за призначення клітоинок відділам */
    var windepartset = Ext.create('Ext.Window', {
        title: 'Розподілення клітинок',
        width: 800,
        height: 600,
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
        {
            xtype: 'panel',
            height: 40,
            padding: '3 3 3 3',
            border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'fit',
                    margin: 3,
                    items: [comboSelectDepart]
                }, {
                    xtype: 'panel',
                    width: 256,
                    margin: 3,
                    border: false,
                    items: [
                        {
                            xtype: 'button',
                            width: '100%',
                            text: 'Призначити всім',
                            height:28,
                            handler: function () {
                                /* призначаємо всім клітикнкам один відділ */
                                var store = dataview.getStore();
                                var dict_record = comboSelectDepart.getSelectedRecord();
                                if (dict_record != null) {
                                    store.each(function (record, id) {
                                        record.set('name', dict_record.data.name);
                                        record.set('otd_id', dict_record.data.id);
                                        record.commit();
                                    });
                                }
                            }
                        }
                    ]
                }
            ]
        },
        ctrl],

        buttons: [{
            xtype: 'button',
            text: 'Зберегти зміни',
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
                    windepartset.hide();
                }
            }
        }]
    })

    return windepartset;
};

var getWinSetDepartByCell = function (ctrl) {

    var selections = ctrl.getSelection();
    if (selections.length > 0)
        var cell_rec = selections[0];

    var grid = Ext.create('Ext.grid.Panel', {
        store: getStoreDictDeparts(),
        columns: [
            { text: '№', dataIndex: 'id', width: 50 },
            { text: 'Відділ', dataIndex: 'name', width: 250 },
        ],
        listeners: {
            itemdblclick: function (ctrl, record, item, index, e, eOpts) {
                cell_rec.set('otd_id', record.data.id);
                cell_rec.set('name', record.data.name);
                cell_rec.commit()
                win.hide();
            }
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Призначення клітинки',
        width: 310,
        height: 350,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [grid]
    });

    return win;
}