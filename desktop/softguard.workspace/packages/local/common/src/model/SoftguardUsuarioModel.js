//MIGRADO2024
Ext.define('Common.model.SoftguardUsuarioModel', {
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
        	'usu_iidcuenta', 
            {
        		name : 'usu_icodigo',
				type : 'int',
				defaultValue : 1
            },
            'usu_cnombre', 
            {
    			name : 'usu_iid',
				type : 'int',
				defaultValue : 1
            },
            'usu_cclave', 
            { 
                name:'usu_ntipo', 
                type : 'int'
            },
            'usu_cimagen', 
            'usu_mobservacion',
            {name:'_usuario_contrasena', type:'string',convert: function(v,record){
                return record.get('usu_cnombre') + " ("+record.get('usu_cclave') +")";
                
            }}, 
            { 
                name:'usu_cidextendido',
                type : 'string'
            },
            { 
                name:'usu_cidentificacion',
                type : 'string'
            },{ 
                name:'usu_cmetadata',
                type : 'string'
            }
            
        ],
    validations: [
    /*{ type: 'presence', name: 'Name', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'LastName', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'Email', message: 'Email es requerido.' }*/
    ],
    
    proxy: {
        type: 'softguardusuarioproxy',
        url: '/Rest/Cuenta/{0}/Usuario',
        replaceIdRegex: /\{0\}/,
        appendId: true,
        writer: {writeAllFields: true}
        
    }
});
																