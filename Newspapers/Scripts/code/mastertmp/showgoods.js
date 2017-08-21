
var getWinPageGoodReport = function () {

    win = Ext.create('Ext.Window', {
        title: 'Перелік товарів сторінки',
        width: '90%',
        height: '90%',
        modal: true,
        closable: true,
        constrain: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            layout: 'fit',
            items: [{
                xtype: 'box',
                layout: 'fit',
                showMask: true,
                autoEl: {
                    tag: 'iframe',
                    src: '../reports/pages/goodlist.aspx'
                }
            }]
        }],

        buttons: [{
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                }
            }
        }]
    })

    return win;
}
