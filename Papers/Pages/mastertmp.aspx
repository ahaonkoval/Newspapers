<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mastertmp.aspx.cs" Inherits="Papers.Pages.mastertmp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>

    </title>
    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/stores.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/models.js"></script>

    <script type="text/javascript" src="../Scripts/code/administration/goods.js"></script>
    <script type="text/javascript" src="../Scripts/code/administration/goodgrid.js"></script>    

    <script type="text/javascript" src="../Scripts/code/administration/user.js"></script>
    <script type="text/javascript" src="../Scripts/code/administration/usergrid.js"></script>

    <script type="text/javascript" src="../Scripts/code/mastertmp/fillcell.js"></script>
    <script type="text/javascript" src="../Scripts/code/mastertmp/dw.js"></script>
    <script type="text/javascript" src="../Scripts/code/mastertmp/showgoods.js"></script>
    <script type="text/javascript" src="../Scripts/code/mastertmp/mastertmpstore.js"></script>

    <link rel="stylesheet" type="text/css" href="../Scripts/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
    <link rel="stylesheet" type="text/css" href="../css/cellcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/gtmpcell.css" />
</head>
<body>
    <script>

        var Router = {
            home: window.location.origin,

            getHome: function () {
                if (window.location.host == window.location.hostname) {
                    var m = window.location.pathname.split('/')
                    return window.location.origin + '/' + m[1];
                } else {
                    return window.location.origin;
                }
            }
        };

        Ext.onReady(function () {

            var pQtyFillCell = Ext.create('Ext.form.Panel', {
                xtype: 'panel',
                id: 'pQtyFillCell',
                height: 35,
                border: false,
                margin: 5,
                html: 'Кількість заповнених клітинок:'
            });

            var wctrl = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [{
                    region: 'north',
                    border: false,
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
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    }, 
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: 'Призначення товарів клітинкам',
                            items: [getDataViewPageCells(pQtyFillCell)]
                        }, {
                            xtype: 'panel',
                            width: 200,
                            margin: 2,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items: [
                                //{
                                //    xtype: 'panel',
                                //    id: 'pQtyFillCell',
                                //    height: 35,
                                //    border: false,
                                //    html: 'Кількість заповнених клітинок:'
                                //}
                                pQtyFillCell, {
                                    xtype: 'panel',
                                    height: 40,
                                    border: false,
                                    layout: 'fit',
                                    margin: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Заповнити наступну клітинку',
                                            handler: function () {
                                                var view = Ext.getCmp('viewPageCells');
                                                var store = view.getStore();
                                                var cell = null;

                                                var i = 1;
                                                while (i <= store.getCount()) {
                                                    var c = store.findRecord('PagePosition', i);
                                                    if (c != null) {
                                                        if (!c.data.Isfill) {
                                                            getWinFillCell(c, 'Заповнення клітинки №').show();
                                                            return;
                                                        }
                                                    }
                                                    i++;
                                                }
                                            }
                                        }
                                    ]
                                }, {
                                    xtype: 'panel',
                                    height: 40,
                                    border: false,
                                    layout: 'fit',
                                    margin: 2,
                                    //flex: 1,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Переглянути список',
                                            handler: function () {
                                                getWinPageGoodReport().show();
                                            }
                                        }
                                    ]
                                }, {
                                    xtype: 'panel',
                                    flex: 1,
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    height: 40,
                                    margin: 2,
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'button',
                                        text: 'Повернутись',
                                        handler: function () {
                                            window.location.href = Router.getHome()+"/pages/storyboard.aspx";
                                        }
                                    }]
                                }
                            ]
                        }
                    ]
                }],
                listeners: {
                    staterestore: function (ctrl, eOpts) {
                        //var view = Ext.getCmp('viewPageCells');
                        //var store = view.getStore()
                        //var p = Ext.getCmp('pQtyFillCell');
                        //p.setHtml(store.getCount());
                    }
                }
            });
        });

        Ext.override(Ext.Window, {
            closeAction: 'hide'
        });



    </script>
</body>
</html>
