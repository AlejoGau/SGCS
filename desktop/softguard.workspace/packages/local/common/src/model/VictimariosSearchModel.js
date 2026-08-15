//MIGRADO2024
Ext.define('Common.model.VictimariosSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name: 'Id',type: 'int'},
        {name: 'Name', type: 'string', mapping: 'udw_usuario'},
        {name: 'ObjectTypeName', type: 'int', defaultValue: 3050},
        {name: 'vic_idKey', type:'int', defaultValue:0},
        {name: 'vic_cApellido', type:'string'},
        {name: 'vic_iRestriccion', type:'string'},
        {name: 'vic_cNombre', type:'string'},
        {name: 'vic_cIdentificacion', type:'string'},
        {name: 'vic_cLocalidad', type:'string'},
    ],
    proxy : {
        
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/m_victimarios',
		appendId : false,
        extraParams: {
                    idKeyCuenta: ''
                }
	}
});