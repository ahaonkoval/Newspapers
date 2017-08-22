
var topmenu = Ext.create('Ext.panel.Panel', {
    xtype: 'panel',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
            {
                xtype: 'panel',
                border: false,
                width: 200,
                height: 30,
                padding: 7,               
                items: [{
                    xtype: 'splitbutton',
                    text: 'Адміністрування',
                    menu: [{
                        text: 'Користувачі (управління доступом)',
                        handler: function () {
                            getUserAdm();
                        }
                    }, {
                        text: 'Адміністрування товарів',
                        handler: function () {
                            getWinGoodsAdm();
                        }
                    }]
                }]
            },
            {
                xtype: 'panel',
                border: false,
                flex: 1,
                items: {
                    xtype: 'panel',
                    border: false
                }
            }, {
                xtype: 'panel',
                width: 100,
                border: false,
                padding: 10,
                items: [{
                    html: '<a title="Click to do something" href="Login.aspx" onclick="getout();">Вихід</a>',
                    border: false
                }]
            }
    ],
    listeners: {
        afterrender: function (crtl, eOpts) {
            //var Access = sessionStorage.getItem("acc").split(',');
            //if (Access.includes('Admin')) {
            //    topmenu.items.items[0].setHidden(false);
            //} else {
            //    topmenu.items.items[0].setHidden(true);
            //}
        }
    }
});

var getout = function () {
    window.location.href = "Login.aspx";
}