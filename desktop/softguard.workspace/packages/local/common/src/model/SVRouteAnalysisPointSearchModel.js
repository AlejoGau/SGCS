Ext.define('Common.model.SVRouteAnalysisPointSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'sra_iid',
    fields: [
        { name: 'sra_iid', type: 'int' },
        { name: 'sra_iRouteId', type: 'int' },
        { name: 'sra_iAnalysisPointId', type: 'int' },
        { name: 'sra_iOrder', type: 'int' },
        { name: 'sra_cReference', type: 'string' },
        { name: 'sra_cCameraType', type: 'string' },
        { name: 'sra_iCameraRefId', type: 'int' },
        { name: 'sra_cConfig', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/SV_Route_AnalysisPoints/',
        appendId: true,
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }
    }
});
