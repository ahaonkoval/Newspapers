
var getStorePageCells = function () {
    var store = Ext.create('Ext.data.JsonStore', {
        fields: [
            'global_cell_id', 'page_id', 'otd_id', 'depart', 'artlst', 'unit', 'number', 'short_name', 'producer', 'madein', 'price_buy',
                'price_before_act', 'price_act', 'price_after_act', 'price_start', 'profit_procent', 'margin', 'diff_price', 'forecast_profit',
                'forecast_profit_act', 'specifiacations', 'garant', 'advantage', 'inventory', 'competitors', 'competitive_product', 'competitors_price',
                'diff_competitor_price', 'diff_competitor_price_prc', 'placement_type', 'compensation_sp', 'specil_placement', 'manager',
                'produckt_category', 'path_photo'],
        autoLoad: true,
        autoDestroy: true,
        autoSync: false,
        //proxy: {
        //    type: 'rest',
        //    url: '/api/cells',
        //    reader: {
        //        type: 'json',
        //        root: 'Cell'
        //    }
        //},

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
                    type: 'json'
                    //allowSingle: false // set false to send a single record in array
                }
            },
        listeners: {
            exception: function (proxy, response, op) {
                alert();
            }
        },
        model: Ext.define('model_deptforcell', {
            extend: 'Ext.data.Model',
            idProperty: 'global_cell_id',
            fields: [{
                name: 'global_cell_id',         /* унікальний ідентифікатор клітинки */
                type: 'int',
                defaultValue: 0
            }, {
                name: 'page_id',                /* сторінка до якої прив'язана клітинка */
                type: 'int'
            }, {
                name: 'otd_id',                 /* Відділ якому призначена клітинка */
                type: 'int'
            }, {
                name: 'depart',                 /* Департамент */
                type: 'string'
            }, {
                name: 'artlst',                 /* Артикул або група артикулів */
                type: 'string'
            }, {
                name: 'unit',                   /* Одиниця виміру */
                type: 'string'
            }, {
                name: 'number',                 /* № товару */
                type: 'string'
            }, {
                name: 'short_name',             /* Коротка назва товару */
                type: 'string'
            }, {
                name: 'producer',               /* Бренд, торгова марка */
                type: 'string'
            }, {
                name: 'madein',                 /* Країна-виробник */
                type: 'string'
            }, {
                name: 'price_buy',              /*  Ціна закупівлі */
                type: 'float'
            }, {
                name: 'price_before_act',       /* Ціна до акції  з ПДВ */
                type: 'float'
            }, {
                name: 'price_act',              /* Ціна акційна, яка буде з ПДВ */
                type: 'float'
            }, {
                name: 'price_after_act',        /* Ціна після акції з ПДВ */
                type: 'float'
            }, {
                name: 'price_start',            /* Ціна від */
                type: 'float'
            }, {
                name: 'profit_procent',         /* % вигоди */
                type: 'float'
            }, {
                name: 'margin',                 /* Маржа % */
                type: 'float'
            }, {
                name: 'diff_price',             /* Різниця між акційною ціною та ціною після акції % */
                type: 'float'
            }, {
                name: 'forecast_profit',        /* Прогноз  прибутку, грн. */
                type: 'float'
            }, {
                name: 'forecast_profit_act',    /* Прогноз  продажів у період акції, грн. */
                type: 'float'
            }, {
                name: 'specifiacations',        /* Технічні характеристики товару */
                type: 'string'
            }, {
                name: 'garant',                 /* Гарантія, яка вказуються в характеристиках товару */
                type: 'string'
            }, {
                name: 'advantage',              /* Основні переваги товару */
                type: 'string'
            }, {
                name: 'inventory',              /* Товарний запас */
                type: 'string'
            }, {
                name: 'competitors',            /* Конкуренція/конкурент */
                type: 'string'
            }, {
                name: 'competitive_product',    /* Конкуренція товар */
                type: 'string'
            }, {
                name: 'competitors_price',      /* Конкуренція/ціна */
                type: 'string'
            }, {
                name: 'diff_competitor_price',  /* різниця між нашою ціною та ціною конкурента */
                type: 'string'
            }, {
                name: 'diff_competitor_price_prc',  /* % різниці між нашою ціною та ціною конкурента */
                type: 'string'
            }, {
                name: 'placement_type',         /* Тип розміщення */
                type: 'string'
            }, {
                name: 'compensation_sp',        /* Компенсація постачальником, грн. */
                type: 'string'
            }, {
                name: 'specil_placement',       /* Спеціальне розміщення */
                type: 'string'
            }, {
                name: 'manager',                /* ПІБ менеджера, що заповнив таблицю */
                type: 'string'
            }, {
                name: 'produckt_category',      /* Категорія товару */
                type: 'string'
            }, {
                name: 'path_photo',             /* Фото (посилання) */
                type: 'string'
            }]
            
        })
    });

    return store;
}