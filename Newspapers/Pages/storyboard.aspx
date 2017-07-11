<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="storyboard.aspx.cs" Inherits="Newspapers.Pages.storyboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>

    </title>

    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/storyboard/depart.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>   

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

            function getDataStore() {

                var store_papers = Ext.create('Ext.data.Store', {
                    fields: ['id', 'name'],
                    data: [
                        { "id": "1", "departs": "10", "p1": "22", "p2": "1" },
                        { "id": "2", "departs": "20", "p1": "2", "p2": "3" },
                        { "id": "3", "departs": "30", "p1": "4", "p2": "5" },
                        { "id": "4", "departs": "40", "p1": "6", "p2": "7" },
                        { "id": "5", "departs": "50", "p1": "8", "p2": "9" },
                        { "id": "6", "departs": "60", "p1": "10", "p2": "11" },
                        { "id": "7", "departs": "70", "p1": "12", "p2": "13" },
                        { "id": "8", "departs": "80", "p1": "14", "p2": "15" },
                        { "id": "9", "departs": "90", "p1": "16", "p2": "17" },
                        { "id": "10", "departs": "100", "p1": "18", "p2": "19" },
                        { "id": "11", "departs": "800", "p1": "20", "p2": "21" }
                    ],
                    model: Ext.define('model_dept', {
                        extend: 'Ext.data.Model',
                        fields: [{
                            name: 'id', type: 'int'
                        }, {
                            name: 'departs', type: 'string'
                        }, {
                            name: 'p1', type: 'string'
                        }, {
                            name: 'p2', type: 'string'
                        }]
                    })
                });

                return store_papers;
            };

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
                    //html: '<div id="dataview-example"></div>',
                    autoScroll: true,
                    flex: 1,
                    items: [{
                        xtype: 'dataview',
                        //width: 600,
                        store: getDataStore(),  //evaluate this also
                        tpl: [
                            '<tpl for=".">',
                                '<div class="conteiner-paper-item">',
                                    '<div class="page-paper">',
                                        "<div class='page-paper-inner' id=page{p1}'>",
                                        '{departs}',
                                        '</div>',
                                    '</div>',
                                    '<div class="page-paper">',
                                        '<div class="page-paper-inner" id=page{p2}>',
                                        '{departs}',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</tpl>'],
                        multiSelect: false,
                        trackOver: true,
                        overItemCls: '',
                        itemSelector: 'div.conteiner-paper-item',
                        emptyText: 'No images to display',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function () {
                                    //console.log('click el');
                                }
                            },
                            dblclick: 
                            {
                                element: 'el', //bind to the underlying body property on the panel
                                fn: function () { console.log('dblclick body'); }
                            }
                        }
                    }]

                }, {
                    xtype: 'panel',
                    width: 150
                }]
            }).show();

            Ext.override(Ext.Window, {
                closeAction: 'hide'
            });
        });
    </script>
</body>
</html>
