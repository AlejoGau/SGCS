Ext.define('Trackguard.model.GeoFenseRestriccionesSearchModel', {
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
        defaultValue: 'geofenserestricciones'
        },
	
{name:'nombreCuentaReceptora',type:'string'},
{name:'nombreCuentaMonitoreada',type:'string'},
{name:'idCuentaMonitoreada',type:'int'},
{name:'idCuentaReceptora',type:'int'},

{name:'GeoType',type:'string'},
{name:'Dealer',type:'string'},
{name:'MetaData',type:'string'}
        


   
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/GeoFenseRestricciones',
		appendId : true
	}
});
