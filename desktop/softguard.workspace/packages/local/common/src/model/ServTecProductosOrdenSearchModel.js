//MIGRADO2024
Ext.define('Common.model.ServTecProductosOrdenSearchModel', {
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
            name: 'spr_iCantidad',
            type: 'int'
        },{
            name: 'IdProduct',
            type: 'int'
        },{
            name: 'Code',
            type: 'string'
        },{
            name: 'Status',
            type: 'string'
        },{name:'_Status',type:'string',convert: function (value, rec) {
            if(rec.get('Status') == '0') { 
                return 'No Disponible'
            } else {
                return 'Disponible'
                
            }
        }},
        
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SerTecProductosOrden',        
    	appendId : false
	}
});