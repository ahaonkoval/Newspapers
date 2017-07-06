

var articuladd = function (pnls, current) {

    var p = pnls;

    var is_current = 0;
    if (current != null) {
        is_current = 1;
    }
    var btnCaption = ''
    if (is_current == 0)
        btnCaption = 'Додати';
    else
        btnCaption = 'Зберегти';

    var ocell = {
        otd: '10 (САД І ГОРОД)',
        depart: 'Дитячі товари',
        artlst: '10603043',
        unit: 'штуки',
        number: '12345',
        short_name: 'Басейн каркасний прямокут. 1200 л., 221х150х43 см',
        producer: 'BESTWAY',
        madein: 'Китай',
        price_buy: '997',
        price_before_act: '1994',
        price_act: '1440',
        price_after_act:'1990',
        price_start: '1440',
        profit_procent: '30',
        margin: '30',
        diff_price: '27',
        forecast_profit: '60000',
        forecast_profit_act: '30000',
        specifiacations: 'много текста...',
        garant: 'много текста...',
        advantage: 'переваги',
        inventory: '123',
        competitors: 'Конкуренти',
        competitive_product: 'Конкурентний товар...',
        competitors_price: '1500',
        diff_competitor_price: '100',
        diff_competitor_price_prc: '10%',
        placement_type: '...',
        compensation_sp: '.....',
        specil_placement: '......',
        manager: '.....',
        produckt_category: '......',
        path_photo:'.......'
    }


    winarticuladd = Ext.create('Ext.Window', {
        title: 'Додати артикул на сторінку',
        width: 800,
        height: 600,
        modal: true,
        closable: true,
        autoScroll: true,
        layout: 'form',
        items: [{
            xtype: 'combobox',
            reference: 'states',
            publishes: 'value',
            fieldLabel: '№ відділу ',
            labelWidth: '30%',
            //displayField: 'state',
            anchor: '-15',
            minChars: 0,
            //queryMode: 'local',
            typeAhead: true,
            value: ocell.otd
        }, {
            xtype: 'combobox',
            fieldLabel: 'Департамент',
            value: ocell.depart
        }, {
            xtype: 'textfield',
            fieldLabel: 'Артикул або група артикулів',
            value : ocell.artlst
        }, {
            xtype: 'textfield',
            fieldLabel: 'Одиниця виміру',
            value: ocell.unit
        }, {
            xtype: 'textfield',
            fieldLabel: '№ товару',
            value: ocell.number
        }, {
            xtype: 'textfield',
            fieldLabel: 'Коротка назва товару',
            value: ocell.short_name
        }, {
            xtype: 'textfield',
            fieldLabel: 'Бренд, торгова марка',
            value: ocell.producer
        }, {
            xtype: 'textfield',
            fieldLabel: 'Країна-виробник',
            value: ocell.madein
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна закупівлі',
            value: ocell.price_buy
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна до акції  з ПДВ',
            value: ocell.price_before_act
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна акційна, яка буде з ПДВ',
            value: ocell.price_act
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна від',
            value: ocell.price_start
        }, {
            xtype: 'textfield',
            fieldLabel: '% вигоди',
            value: ocell.profit_procent,
            enabled: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Маржа %',
            value: ocell.margin
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ціна після акції з ПДВ',
            value: ocell.price_after_act
        }, {
            xtype: 'textfield',
            fieldLabel: 'Різниця між акційною ціною та ціною після акції %',
            value: ocell.diff_price
        }, {
            xtype: 'textfield',
            fieldLabel: 'Прогноз  прибутку, грн.',
            value: ocell.forecast_profit
        }, {
            xtype: 'textfield',
            fieldLabel: 'Прогноз  продажів у період акції, грн.',
            value: ocell.forecast_profit_act
        }, {
            xtype: 'textfield',
            fieldLabel: 'Технічні характеристики товару',
            value: ocell.specifiacations
        }, {
            xtype: 'textfield',
            fieldLabel: 'Гарантія, яка вказуються в характеристиках товару',
            value: ocell.garant
        }, {
            xtype: 'textfield',
            fieldLabel: 'Основні переваги товару',
            value: ocell.advantage
        }, {
            xtype: 'textfield',
            fieldLabel: 'Товарний запас',
            value: ocell.inventory
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція/конкурент',
            value: ocell.competitors
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція товар',
            value: ocell.competitive_product
        }, {
            xtype: 'textfield',
            fieldLabel: 'Конкуренція/ціна',
            value: ocell.competitors_price
        }, {
            xtype: 'textfield',
            fieldLabel: '% різниці між нашою ціною та ціною конкурента',
            value: ocell.diff_competitor_price
        }, {
            xtype: 'textfield',
            fieldLabel: '% різниці між нашою ціною та ціною конкурента',
            value: ocell.diff_competitor_price_prc
        }, {
            xtype: 'textfield',
            fieldLabel: 'Тип розміщення',
            value: ocell.placement_type
        }, {
            xtype: 'textfield',
            fieldLabel: 'Компенсація постачальником, грн.',
            value: ocell.compensation_sp
        }, {
            xtype: 'textfield',
            fieldLabel: 'Спеціальне розміщення',
            value: ocell.specil_placement
        }, {
            xtype: 'textfield',
            fieldLabel: 'ПІБ менеджера, що заповнив таблицю',
            value: ocell.manager
        }, {
            xtype: 'textfield',
            fieldLabel: 'Категорія товару',
            value: ocell.produckt_category
        }, {
            xtype: 'textfield',
            fieldLabel: 'Фото',
            value: ocell.path_photo
        }],
        buttons: [{
            xtype: 'button',
            text: btnCaption,
            listeners: {
                'click': function () {
                    if (is_current == 0) {
                        fillcell(p);
                    }
                    winarticuladd.close();
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    winarticuladd.close();
                }
            }
        }]
    });

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
                        '<td class="column-normal">' + ocell.depart + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Артикул(и):</td>' +
                        '<td class="column-normal">' + ocell.artlst + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">№ товару:</td>' +
                        '<td class="column-normal">' + ocell.number + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Коротка назва товару:</td>' +
                        '<td class="column-normal">' + ocell.short_name + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Бренд, торгова марка:</td>' +
                        '<td class="column-normal">' + ocell.producer + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Країна-виробник:</td>' +
                        '<td class="column-normal">' + ocell.madein + '</td>' +
                      '</tr>' +

                      '<tr>' +
                        '<td class="column-header">Одиниця виміру:</td>' +
                        '<td class="column-normal">' + ocell.unit + '</td>' +
                      '</tr>' +

                    '</table>'
                

                p.panel.body.setHtml(html);

                break;
            }
            i++;
        } while (i <= 11);
    };

    winarticuladd.show();
};

var articuledit = function (pnls, current) {
    articuladd(pnls, current);
}