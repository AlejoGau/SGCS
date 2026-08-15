//MIGRADO2024
Ext.define('Common.model.MGServiciosContratadosSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {   
            name: 'Id',
            type: 'int'
        },
        {
            name: 'cnt_iid',
            type: 'int'
        },
        {
            name: 'cnt_idcliente',
            type: 'int'
        },
        {
            name: 'cbc_yTotal',
            type: 'float'
        },
        {   name: 'cnt_fechaalta'},
        {   name: 'cnt_fechavto'
        },
        {
            name: 'Code',//Artículo
            type: 'string'
        },
        {
            name: 'Description',//nombre
            type: 'string'
        },
        {
            name: 'Quantity',
            type: 'int'
        },
        {
            name: 'cnt_estado',
            type: 'int'
        }
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/MG_servicioscontratadosSearch',
		appendId : false
	}
});