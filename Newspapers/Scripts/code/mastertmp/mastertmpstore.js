
var getStorePageCells = function () {
    var store = Ext.create('Ext.data.JsonStore', {
        //autoLoad: true,
        autoDestroy: true,
        autoSync: false,
        idProperty: 'GlobalCellId',
        proxy:
            {
                //type: 'ajax',
                type: 'rest',
                reader:
                {
                    root: 'data',
                    type: 'json'
                },
                api:
                {
                    read: '/api/cells',
                    create: '/api/cells',
                    update: '/api/cells',
                    destroy: '/api/cells'
                },
                actionMethods:
                {
                    destroy: 'POST',
                    read: 'GET',
                    create: 'POST',
                    update: 'POST'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,       // --<----------------------
                    root: 'cell',
                    allowSingle: true // set false to send a single record in array
                },
                headers: {
                    'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
                }
            },
        listeners: {
            exception: function (proxy, response, op) {
                alert();
            }
        },
        model: Ext.define('mdDeptForCell', {
            extend: 'Ext.data.Model',
            idProperty: 'GlobalCellId',
            fields: [{
                name: 'GlobalCellId',         /* унікальний ідентифікатор клітинки */
                type: 'int',
                defaultValue: 0
            }, {
                name: 'PageId',                /* сторінка до якої прив'язана клітинка */
                type: 'int'
            }, {
                name: 'PagePosition',
                type: 'int'
            },{
                name: 'OtdId',                 /* Відділ якому призначена клітинка */
                type: 'int'
            }, {
                name: 'DepartId',                 /* Департамент */
                type: 'string'
            }, {
                name: 'Artlst',                 /* Артикул або група артикулів */
                type: 'string'
            }, {
                name: 'Unit',                   /* Одиниця виміру */
                type: 'string'
            }, {
                name: 'Number',                 /* № товару */
                type: 'string'
            }, {
                name: 'ShortName',             /* Коротка назва товару */
                type: 'string'
            }, {
                name: 'Producer',               /* Бренд, торгова марка */
                type: 'string'
            }, {
                name: 'Madein',                 /* Країна-виробник */
                type: 'string'
            }, {
                name: 'PriceBuy',              /* Ціна закупівлі */
                type: 'float'
            }, {
                name: 'PriceBeforeAct',       /* Ціна до акції з ПДВ */
                type: 'float'
            }, {
                name: 'PriceAct',              /* Ціна акційна, яка буде з ПДВ */
                type: 'float'
            }, {
                name: 'PriceAfterAct',        /* Ціна після акції з ПДВ */
                type: 'float'
            }, {
                name: 'PriceStart',            /* Ціна від */
                type: 'float'
            }, {
                name: 'ProfitProcent',         /* % вигоди */
                type: 'float'
            }, {
                name: 'Margin',                 /* Маржа % */
                type: 'float'
            }, {
                name: 'DiffPrice',             /* Різниця між акційною ціною та ціною після акції % */
                type: 'float'
            }, {
                name: 'ForecastProfit',        /* Прогноз  прибутку, грн. */
                type: 'float'
            }, {
                name: 'ForecastProfitAct',    /* Прогноз  продажів у період акції, грн. */
                type: 'float'
            }, {
                name: 'Specifiacations',        /* Технічні характеристики товару */
                type: 'string'
            }, {
                name: 'Garant',                 /* Гарантія, яка вказуються в характеристиках товару */
                type: 'string'
            }, {
                name: 'Advantage',              /* Основні переваги товару */
                type: 'string'
            }, {
                name: 'Inventory',              /* Товарний запас */
                type: 'string'
            }, {
                name: 'Competitors',            /* Конкуренція/конкурент */
                type: 'string'
            }, {
                name: 'CompetitiveProduct',    /* Конкуренція товар */
                type: 'string'
            }, {
                name: 'CompetitorsPrice',      /* Конкуренція/ціна */
                type: 'string'
            }, {
                name: 'DiffCompetitorPrice',  /* різниця між нашою ціною та ціною конкурента */
                type: 'string'
            }, {
                name: 'DiffCompetitorPricePrc',  /* % різниці між нашою ціною та ціною конкурента */
                type: 'string'
            }, {
                name: 'PlacementType',         /* Тип розміщення */
                type: 'string'
            }, {
                name: 'CompensationSp',        /* Компенсація постачальником, грн. */
                type: 'string'
            }, {
                name: 'SpecilPlacement',       /* Спеціальне розміщення */
                type: 'string'
            }, {
                name: 'Manager',                /* ПІБ менеджера, що заповнив таблицю */
                type: 'string'
            }, {
                name: 'ProducktCategory',      /* Категорія товару */
                type: 'string'
            }, {
                name: 'PathPhoto',             /* Фото (посилання) */
                type: 'string'
            }, {
                name: 'OtdName',
                type: 'string'
            }, {
                name: 'DepartName',
                type: 'string'
            }, {
                name: 'Isfill',
                type: 'boolean'//, defaultValue: false
            }]
            
        })
    });

    store.load({
        scope: this,
        callback: function (records, operation, success) {
            if (success) {

                var recf = records.filter(
                        function (cell) {
                            if (cell.data.Isfill) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    );
                var p = Ext.getCmp('pQtyFillCell');
                p.setHtml('Заповнено клітинок: ' + recf.length);
            } else {

            }
        }
    });

    return store;
}