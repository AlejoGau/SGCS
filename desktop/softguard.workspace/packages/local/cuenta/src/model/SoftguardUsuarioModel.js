Ext.define('Cuenta.model.SoftguardUsuarioModel', {
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
            },{ 
                name:'usu_cmetadata',
                type : 'string'
            },
            {
                name: 'usu_cidentificacion',
                type: 'string',
                critical: true
            }            
            
        ],

    validations: [
    /*{ type: 'presence', name: 'Name', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'LastName', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'Email', message: 'Email es requerido.' }*/
    ],

    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/Rest/Usuario',
        //replaceIdRegex: /\{0\}/,
        appendId: true,
        writer:{ writeAllFields:true },
        // buildUrl: function (request) {
        //     var me = this,
        //     operation = request.operation?request.operation:request._operation,
        //     app = operation.scope,
        //     records = operation.records || [],
        //     record = records[0],
        //     format = me.format,
        //     url = me.getUrl(request),
        //     id = record ? record.getId() : operation.ObjectId;

        //     if (operation.action == 'destroy' || operation.action == 'update') {
        //         id = operation.records[0].internalId;
        //         url = '/Rest/Usuario/' + id;
        //     } else if (operation.action == 'create'){
        //         url = '/Rest/Usuario/';
        //     } 
        //     else {
        //         if (me.appendId && id) {
        //             url = url.replace(me.replaceIdRegex, id);
        //         }

        //         if (format) {
        //             if (!url.match(/\.$/)) {
        //                 url += '.';
        //             }

        //             url += format;
        //         }
        //         request.url = url;
        //     }
        //     return url;
        //     // return me.callParent(arguments);
        // }
    }
});

																
