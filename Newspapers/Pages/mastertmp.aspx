<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mastertmp.aspx.cs" Inherits="Newspapers.Pages.mastertmp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>

    </title>
    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/dictstore.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/models.js"></script>

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
        Ext.onReady(function () {


            //Ext.create('Ext.window.Window', {
            //    title: 'Призначення товарів клітинкам...',
            //    width: 1000,
            //    height: 800,
            //    closable: false,
            //    layout: {
            //        type: 'hbox',
            //        pack: 'start',
            //        align: 'stretch'
            //    },                
            //    items: [
            //        {
            //            xtype: 'panel',
            //            flex: 1,
            //            layout: 'fit',
            //            items: [getDataViewPageCells()]
            //        }, {
            //            xtype: 'panel',
            //            width: 200
            //        }
            //    ]
            //}).show();

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
                            items: [getDataViewPageCells()]
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
                                {
                                    xtype: 'panel',
                                    height: 35,
                                    border: false,
                                    html: 'Кількість заповнених клітинок:'
                                }, {
                                    xtype: 'panel',
                                    height: 40,
                                    border: false,
                                    layout: 'fit',
                                    margin: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Редагувати клітинку'
                                        }
                                    ]
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    flex: 1
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
                                            alert();
                                        }
                                    }]
                                }
                            ]
                        }
                    ]
                }]
            });
        });

        Ext.override(Ext.Window, {
            closeAction: 'hide'
        });
    </script>
</body>
</html>
