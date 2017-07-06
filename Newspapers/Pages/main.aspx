<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="Newspapers.Pages.main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Створення газет</title>

    <script type="text/javascript" src="../Scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/grid.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/topmenu.js"></script>
    <script type="text/javascript" src="../Scripts/code/main/winpapers.js"></script>
    <script type="text/javascript" src="../Scripts/code/data/models.js"></script>

    <link rel="stylesheet" type="text/css" href="../Scripts/ext/classic/theme-crisp/resources/theme-crisp-all.css" />

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
                        width: 500,
                        height: 400,

                        bodyPadding: 15,

                        defaults: {
                            border: false
                        },

                        defaultListenerScope: true,

                        bbar: ['->',
                            {
                                itemId: 'card-prev',
                                text: '&laquo; Previous',
                                handler: 'showPrevious',
                                disabled: true
                            },
                            {
                                itemId: 'card-next',
                                text: 'Next &raquo;',
                                handler: 'showNext'
                            }
                        ],

                        items: [
                            {
                                id: 'card-0',
                                //html: '<h2>Welcome to the Demo Wizard!</h2><p>Step 1 of 3</p><p>Please click the "Next" button to continue...</p>'
                            },
                            {
                                id: 'card-1',
                                //html: '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
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
                            me.down('#card-next').setDisabled(next === 2);
                        }

                    }]
                }],
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

                    me.down('#card-prev').setDisabled(next===0);
                    me.down('#card-next').setDisabled(next===2);
                }
                //listeners: {
                //    afterrender: function (parent, eOpts) {
                //        //winpapers().show();
                //    }
                //}                    
            });

            window.viewport = wctrl;

            //winpapers();
        });
    </script>
</body>
</html>
