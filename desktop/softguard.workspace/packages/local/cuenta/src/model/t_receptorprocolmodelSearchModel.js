Ext.define('Cuenta.model.t_receptorprocolmodelSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
            name: 'Id',
            type: 'int'
        },
        {
            name: 'rpm_idKey',
            type: 'int'
        },
        {
            name: 'rpm_cMarca',
            type: 'string'
        },
        {
            name: 'rpm_cModelo',
            type: 'string'
        },
        {
            name: 'rpm_iReceptor',
            type: 'int'
        },
        {
            name: '_marcamodelo',
            convert: function(value, record) {
                var _v = '['+record.get('rpm_cMarca')+'] '+record.get('rpm_cModelo');
                return _v;
            },
            type: 'string'
        }
    ],
    proxy: { 
        type : 'rest',
        reader: {
            type : 'json',
            root : 'rows',
            totalProperty : 'total'
        },
        url: '/rest/search/t_receptorprotocolmodel'
    }
});