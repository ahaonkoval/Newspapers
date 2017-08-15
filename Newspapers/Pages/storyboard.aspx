<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="storyboard.aspx.cs" Inherits="Newspapers.Pages.storyboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>
        Управління сторінками...
    </title>

    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/storyboard/windepartpage.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>
    <script type="text/javascript" src="../Scripts/code/storyboard/storyboardstore.js"></script>

    <script type="text/javascript" src="../Scripts/code/administration/goods.js"></script>
    <script type="text/javascript" src="../Scripts/code/administration/goodgrid.js"></script>    

    <script type="text/javascript" src="../Scripts/code/administration/user.js"></script>
    <script type="text/javascript" src="../Scripts/code/administration/usergrid.js"></script>

    <link rel="stylesheet" type="text/css" href="../Scripts/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
    <link rel="stylesheet" type="text/css" href="../css/cellcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/gtmpcell.css" />


</head>
<body>
    <script>

        var cursorX;
        var cursorY;

        document.onmousemove = function (e) {
            cursorX = e.pageX;
            cursorY = e.pageY;
        }

        var fth_click = function (ctrl, side) {
            var page_id = parseInt(ctrl.id.replace('page', ''));
            var lst = Ext.getCmp('lst_pages')
            var store = lst.getStore();

            var index = store.findBy(function (record) {
                return record.data.p1 == page_id || record.data.p2 == page_id;
            });
            var record = store.getAt(index);
            /* відображаємо параметри активної сторінки */
            Ext.getCmp('pnl_act_page').setTitle('Активна сторінка');
            if (side == 1) {
                Ext.getCmp('pnl_act_page').setHtml(
                    '<div class="act-page-info">Активна сторінка: ' + page_id + ' </div>'
                    + '<div class="act-page-info">Відділ: ' + record.data.departs1 + ' </div>'
                    );
            }
            if (side == 2) {
                Ext.getCmp('pnl_act_page').setHtml(
                    '<div class="act-page-info">Активна сторінка: ' + page_id + ' </div>'
                    + '<div class="act-page-info">Відділ: ' + record.data.departs2 + ' </div>'
                    );
            }
            /* переміщаємо виділення сторінки */
            store.each(function (record, id) {
                $('#page' + record.data.p1).attr('style', 'background: #ffffff');
                $('#page' + record.data.p2).attr('style', 'background: #ffffff');
            });
            $('#' + ctrl.id).attr('style', 'background: #eeeeee');
        };

        var fth_dbclick = function (ctrl, side) {
            var id = parseInt(ctrl.id.replace('page', ''));

            var lst = Ext.getCmp('lst_pages')
            var store = lst.getStore();

            var index = store.findBy(function (record) {
                return record.data.p1 == id || record.data.p2 == id;
            });
            
            var rec = store.getAt(index);
            /*
                В залежності від доступу користовача створююється меню, чи відразу відкривається призначення товарів в клітинки
            */
            Ext.create('Ext.menu.Menu', {
                //width: 100,
                //height: 0,
                margin: '0 0 10 0',
                items: [
                    {
                        text: 'Призначення відділів на сторінці №' + id,
                        handler: function () {
                            getWinDepartCell().show();
                        }
                    },{
                        text: 'Призначення товарів на сторінці №' + id,
                        handler: function () {
                            window.location.href = "../pages/mastertmp.aspx";
                        }
                    }]
            }).showAt(
                cursorX, cursorY
            );
        };

        Ext.onReady(function () {

            var wctrl = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [{
                    region: 'north',
                    //html: '<h1 class="x-panel-header">Page Title</h1>',
                    border: false,
                    //margin: '0 0 5 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'panel',
                        height: 40,
                        layout: 'fit',
                        items: [
                            topmenu
                        ]
                    }]
                }, {
                    region: 'center',
                    xtype: 'panel', // TabPanel itself has no title
                    layout: 'center'
                }]
            });

            var panel_act = Ext.create('Ext.panel.Panel', {
                id: 'pnl_act_page',
                xtype: 'panel',
                //title: 'Активна сторінка',
                height: 150,
                layout: 'fit',
                border: false
            });

            Ext.create('Ext.window.Window', {
                title: 'Перегляд стрінок газети...',
                height: 600,
                width: 810,
                layout: 'fit',
                closable: false,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'panel',
                    autoScroll: true,
                    flex: 1,
                    items: [{
                        xtype: 'dataview',
                        id: 'lst_pages',
                        store: getDataStorePapersPage(), 
                        tpl: [
                            '<tpl for=".">',

                                '<div class="conteiner-paper-item">',

                                    '<div class="page-paper">',
                                        "<div class='page-paper-conteiner' id=page{p2} ondblclick='fth_dbclick(this, 2);' onclick='fth_click(this, 2);'>",
                                            '<div class="page-paper-inner-head">',
                                                'Перелік департаментів на сторінці: {departs2}',
                                             '</div>',
                                            '<div class="page-paper-inner-bottom">{p2}</div>',
                                        '</div>',
                                    '</div>',

                                    '<div class="page-paper">',
                                        '<div class="page-paper-conteiner" id=page{p1} ondblclick="fth_dbclick(this, 1);" onclick="fth_click(this, 1);">',
                                            '<div class="page-paper-inner-head">',
                                                'Перелік департаментів на сторінці: {departs1}',
                                            '</div>',
                                            '<div class="page-paper-inner-bottom">{p1}</div>',
                                        '</div>',
                                    '</div>',

                                '</div>',

                            '</tpl>'],
                        //multiSelect: false,
                        singleSelect: true,
                        trackOver: true,
                        overItemCls: 'x-item-over',
                        itemSelector: 'div.conteiner-paper-item',
                        emptyText: 'No images to display',
                        listeners: {
                            //click: {
                            //    element: 'el', //bind to the underlying el property on the panel
                            //    fn: function () {
                            //        //console.log('click el');
                            //    }
                            //},
                            //dblclick:
                            //{
                            //    element: 'el', 
                            //    fn: function (event, b, c) {
                            //        //console.log('dblclick body');
                            //        //departset();
                            //        Ext.create('Ext.menu.Menu', {
                            //            width: 100,
                            //            height: 100,
                            //            margin: '0 0 10 0',
                            //            items: [{
                            //                text: 'regular item 1'
                            //            },
                            //              {
                            //                  text: 'regular item 2'
                            //              },
                            //               {
                            //                   text: 'regular item 3'
                            //               }]
                            //        }).showAt(event.getXY());
                            //    }
                            //},
                            selectionchange: function (record, item, index, e) {
                                //Ext.getCmp('btnMenuPage_1').setText('Сторінка № ' + item[0].data.p1);
                                //Ext.getCmp('btnMenuPage_2').setText('Сторінка № ' + item[0].data.p2);
                            }

                        }
                    }]

                }, {
                    xtype: 'panel',
                    width: 180,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [{
                                xtype: 'panel',
                                flex: 1,
                                bodyPadding: 2,
                                //layout: 'form',
                                items: [
                                    {
                                        xtype: 'panel',
                                        border: false,
                                        height: 30,
                                        items: [{
                                            xtype: 'button',
                                            width: 170,
                                            height: 28,
                                            text: 'Новий розворот',
                                            margin: 2,
                                            listeners: {
                                                click: function () {
                                                    
                                                }
                                            }
                                        }]
                                    }, {
                                        xtype: 'panel',
                                        border: false,
                                        height: 30,
                                        items: [{
                                            xtype: 'button',
                                            width: 170,
                                            height: 28,
                                            text: 'Призначення відділів',
                                            margin: 2,
                                            listeners: {
                                                click: function () {
                                                    getWinDepartCell().show();
                                                }
                                            }
                                            //menu: [{
                                            //    id: 'btnMenuPage_1',
                                            //    text: 'Сторінка № '
                                            //}, {
                                            //    id: 'btnMenuPage_2',
                                            //    text: 'Сторінка № '
                                            //}]
                                        }]
                                    }, {
                                        xtype: 'panel',
                                        border: false,
                                        height: 30,
                                        items: [{
                                            xtype: 'button',
                                            width: 170,
                                            height: 28,
                                            text: 'Шаблон сторінки',
                                            margin: 2,
                                            listeners: {
                                                click: function () {
                                                    window.location.href = "../pages/mastertmp.aspx";
                                                }
                                            }
                                        }]
                                    }, panel_act
                                        //{
                                        //xtype: 'panel',
                                        //title: 'Активна сторінка',                                        
                                        //height: 200,
                                        //layout: 'fit',
                                        //border: false,
                                        //items: [
                                        //    {
                                        //        xtype: 'panel',
                                        //        layout: 'anchor',
                                        //        margin: 2,
                                        //        border: false,
                                        //        items: [{
                                        //            id: 'txt_actpage',
                                        //            xtype: 'textfield',
                                        //            fieldLabel: '№ стрінки',
                                        //            labelWidth: 65,
                                        //            anchor: '100%',
                                        //            readOnly: true
                                        //        }, {
                                        //            id: 'txt_listdeparts',
                                        //            xtype: 'textareafield',
                                        //            name: 'textarea1',
                                        //            fieldLabel: 'Відділи на сторінці',
                                        //            //value: 'Textarea value',
                                        //            labelAlign: 'top',
                                        //            anchor: '100%',
                                        //            readOnly: true,
                                        //            heigth:30,
                                        //            disabled: true
                                        //        }]
                                        //    }
                                        //]
                                    //}
                                ]
                            }, {
                                xtype: 'panel',
                                width: 150,
                                border: false,
                                bodyPadding: 2,
                                items: [{
                                    xtype: 'panel',
                                    border: false,
                                    items: [{
                                        xtype: 'button',
                                        width: '100%',
                                        text: 'Повернутись',
                                        handler: function () {
                                            alert();
                                        }
                                    }]
                                }]
                            }
                        ]
                }]
            }).show();

            Ext.override(Ext.Window, {
                closeAction: 'hide'
            });
            
        });
    </script>
</body>
</html>
