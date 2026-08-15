//MIGRADO2024
Ext.define('Common.model.m_asignacion_movilModel', {
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
        defaultValue: 3161
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'm_asignacion_movil'
        },
		{name:'amv_objecttypeid',type:'int'},
        {name:'amv_objectid',type:'int'},
    {name:'amv_rec_iid',type:'int'},
    {name:'amv_estado',type:'int'},
    {name:'amv_prioridad',type:'int'},
    {name:'_amv_estado',type:'string', convert:function (values, model) {
        var estado = '';
      
        switch(model.get('amv_estado')) {
            case 0:
                estado = getLocale('Disponible')
            break;
            case 1:
                estado = getLocale('Asignado')
            break;
            case 2:
                estado = getLocale('Cancelado')
            break;
            case 3:
                estado = getLocale('Completado')
            break;
            default:
                estado = getLocale('No definido')
            break;
        }
        
        return estado;
    }},
    
        ],		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/m_asignacion_movil/',
		appendId : true
	}
});