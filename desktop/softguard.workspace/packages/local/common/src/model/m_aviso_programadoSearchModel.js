Ext.define('Common.model.m_aviso_programadoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 624
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_aviso_programado'
        },
       {name:'prg_from',type:'string'},
        {name:'prg_to',type:'string'},
        {name:'prg_estado',type:'int'},
        {name:'prg_gateway',type:'string'},
        {name:'prg_objecttypeid',type:'int'},
        {name:'prg_objectid',type:'int'},
        {name:'prg_prgdatetime',type:'date'},
        {name:'prg_enviodatetime',type:'date'},
        {name:'prg_mensaje',type:'string'}
         
    ],
    	
		
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_aviso_programado',
		appendId : false
		}
});