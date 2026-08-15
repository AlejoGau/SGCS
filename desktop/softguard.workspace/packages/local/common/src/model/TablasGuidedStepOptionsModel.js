Ext.define('Common.model.TablasGuidedStepOptionsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'gso_cDescripcion', type: 'string'},
        {name: 'gso_cType', type: 'string'},

    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/t_guidedstepoptions/',
        appendId: true
    }
});