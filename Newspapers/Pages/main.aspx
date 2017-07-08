<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="Newspapers.Pages.main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Створення газет</title>

    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/grid.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/winpapers.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/models.js"></script>
    <script type="text/javascript" src="../Scripts/code/wintemplate/wintemplate.js"></script>
    <script type="text/javascript" src="../Scripts/code/wintemplate/gridgant.js"></script>

    <link rel="stylesheet" type="text/css" href="../Scripts/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
    <link rel="stylesheet" type="text/css" href="../css/cellcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/gtmpcell.css" />

</head>
<body>
    <script>
        Ext.onReady(function () {
            var wctrl = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [{
                    region: 'north',
                    //html: '<h1 class="x-panel-header">Page Title</h1>',
                    border: false,
                    //margin: '0 0 5 0',
                    layout:'fit',
                    items: [{
                        xtype: 'panel',
                        height: 40,
                        layout:'fit',
                        items: [
                            topmenu
                        ]
                    }]
                }, {
                    region: 'center',
                    xtype: 'panel', // TabPanel itself has no title
                    layout: 'center',
                    items: [{
                        extend: 'Ext.panel.Panel',
                        requires: [
                            'Ext.layout.container.Card'
                        ],
                        //xtype: 'layout-card',
                        layout: 'card',
                        width: 600,
                        height: 400,
                        title:'Газети',
                        bodyPadding: 15,

                        defaults: {
                            border: true
                        },

                        defaultListenerScope: true,

                        bbar: ['->',
                            {
                                itemId: 'card-prev',
                                text: '&laquo; Назад',
                                handler: 'showPrevious',
                                disabled: true,
                                width: 100
                            },
                            {
                                itemId: 'card-next',
                                text: 'Далі &raquo;',
                                handler: 'showNext',
                                width: 100
                            }
                        ],

                        items: [
                            {
                                id: 'card-0',
                                border: false,
                                layout: {
                                    type: 'vbox',
                                    pack: 'start',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        name: 'numberfield1',
                                        fieldLabel: 'Рік виходу',
                                        value: 2017,
                                        minValue: 2016,
                                        maxValue: 2050,
                                        stepValue: 1,
                                        fieldStyle: 'text-align: center;'
                                        //textAlign: 'right'

                                        //xtype: 'panel',
                                        //height: 30,
                                        //bodyPadding: 2,
                                        //items: [{
                                        //    xtype: 'combobox',
                                        //    fieldLabel: 'Рік',
                                        //    labelWidth: 50,
                                        //    displayField: 'name',
                                        //    valueField: 'id',
                                        //    width: 150,
                                        //    store: 
                                        //        Ext.create('Ext.data.Store', {
                                        //            fields: ['id', 'name'],
                                        //            model: 'Years',
                                        //            data: [
                                        //                { "id": "2016", "name": "2016" },
                                        //                { "id": "2017", "name": "2017" },
                                        //                { "id": "2018", "name": "2018" },
                                        //                { "id": "2019", "name": "2019" },
                                        //                { "id": "2020", "name": "2020" },
                                        //                { "id": "2021", "name": "2021" },
                                        //                { "id": "2022", "name": "2022" },
                                        //                { "id": "2023", "name": "2023" },
                                        //                { "id": "2024", "name": "2024" }
                                        //            ]
                                        //        })
                                        //}]
                                    }, {
                                        xtype: 'panel',
                                        flex: 1,
                                        bodyPadding: 50,
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                //fieldLabel: 'Auto Layout',
                                                cls: 'x-check-group-alt',
                                                columns: [500, 300],
                                                vertical: true,
                                                items: [
                                                    { boxLabel: 'Січень', name: 'rb-auto', inputValue: 1 },
                                                    { boxLabel: 'Лютий', name: 'rb-auto', inputValue: 2 },
                                                    { boxLabel: 'Березень', name: 'rb-auto', inputValue: 3 },
                                                    { boxLabel: 'Квітень', name: 'rb-auto', inputValue: 4 },
                                                    { boxLabel: 'Травень', name: 'rb-auto', inputValue: 5 },
                                                    { boxLabel: 'Червень', name: 'rb-auto', inputValue: 6 },
                                                    { boxLabel: 'Липень', name: 'rb-auto', inputValue: 7 },
                                                    { boxLabel: 'Серпень', name: 'rb-auto', inputValue: 8 },
                                                    { boxLabel: 'Вересень', name: 'rb-auto', inputValue: 9 },
                                                    { boxLabel: 'Жовтень', name: 'rb-auto', inputValue: 10 },
                                                    { boxLabel: 'Листопад', name: 'rb-auto', inputValue: 11 },
                                                    { boxLabel: 'Грудень', name: 'rb-auto', inputValue: 12 }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'card-1',
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
                                        items: [
                                            getPapersGrid()
                                        ]
                                    }, {
                                        xtype: 'panel',
                                        width: 150,
                                        bodyPadding: 5,
                                        items: [
                                            {
                                                xtype: 'button',
                                                width: '100%',                                                
                                                text: 'Нова',
                                                margin: 1,
                                                listeners: {
                                                    click: function () {
                                                        getCreateEditNewspapers().show();                                                        
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                width: '100%',                                                
                                                text: 'Редагувати шаблон',
                                                margin: 1
                                            }, {
                                                xtype: 'button',
                                                width: '100%',
                                                text: 'Дати виконання',
                                                margin: 1,
                                                listeners: {
                                                    click: function () {
                                                        //getCreateEditNewspapers();
                                                        var wnd = getCreateEditNewspapers();
                                                        wnd.show();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],

                        showNext: function () {
                            this.doCardNavigation(1);
                        },

                        showPrevious: function (btn) {
                            this.doCardNavigation(-1);
                        },

                        doCardNavigation: function (incr) {
                            var me = this;
                            var l = me.getLayout();
                            var i = l.activeItem.id.split('card-')[1];
                            var next = parseInt(i, 10) + incr;
                            l.setActiveItem(next);

                            me.down('#card-prev').setDisabled(next === 0);
                            me.down('#card-next').setDisabled(next === 1);
                        }

                    }]
                }]
            });

            window.viewport = wctrl;

            /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            Ext.override(Ext.Window, {
                closeAction: 'hide'
            })
            /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

        });
    </script>
</body>
</html>
