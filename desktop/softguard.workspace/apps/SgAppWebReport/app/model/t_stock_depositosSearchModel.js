Ext.define('SgAppWebReport.model.t_stock_depositosSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },
       {
            name: 'Name',
            type: 'string'
        },{
            name: 'tsd_idorganizacion',
            type: 'int'
        },{
            name: 'organizationName',
            type: 'string'
        },{
            name: 'tsd_estado',
            type: 'int'
        },{
            name: '_tsd_estado',
            type: 'string',
            convert: function (v,r) {
                if(r.get('tsd_estado') == 0) {
                    return getLocale('No definido')
                } else if(r.get('tsd_estado') == 2) {
                    return getLocale('Deshabilitado')
                } else {
                    return getLocale('Habilitado')
                }
            }
        },{
            name: 'tsd_idtecnico',
            type: 'int'
        }

    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/t_stock_depositos',        
        appendId : false
    }
});