//MIGRADO2024
Ext.define('Common.model.RoutesModel', {
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
        defaultValue: 3079
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_categorizacion'
        },
		{name:'cuentaId',type:'int'},
{name:'datestart',type:'date'},
{name:'endaftertolerance',type:'int'},
{name:'endbeforetolerance',type:'int'},
{name:'routetype',type:'int'},
{name:'startaftertolerance',type:'int'},
{name:'startbeforetolerance',type:'int'},
{name:'time',type:'int'},
{name:'userId',type:'int'},
        {name:'_userId',type:'int',convert:function (val,rec) {
            if(rec.get('userId') == 0) {
                return null;
            } 
            return rec.get('userId');
        }}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/vc_routes/',
		appendId : true
		},
        listeners:{
            'exception': function(proxy, response, operation){   
                notifyError('Error. La cantidad de puntos de la ruta excede la capidad configurada del motor de base de datos.');
            }
        }          
});