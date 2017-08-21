
var getWinNewSprint = function (view) {

    var store = view.getStore();
    var storeDeparts = getStoreDictDeparts();

    var gridLeft = Ext.create('Ext.grid.Panel', {
        store: storeDeparts,
        columns: [
            { text: '№', dataIndex: 'id', width: 50 },
            { text: 'Відділ', dataIndex: 'name', width: 250 },
        ],
        listeners: {
            itemdblclick: function (ctrl, record, item, index, e, eOpts) {
                //cell_rec.set('otd_id', record.data.id);
                //cell_rec.set('name', record.data.name);
                //cell_rec.commit()
                //win.hide();
            }
        }
    });

    var gridRight = Ext.create('Ext.grid.Panel', {
        store: storeDeparts,
        columns: [
            { text: '№', dataIndex: 'id', width: 50 },
            { text: 'Відділ', dataIndex: 'name', width: 250 },
        ],
        listeners: {
            itemdblclick: function (ctrl, record, item, index, e, eOpts) {
                //cell_rec.set('otd_id', record.data.id);
                //cell_rec.set('name', record.data.name);
                //cell_rec.commit()
                //win.hide();
            }
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Створення розвороту',
        width: 620,
        height: 450,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    { xtype: 'panel', flex: 1, items: [gridLeft], title: 'Ліва' },
                    { xtype: 'panel', flex: 1, items: [gridRight], title: 'Права' }
                ],
                buttons: [
                    {
                        xtype: 'button', text: 'Створити',
                        handler: function () {
                            var left = gridLeft.getSelection();
                            var right = gridRight.getSelection();

                            if (left.length == 0)
                            {
                                Ext.Msg.alert('Увага!', 'Не вибраний відділ для лівої сторінки'); return;
                            };
                            if (right.length == 0)
                            {
                                Ext.Msg.alert('Увага!', 'Не вибраний відділ для правої сторінки'); return;
                            };

                            var max = store.max('id', false);
                            var min = store.min('id', false);

                            var last = store.findRecord('id', max)
                            var first = store.findRecord('id', min)

                            var o = store.add({
                                id: max + 1,
                                departs1: left[0].data.id,
                                departs2: right[0].data.id,
                                p1: last.data.p2 + 1,
                                p2: last.data.p2 + 2
                            });

                            o[0].commit()

                            first.set('p1', last.data.p2 + 3);
                            first.commit();

                            win.close();
                        }
                    },
                    {
                        xtype: 'button', text: 'Відміна',
                        handler: function () {
                            win.close();
                        }
                    }
                ]
            }
        ]
    });

    return win;
}