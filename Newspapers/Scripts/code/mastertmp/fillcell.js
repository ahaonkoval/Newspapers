

var getWinFillCell = function (record) {
    var data = record.data;

    var win = Ext.create('Ext.Window', {
        title: 'Додати артикул на сторінку',
        width: 800,
        height: 600,
        modal: true,
        closable: true,
        autoScroll: true,
        layout: 'form',
        //record: record,
        viewModel: {
            data: {
                rec: record
            }
        },
        items: [{
            xtype: 'combobox',
            //reference: 'states',
            publishes: 'value',
            fieldLabel: '№ відділу ',
            labelWidth: '30%',
            store: getStoreCellDeparts(),
            displayField: 'Name',
            valueField: 'OtdId',
            anchor: '-15',
            minChars: 0,
            //queryMode: 'local',
            typeAhead: true,
            bind: '{rec.OtdId}'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Департамент',
            bind: '{rec.Depart}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Артикул або група артикулів',
            bind: '{rec.Artlist}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Одиниця виміру',
            bind: '{rec.Unit}'
        }, {
            xtype: 'textfield',
            fieldLabel: '№ товару',
            bind:'{rec.Number}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Коротка назва товару',
            bind: '{rec.Short_name}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Бренд, торгова марка',
            bind: '{rec.Producer}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Країна-виробник',
            bind: '{rec.madein}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна закупівлі',
            bind: '{rec.price_buy}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна до акції з ПДВ',
            bind: '{rec.price_before_act}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна акційна, яка буде з ПДВ',
            bind: '{rec.price_act}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна від',
            bind: '{rec.price_start}'
        }, {
            xtype: 'textfield',
            fieldLabel: '% вигоди',
            bind: '{rec.profit_procent}',
            enabled: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Маржа %',
            bind: '{rec.margin}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна після акції з ПДВ',
            bind: '{rec.price_after_act}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Різниця між акційною ціною та ціною після акції %',
            bind: '{rec.diff_price}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Прогноз  прибутку, грн.',
            bind: '{rec.forecast_profit}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Прогноз  продажів у період акції, грн.',
            bind: '{rec.forecast_profit_act}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Технічні характеристики товару',
            bind: '{rec.specifiacations}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Гарантія, яка вказуються в характеристиках товару',
            bind: '{rec.garant}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Основні переваги товару',
            bind: '{rec.advantage}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Товарний запас',
            bind: '{rec.inventory}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція/конкурент',
            bind: '{rec.competitors}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція товар',
            bind: '{rec.competitive_product}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція/ціна',
            bind: '{rec.competitors_price}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'різниця між нашою ціною та ціною конкурента',
            bind: '{rec.diff_competitor_price}'
        }, {
            xtype: 'textfield',
            fieldLabel: '% різниці між нашою ціною та ціною конкурента',
            bind: '{rec.diff_competitor_price_prc}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Тип розміщення',
            bind: '{rec.placement_type}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Компенсація постачальником, грн.',
            bind: '{rec.compensation_sp}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Спеціальне розміщення',
            bind: '{rec.specil_placement}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'ПІБ менеджера, що заповнив таблицю',
            bind: '{rec.manager}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Категорія товару',
            bind: '{rec.produckt_category}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Фото',
            bind: '{rec.path_photo}'
        }],
        buttons: [{
            xtype: 'button',
            text: 'Зберегти',//btnCaption,
            listeners: {
                'click': function () {
                    //if (is_current == 0) {
                    //    fillcell(p);
                    //}
                    var grid = Ext.getCmp('viewPageCells');
                    var store = grid.getStore();
                    store.sync();
                    //store.commitChanges();

                    win.close();
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                }
            }
        }]
    });

    return win;
};

//var articuledit = function (pnls, current) {
//    articuladd(pnls, current);
//}

/*
    var fillcell = function (p) {
        var crml = 0;
        var i = 0;
        do {
            var p = pnls[i];
            if (p.full == 0) {
                p.panel.body.component.removeCls('empty-gtmp-cell');
                p.panel.body.component.addCls('full-gtmp-cell');
                p.full = 1;

                //'<tr>'+
                //  '<th>Firstname</th>'+
                //  '<th>Lastname</th>'+
                //'</tr>'+

                var html = 
                    '<table style="width:100%">'+
                      '<tr>' +
                        '<td class="column-header">Департамент:</td>' +
                        '<td class="column-normal">' + record.data.depart + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Артикул(и):</td>' +
                        '<td class="column-normal">' + record.data.artlst + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">№ товару:</td>' +
                        '<td class="column-normal">' + record.data.number + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Коротка назва товару:</td>' +
                        '<td class="column-normal">' + record.data.short_name + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Бренд, торгова марка:</td>' +
                        '<td class="column-normal">' + record.data.producer + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Країна-виробник:</td>' +
                        '<td class="column-normal">' + record.data.madein + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Одиниця виміру:</td>' +
                        '<td class="column-normal">' + record.data.unit + '</td>' +
                      '</tr>' +

                    '</table>'
                

                p.panel.body.setHtml(html);

                break;
            }
            i++;
        } while (i <= 11);
    };
*/

//var p = pnls;

//var is_current = 0;
//if (current != null) {
//    is_current = 1;
//}
//var btnCaption = ''
//if (is_current == 0)
//    btnCaption = 'Додати';
//else
//    btnCaption = 'Зберегти';

//var record.data = {
//    otd: '10 (САД І ГОРОД)',
//    depart: 'Дитячі товари',
//    artlst: '10603043',
//    unit: 'штуки',
//    number: '12345',
//    short_name: 'Басейн каркасний прямокут. 1200 л., 221х150х43 см',
//    producer: 'BESTWAY',
//    madein: 'Китай',
//    price_buy: '997',
//    price_before_act: '1994',
//    price_act: '1440',
//    price_after_act:'1990',
//    price_start: '1440',
//    profit_procent: '30',
//    margin: '30',
//    diff_price: '27',
//    forecast_profit: '60000',
//    forecast_profit_act: '30000',
//    specifiacations: 'много текста...',
//    garant: 'много текста...',
//    advantage: 'переваги',
//    inventory: '123',
//    competitors: 'Конкуренти',
//    competitive_product: 'Конкурентний товар...',
//    competitors_price: '1500',
//    diff_competitor_price: '100',
//    diff_competitor_price_prc: '10%',
//    placement_type: '...',
//    compensation_sp: '.....',
//    specil_placement: '......',
//    manager: '.....',
//    produckt_category: '......',
//    path_photo:'.......'
//}