Ext.define('AccessControl.model.m_ProveedorSearchModel', {
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
        defaultValue: 3227
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_AccesosProveedores'
        },
        {
            name: 'apr_idKey',
            type: 'int'
            },
        {name:'apr_cNombre',type:'string'},
        {name:'apr_cIdentificacion',type:'string'},        
        {name:'apr_cDireccion',type:'string'},                
        {name:'apr_cCodigoPostal',type:'string'},  
        {name:'apr_cLocalidad',type:'string'},                
        {name:'apr_iProvincia',type:'int'},
        {name:'apr_cTelefono',type:'string'},                
        {name:'apr_iCategoria',type:'int'},
        {name:'apr_tFechaAlta',type:'string'},
        {name:'apr_iStatus',type:'int'},
        {name:'apr_cObservaciones',type:'string'},                
        {name:'apr_cPathPicture',type:'string'},
        
        {name:'_apr_iStatus',type:'string',convert: function(v, record){
            return (record.get('apr_iStatus')==0?'NO':'SI');
        }}
        
    ],
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/m_AccesosProveedoresSearch',
        appendId : false
	}
});
