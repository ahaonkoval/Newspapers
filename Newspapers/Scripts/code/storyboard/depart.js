
var departset = function () {

    var row_height = 160;

    var deptCellEditing = new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 });

    var store_dept = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data: [
            { "id": "10", "name": "10 (САД, ГОРОД)" },
            { "id": "20", "name": "20 (ІНСТРУМЕНТИ)" },
            { "id": "30", "name": "30 (ЕЛЕКТРОТЕХНІКА)" },
            { "id": "40", "name": "40 (ВИРОБИ З МЕТАЛУ)" },
            { "id": "50", "name": "50 (ДЕКОР)" },
            { "id": "60", "name": "60 (ПОКРИТТЯ ДЛЯ ПІДЛОГИ)" },
            { "id": "70", "name": "70 (САНТЕХНІКА)" },
            { "id": "80", "name": "80 (ВИРОБИ З ДЕРЕВА)" },
            { "id": "90", "name": "90 (БУДІВЕЛЬНІ МАТЕРІАЛИ)" },
            { "id": "100", "name": "100 (ДЕКО)" },
            { "id": "800", "name": "800 (ІНТЕРСПОРТ)" }
        ],
        model: Ext.define('model_dept', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }]
        })
    });

    windepartset = Ext.create('Ext.Window', {
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
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    items: [
                                                {
                                                    xtype: 'combobox',
                                                    width: '100%',
                                                    store: store_dept,
                                                    displayField: 'name',
                                                    valueField: 'id'
                                                }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            height: row_height,
            border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //    xtype: 'combobox',
                        //    width: '100%',
                        //    store: store_dept,
                        //    displayField: 'name',
                        //    valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //    xtype: 'combobox',
                        //    width: '100%',
                        //    store: store_dept,
                        //    displayField: 'name',
                        //    valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                            //xtype: 'combobox',
                            //width: '100%',
                            //store: store_dept,
                            //displayField: 'name',
                            //valueField: 'id'
                        //}
                    ]
                }
            ]
        }, {
            xtype: 'panel',
            height: row_height,
            border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                            //xtype: 'combobox',
                            //width: '100%',
                            //store: store_dept,
                            //displayField: 'name',
                            //valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //xtype: 'combobox',
                        //width: '100%',
                        //store: store_dept,
                        //displayField: 'name',
                        //valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                            //xtype: 'combobox',
                            //width: '100%',
                            //store: store_dept,
                            //displayField: 'name',
                            //valueField: 'id'
                        //}
                    ]
                }
            ]
        }, {
            xtype: 'panel',
            height: row_height,
            border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //    xtype: 'combobox',
                        //    width: '100%',
                        //    store: store_dept,
                        //    displayField: 'name',
                        //    valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //xtype: 'combobox',
                        //width: '100%',
                        //store: store_dept,
                        //displayField: 'name',
                        //valueField: 'id'
                        //}
                    ]
                }, {
                    flex: 1,
                    xtype: 'panel',
                    border: true,
                    padding: '3 3 3 3',
                    items: [
                        //{
                        //xtype: 'combobox',
                        //width: '100%',
                        //store: store_dept,
                        //displayField: 'name',
                        //valueField: 'id'
                        //}
                    ]
                }
            ]
        }],

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
                    windepartset.close();
                }
            }
        }]
    })

    windepartset.show();
}

/*
                {
                    xtype: 'panel',
                    flex: 1,                    
                    items: [{
                        xtype: 'gridpanel',
                        hideHeaders: true,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'name', 'otd'],
                            model: Ext.define('departset_model', {
                                extend: 'Ext.data.Model',
                                fields: [{
                                    name: 'id',
                                    type: 'int'
                                }, {
                                    name: 'name',
                                    type: 'string'
                                }, {
                                    name: 'otd',
                                    type: 'string'
                                }]
                            }),
                            data: [
                                { "id": "1", "name": "Ліня №1", "otd": "100 (ДЕКО)" },
                                { "id": "2", "name": "Ліня №2", "otd": "10 (САД-ГОРОД)" },
                                { "id": "3", "name": "Ліня №3", "otd": "10 (САД-ГОРОД)" },
                                { "id": "4", "name": "Ліня №4", "otd": "10 (САД-ГОРОД)" }
                            ]
                        }),
                        columns: [{
                            dataIndex: 'id',
                            width: 50
                        }, {
                            dataIndex: 'name',
                            width: 100
                        }, {
                            dataIndex: 'otd',
                            width: 200,
                            editor: new Ext.form.field.ComboBox({
                                store: [
                                    ['10', '10 (САД-ГОРОД)'],
                                    ['100', '100 (ДЕКО)']
                                ]
                            })
                        }],
                        plugins: [deptCellEditing]
                    }]
                }, {
                    xtype: 'panel',
                    width: 1,
                    border: false
                }
*/