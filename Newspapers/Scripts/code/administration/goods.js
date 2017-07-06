
var goodsadm = function () {

    wingoodsadm = Ext.create('Ext.Window', {
        title: 'Адміністрування товарів',
        width: 800,
        height: 600,
        modal: true,
        closable: true,
        layout: 'fit',
        //{
        //    type: 'fix'
        //    //align: 'stretch',
        //    //pack: 'start',
        //},
        items: [{
            xtype: 'panel',
            items: [goodgrid]
        }],
        //goodgrid
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {

                }
            }
        }, {
            xtype: 'button',
            text: 'Зберегти зміни',
            listeners: {
                'click': function () {
                    //var term = {
                    //    campaign_id: campaign_id,
                    //    campaign_terms_short: Ext.getCmp('campaign_terms_short').getValue(),
                    //    campaign_terms_details: Ext.getCmp('campaign_terms_details').getValue()
                    //}

                    //Ext.Ajax.request({
                    //    url: 'api/term',
                    //    method: 'POST',
                    //    params: { callType: 'setData' },
                    //    jsonData: term,
                    //    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    //    success: function (a) {
                    //        //grid_campaigns_terms.getStore().load();
                    //        Ext.getCmp('grid_campaign_terms').getStore().load();
                    //        Ext.getCmp('campaign_terms_short').setValue('');
                    //        Ext.getCmp('campaign_terms_details').setValue('');
                    //        win_add_terms.close();
                    //    },
                    //    failure: function (error) {

                    //    }
                    //});
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    wingoodsadm.close();
                }
            }
        }]
    })

    wingoodsadm.show();
}
