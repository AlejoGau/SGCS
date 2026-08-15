Ext.define('Common.model.MonitoreoGuiadoTemplateStepsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'gms_iTemplateID', type: 'string'},
        {name: 'gms_iStepNumber', type: 'int'},
        {name: 'gms_iStepID', type: 'int'},
        {name: 'gms_cToolTip', type: 'string'},
        {name: 'gms_cText', type: 'string'},
        {name: 'gms_cListID', type: 'string'},
        {name: 'gms_cType', type: 'string'},
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/GuidedMonitoringStepsSearch',
        appendId: true
    }
}
);