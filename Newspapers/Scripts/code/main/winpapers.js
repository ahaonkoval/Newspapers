
var winpapers = function () {

    var win = Ext.create('Ext.Window', {
        title: 'Адміністрування користувачів',
        width: 800,
        height: 600,
        modal: true,
        closable: false,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            layout: 'fit',
            items: [
                getPapersGrid()
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    //var useradd = get_useradd();
                    //useradd.show();
                }
            }
        }//, btnSave
        , {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    //win.close();
                }
            }
        }]
    });

    return win;
}