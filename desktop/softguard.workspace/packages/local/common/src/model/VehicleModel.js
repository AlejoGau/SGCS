//MIGRADO2024
Ext.define('Common.model.VehicleModel', {
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
    	defaultValue: 3045
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'DispositivoMovil'
        },
		{name:'Brand',type:'string'},
        {name:'Model',type:'string'},
        {name:'Year',type:'int',defaultValue:0},
        {name:'Domain',type:'string'},
        {name:'Colour',type:'string'},
        {name:'VehicleType',type:'string'},
        {name:'Photo',type:'string'},
        {name:'PhotoType',type:'string'},
        {name:'VehicleBrand',type:'int',defaultValue:0},
        {name:'VehicleModel',type:'int',defaultValue:0},
        {name:'OwnerTypeId',type:'int',defaultValue:0},
        {name:'OwnerId',type:'int',defaultValue:0},
        {name:'DriverTypeId',type:'int',defaultValue:0},
        {name:'DriverId',type:'int',defaultValue:0},
        {name:'SIM1',type:'string'},
        {name:'CompaniaSIM1',type:'string'},
        {name:'SIM2',type:'string'},
        {name:'CompaniaSIM2',type:'string'},
        {name:'NroMotor',type:'string'},
        {name:'NroChasis',type:'string'},
        {name:'PersonaDNI',type:'string'},
        {name:'PersonaGenero',type:'string'},
        {name:'PersonaFechaNacimiento',type:'date', format: 'MS', defaultValue: new Date(1900,1,1)},
        {name:'MascotaRaza',type:'string'},
        {name:'MascotaFechaNacimiento',type:'date', format: 'MS', defaultValue: new Date(1900,1,1)},
        {name:'MascotaGenero',type:'string'},
        {name:'MascotaColor',type:'string'},
        {name:'MaxSpeed',type:'int',defaultValue:0},
        {name:'OtroTextolibre',type:'string'},
        //{name:'OdometerDate',type:'date', format: 'MS', defaultValue: new Date(1900,1,1)},
        
        {name:'tip_nTipo', type:'int', defaultValue:0},
        {name:'cue_cclave', type:'string'},
        {name:'tip_cdescripcion',type:'string'},
        {name:'Odometer',type:'int', defaultValue:0},
        {name:'OdometerDate',type:'date', format: 'MS', defaultValue: new Date(1900,1,1)},
        /**https://basecamp.com/2249105/projects/2749985/todos/439718992 */
        {name:'ParkingLot',type:'boolean'}
        /** */
    ],
    
    /**
     * Carga el search de cuenta 
     */
    loadCuentaSearch: function (callback) {
        
        var record = this;
        
        
        var cuentaStore =Ext.create('Ext.data.Store',{
            model: 'Common.model.CuentaSearchModel',
            remoteFilter: true,
            filters: [
                    {
                        property:'cue_iid',
                        value: record.get('cue_iid')
                    }
                ]
        }).load({callback:function (records) {
            if(records) {
                record._recordCuentaFull = records[0];
            } else {
                record._recordCuentaFull = null;
            }
            callback(record._recordCuentaFull);
            return true;
            
        }});
        
    },
		
    proxy: {
		type : 'rest',
		url : '/Rest/DispositivoMovil/',
		appendId : true
	}
});
																