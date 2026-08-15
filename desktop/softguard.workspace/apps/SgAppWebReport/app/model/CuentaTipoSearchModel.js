Ext.define('SgAppWebReport.model.CuentaTipoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'tip_ccodigo', type: 'string'},
        {name:'tip_nTipo',type:'int',defaultValue:0},
        {name:'tip_cdescripcion', type: 'string'},
        {name:'tip_nCondicion',type:'int',defaultValue:0},
        {name:'tip_idKey',type:'int'},
        
    ],
	proxy : {
		type : 'rest',
		url : '/Rest/Search/Tipos',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});