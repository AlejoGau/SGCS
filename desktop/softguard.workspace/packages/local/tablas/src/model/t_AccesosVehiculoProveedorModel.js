Ext.define('Tablas.model.t_AccesosVehiculoProveedorModel', {
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
        defaultValue: 3232
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'T_AccesosVehiculoProveedor'
        },
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
			    dateFormat:'MS',
                convert: function(value) {
                    if(value){
                        if(!isNaN(value)){
                            var date = new Date(value)
                        }else{
                            var date = Ext.Date.parse(value, 'MS');
                        }
                        if(date){
                            if(date.getFullYear() <= 1900){
                                return null
                            }else{
                                return date
                            }
                        }
                    }
                    return null;
                }
            },
            {
                name:'avp_tVtoVTV',
			    type:'date',
			    dateFormat:'MS',
                convert: function(value) {
                    if(value){
                        if(!isNaN(value)){
                            var date = new Date(value)
                        }else{
                            var date = Ext.Date.parse(value, 'MS');
                        }
                        if(date){
                            if(date.getFullYear() <= 1900){
                                return null
                            }else{
                                return date
                            }
                        }
                    }
                    return null;
                }
            },
            {name:'avp_cIdentificacion',type:'string'},
            {
                name:'avp_tVtoIdentificacion',
                type:'date',
                dateFormat:'MS',
                convert: function(value) {
                    if(value){
                        if(!isNaN(value)){
                            var date = new Date(value)
                        }else{
                            var date = Ext.Date.parse(value, 'MS');
                        }
                        if(date){
                            if(date.getFullYear() <= 1900){
                                return null
                            }else{
                                return date
                            }
                        }
                    }
                    return null;
                }
            },
            {name:'avp_cObservaciones',type:'string'},
            {name:'avp_cPathPicture',type:'string'}

        ],
           
        proxy: {
            type: 'rest',
            url: '/Rest/t_AccesosVehiculoProveedor/',
            appendId: true,
            writer:{ writeAllFields:true }
        }});
