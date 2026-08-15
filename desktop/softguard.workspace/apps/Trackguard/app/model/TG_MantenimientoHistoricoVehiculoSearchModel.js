Ext.define('Trackguard.model.TG_MantenimientoHistoricoVehiculoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgmh_idkey',
    fields: [
        {
        name: 'Name',
        type: 'string'
        },
        
        {name: 'tgms_idkey', type: 'int'},
        {name: 'tgms_cnombre', type: 'string'},
        {name: 'tgms_cdescripcion', type: 'string'},
        {name: 'tgms_kilometros', type: 'int'},
        {name: 'tgms_meses', type: 'int'},
        {name: 'tgms_iorganizacion',type:'int'},
        {name: 'tgms_iestado',type:'int'},
        {name: 'tgms_icuentatipo',type:'int'},
        
        
        {name: 'tgmh_idkey', type: 'int'},
        {name: 'tgmh_idservicio', type: 'int'},
        {name: 'tgmh_cdescripcion', type: 'string'},
        {name: 'tgmh_iodometro', type: 'int', convert: function(v, record){
            if (v > 0) {
                return v;
            }            
        }},
        {name: 'tgmh_idispositivomovil', type: 'int'},
        {name: 'tgmh_dfecha', type:'date'},    
        
               
        {name: 'Id', type: 'int'},
        {name: 'Name', type: 'string'},
        {name: 'Brand', type: 'string'},
        {name: 'Model', type: 'string'},
        {name: 'Year', type: 'int'},
        {name: 'Domain', type: 'string'},
        {name: 'Colour', type: 'string'},
        {name: 'VehicleType', type: 'string'},
        {name: 'Photo', type: 'string'},
        {name: 'PhotoType', type: 'string'},
        {name: 'VehicleBrand', type: 'int'},
        {name: 'VehicleModel', type: 'int'},
        {name: 'OwnerTypeId', type: 'int'},
        {name: 'OwnerId', type: 'int'},
        {name: 'DriverTypeId', type: 'int'},
        {name: 'DriverId', type: 'int'},
        {name: 'SIM1', type: 'string'},
        {name: 'CompaniaSIM1', type: 'string'},
        {name: 'SIM2', type: 'string'},
        {name: 'CompaniaSIM2', type: 'string'},
        {name: 'NroMotor', type: 'string'},
        {name: 'NroChasis', type: 'string'},
        {name: 'PersonaDNI', type: 'string'},
        {name: 'PersonaGenero', type: 'string'},
        {name: 'PersonaFechaNacimiento', dateFormat: 'c'},
        {name: 'MascotaRaza', type: 'string'},
        {name: 'MascotaFechaNacimiento', type: 'date', dateFormat: 'c'},
        {name: 'MascotaGenero', type: 'string'},
        {name: 'MascotaColor', type: 'string'},
        {name: 'OtroTextolibre', type: 'string'},
        {name: 'MaxSpeed', type: 'int'},
        {name: 'OdometerDate', type: 'date', dateFormat: 'c'},
        {name: 'Odometer', type: 'int', convert: function(v, record){
            if (v > 0) {
                return v;
            }            
        }}
        
    ],
        
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/SearchTG_MantenimientoVehiculo_Servicios',
		appendId : true
    }
});