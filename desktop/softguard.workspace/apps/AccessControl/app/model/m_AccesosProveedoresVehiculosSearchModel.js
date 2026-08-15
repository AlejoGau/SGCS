Ext.define('AccessControl.model.m_AccesosProveedoresVehiculosSearchModel', {
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
        defaultValue: 3230
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_AccesosProveedoresVehiculos'
        },
//apv_idKeyProveedor,apv_idKeyVehiculo, avp_iVehicleBrand,avp_iVehicleModel
//,avp_cMatricula,avp_cColor,avp_iYear
        {name:'apv_idKeyProveedor',type:'int'},
        {name:'apv_idKeyVehiculo',type:'int'}, 
        {name:'avp_iVehicleBrand',type:'int'}, 
        {name:'avp_iVehicleModel',type:'int'},
        {name:'avp_cMatricula',type:'string'}, 
        {name:'avp_cColor',type:'string'}, 
        {name:'avp_iYear',type:'int'},
        {name:'avp_cPathPicture',type:'string'}
        

        
    ],
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/m_AccesosProveedoresVehiculosSearch',
        appendId : false
	}
});
