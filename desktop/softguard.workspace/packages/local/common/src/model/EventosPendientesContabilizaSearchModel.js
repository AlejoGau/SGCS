//MIGRADO2024
Ext.define('Common.model.EventosPendientesContabilizaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'rec_calarma',
    fields: [
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3075
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'EventosPendientes'
        },
		
        
        {name:'rec_calarma',type:'string'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cantidad',type:'int'},
        {name:'cod_ncolorletra',type:'string'},
        {name:'cod_ncolor',type:'string'},
        
        {name:'alarmaCompleta',type:'string', convert: function (value,record) {
                return record.get('rec_calarma')+' '+record.get('cod_cdescripcion')
        }},
       
            
        ],
 
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/EventosPendientesContabiliza',
		appendId : true
	},
    
 
    
    
});