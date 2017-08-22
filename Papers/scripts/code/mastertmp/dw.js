
/*
'<div class="page-paper-inner-head">',
'Товар відділу: {name}',
'</div>',
'<div class="page-paper-inner-bottom">{id}</div>',
*/

var getDataViewPageCells = function (pQtyFillCell) {
    var store = getStorePageCells();
    var dw = new Ext.create({
        id: 'viewPageCells',
        xtype: 'dataview',
        layout: 'fit',
        margin: 5,
        store: store,
        autoScroll: true,
        tpl: [            
            '<tpl for=".">',
                '<div class="conteiner-depart-cell">',
                    '<div class="conteiner-depart-cell-fill">',                        
                        '<div class="cell-inner-head">',
                            'Клітинка № {PagePosition}',
                        '</div>',
                        '<div class="cell-inner-bottom">',
                            '<tpl if="Isfill==true">',
                                '<div class="page-paper-cell-part-50">',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Відділ:</font> {OtdName}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Департамент:</font> {DepartName}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Артикул(и):</font> {Artlst}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Одиниця виміру:</font> {Unit}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">№ товару:</font> {Number}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Коротка назва товару:</font> {ShortName}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Бренд, торгова марка:</font> {Producer}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Країна-виробник:</font> {Madein}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Ціна закупівлі:</font> {PriceBuy}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Ціна до акції, з ПДВ:</font> {PriceBeforeAct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Ціна акційна, яка буде з ПДВ:</font> {PriceAct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Ціна після акції з ПДВ:</font> {PriceAfterAct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Ціна від:</font> {PriceStart}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">% вигоди:</font> {ProfitProcent}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Маржа %:</font> {Margin}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Різниця між акційною ціною та ціною після акції %:</font> {DiffPrice}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Прогноз  прибутку, грн.:</font> {ForecastProfit}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Прогноз  продажів у період акції, грн.:</font> {ForecastProfitAct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Технічні характеристики товару:</font> {Specifiacations}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Різниця між акційною ціною та ціною після акції %:</font> {DiffPrice}</div>',
                                '</div>',                        
                                '<div class="page-paper-cell-part-50">',                            
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Прогноз  прибутку, грн.:</font> {ForecastProfit}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Прогноз  продажів у період акції, грн:</font> {ForecastProfitAct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Технічні характеристики товару:</font> {Specifiacations}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Гарантія, яка вказуються в характеристиках товару:</font> {Garant}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Основні переваги товару:</font> {Advantage}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Товарний запас:</font> {Inventory}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Конкуренція/конкурент:</font> {Competitors}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Конкуренція товар:</font> {CompetitiveProduct}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Конкуренція/ціна:</font> {CompetitorsPrice}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Різниця між нашою ціною та ціною конкурента:</font> {DiffCompetitorPrice}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">% різниці між нашою ціною та ціною конкурента:</font> {DiffCompetitorPricePrc}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Тип розміщення:</font> {PlacementType}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Компенсація постачальником, грн:</font> {CompensationSp}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Спеціальне розміщення:</font> {SpecilPlacement}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">ПІБ менеджера, що заповнив таблицю:</font> {Manager}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Категорія товару:</font> {ProducktCategory}</div>',
                                    '<div class="cell-inner-field"><font color="rgb(4, 15, 99)">Фото (посилання):</font> {PathPhoto}</div>',
                                '</div>',   
                            '</tpl>',
                        '</div>',
                    '</div>',
                '</div>',
            '</tpl>'],
        singleSelect: true,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.conteiner-depart-cell',
        emptyText: 'Клітинок для заповнення немає.',
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dw.getSelection();
                    if (selected.length > 0) {
                        var record = selected[0];
                        var data = record.data;
                        if (data.Isfill) {
                            getWinFillCell(record, 'Редагування клітинки №').show();
                        }
                    }                                        
                }
            },
        }
    });

    pQtyFillCell.setHtml(store.getCount().toString());
    return dw;
}
/*

*/
/*
var getgridtmp = function (pnls) {

    var p = pnls;

    var gridtmp = Ext.create('Ext.panel.Panel',
     {
         xtype: 'panel',
         flex: 1,
         padding: 5,
         layout: {
             type: 'vbox',
             pack: 'start',
             align: 'stretch'
         },
         items: [
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_1',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     var pc = this;
                                     articuledit(p, pc);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_2',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_3',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_4',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_5',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_6',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_7',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_8',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_9',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             },
             {
                 xtype: 'panel',
                 flex: 1,
                 layout: {
                     type: 'hbox',
                     pack: 'start',
                     align: 'stretch'
                 },
                 items: [
                     {
                         xtype: 'panel',
                         id: 'gtmp_cell_10',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_11',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }, {
                         xtype: 'panel',
                         id: 'gtmp_cell_12',
                         flex: 1,
                         autoScroll: true,
                         listeners: {
                             'dblclick': {
                                 fn: function () {
                                     articuledit(p, this);
                                 },
                                 element: 'el'
                             }
                         }
                     }
                 ]
             }
         ]
     });

    return gridtmp;
}
*/