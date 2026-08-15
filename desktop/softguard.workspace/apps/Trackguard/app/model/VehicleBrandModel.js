Ext.define('Trackguard.model.VehicleBrandModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        }/*,
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3227
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'T_AccesosVehiculoProveedor'
        },
        {name:'Brand',type:'string'},
        {name:'Model',type:'string'},
        {name:'avp_cMatricula',type:'string'},
        {name:'avp_cColor',type:'string'},
        {name:'avp_iYear',type:'int'},
        {name:'avp_cTipo',type:'string'},        
        {name:'avp_cCiaSeguro',type:'string'}, 
        {name:'avp_tVtoSeguro',type:'string'}, */
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		
        url : '/Rest/VehicleBrand',
		appendId : true
	}
});