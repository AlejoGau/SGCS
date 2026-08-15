Ext.define('AdministratorSearch.model.ReporteSesionesSeisMesesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Cantidad', type: 'int' },
        { name: 'Mes', type: 'string' },
        {name: 'MesCantidad',type: 'string', convert:function(newValue, model){
            var result = getLocale(model.get('Mes')) + ' - ' + model.get('Cantidad');
            return result;
        }}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/CantidadEventosPorReceptorUltimosSeisMesesPorCuenta',
		appendId : true
	}
});