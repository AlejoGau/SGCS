Ext.define('AccessControl.model.AC_TecnicosModel', {
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
    	defaultValue: 3029
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Tecnico'
        },
		{name:'tec_ccodigo',type:'string'},
{name:'tec_cnombre',type:'string'},
{name:'tec_ctelefono',type:'string'},
{name:'tec_cmail',type:'string'},
{name:'tec_ningreso',type:'int',defaultValue:0},
{name:'tec_negreso',type:'int',defaultValue:0},
{name:'tec_cobservaciones',type:'string'},
{name:'tec_nestado',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_tecnicos/',
		appendId : true
		}
});