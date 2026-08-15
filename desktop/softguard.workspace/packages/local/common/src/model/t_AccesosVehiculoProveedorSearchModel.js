Ext.define('Common.model.t_AccesosVehiculoProveedorSearchModel', {
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
        defaultValue: 'T_AccesosVehiculoProveedor'
        },
        {name:'Brand',type:'string'},
        {name:'Model',type:'string'},
        {name:'avp_iVehicleBrand',type:'int'},
        {name:'avp_iVehicleModel',type:'int'},
        {name:'avp_cMatricula',type:'string'},
        {name:'avp_cColor',type:'string'},
        {name:'avp_iYear',type:'int'},
        {name:'avp_cTipo',type:'string'},
        {name:'avp_cCiaSeguro',type:'string'},
        {
            name:'avp_tVtoSeguro',
            type:'date',
            convert: function (v,r){
                var date = new Date(v);
                if (date.getFullYear() <= 1900){
                    return null;
                } else{
                    return v;
                }
            }
        },
        {
            name:'avp_tVtoVTV',
            type:'date',
            convert: function (v,r){
                var date = new Date(v);
                if (date.getFullYear() <= 1900){
                    return null;
                } else{
                    return v;
                }
            }
        },
        {name:'avp_cIdentificacion',type:'string'},
        {
            name:'avp_tVtoIdentificacion',
            type:'date',
            convert: function (v,r){
                var date = new Date(v);
                if (date.getFullYear() <= 1900){
                    return null;
                } else{
                    return v;
                }
            }        
        },
        {name:'avp_cObservaciones',type:'string'},
        {name:'avp_cPathPicture',type:'string'}

        
    ],
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/T_AccesosVehiculoProveedorSearch',
        appendId : false
	}
});
