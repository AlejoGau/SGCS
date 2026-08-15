//MIGRADO2024
Ext.define('Common.model.m_usuariosModel', {
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
        defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_firmante_fc'
        },
        {name:'usu_iidcuenta',type:'int'},
        {name:'usu_icodigo',type:'int'},
        {name:'usu_cnombre',type:'string'},
        {name:'usu_iid',type:'int'},
        {name:'usu_cclave',type:'string'},
        {name:'usu_ntipo',type:'int'},
        {name:'usu_cimagen',type:'string'},
        {name:'usu_mobservacion',type:'string'},
        {name:'usu_cidextendido',type:'string', defaultValue:''},
        {name:'usu_cmetadata',type:'string'},
        {name:'usu_teliid',type:'int'},
        // DNI
        {name:'usu_cidentificacion',type:'string'},
        // vehiculo nuevo
        {name:'usu_vehiculo',type:'string'},
        ],
     proxy: {
        type : 'rest',
        url : '/Rest/usuario/',
    	appendId : true,
        writer: {writeAllFields:true}
	}	
           
   
});