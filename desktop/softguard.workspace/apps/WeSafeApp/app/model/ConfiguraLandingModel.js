Ext.define('WeSafe.model.ConfiguraLandingModel', {
    extend: 'Ext.data.Model',
    idProperty: 'lcfg_iid',
    fields: [{
            name: 'lcfg_iid',
            type: 'int'
        },
        {
            name: 'lcfg_cname',
            type: 'string'
        },
        {
            name: 'lcfg_ccontent',
            type: 'string'
        }
        ],
    idProperty: 'lcfg_iid',
    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/rest/search/SearchLandingConfig',
        appendId: true
    }
});