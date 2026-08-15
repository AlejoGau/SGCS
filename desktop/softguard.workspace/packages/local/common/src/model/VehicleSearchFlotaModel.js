//MIGRADO2024
function convertLatLng(v, record){
    return v.replace(/,/g,'.');
}
Ext.define('Common.model.VehicleSearchFlotaModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
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
            defaultValue: 659
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
        	defaultValue: 'Vehicle'
        },
		{name:'BrandName',type:'string'},
        {name:'ModelName',type:'string'},
        {name:'Year',type:'int',defaultValue:0},
        {name:'Domain',type:'string'},
        {name:'Colour',type:'string'},
        {name:'VehicleType',type:'string'},
        {name:'Photo'},
        {name:'PhotoType',type:'string'},
        {name:'VehicleBrand',type:'int',defaultValue:0},
        {name:'VehicleModel',type:'int',defaultValue:0},
        {name:'OwnerTypeId',type:'int',defaultValue:0},
        {name:'OwnerId',type:'int',defaultValue:0},
        {name:'MaxSpeed',type:'int',defaultValue:0},
        
        {name:'NroMotor',type:'string'},
        {name:'NroChasis',type:'string'},
        {name:'PersonaDNI',type:'string'},
        {name:'PersonaGenero',type:'string'},
        {name:'PersonaFechaNacimiento',type:'string'},
        {name:'MascotaRaza',type:'string'},
        {name:'MascotaFechaNacimiento',type:'string'},
        {name:'MascotaGenero',type:'string'},
        {name:'MascotaColor',type:'string'},
        {name:'OtroTextolibre',type:'string'},
        {name:'CompaniaSIM1',type:'string'},
        {name:'SIM1',type:'string'},
        {name:'SIM2',type:'string'},
        
        {name:'lin_crazonsocial',type:'string'},
        
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_nPrioridad',type:'int'},
        {name:'cue_cimei',type:'string'},
        /*{name:'cue_dfechaalta',type:'date', convert: function(v,r){
            var date = new Date(v);
            if (date.getFullYear() == 1900){
                return null;
            } else{
                return v;
            }
            
        }},*/
        
        {name:'cue_dservicio',type:'date'},
        {name:'cue_dfechaalta',type:'date'},
        
        {name:'Situacion',type:'string'},
        
        {name:'tip_nTipo', type:'int', defaultValue:0},
        {name:'tip_cdescripcion',type:'string'},
        {name:'tip_curlimagen', type:'string'},
        {name:'sta_cultimaalarma',type:'string'},
        {name:'sta_dfechautimaalarma',type:'string'},
        {name:'sta_cultimaalerta',type:'string'},
        {name:'sta_dfechaultimaalerta',type:'string'},
        
        {name:'sta_dFechaUltimaAlerta',type:'string', convert: function (value,record) {
            return record.get('sta_dfechaultimaalerta')
        }},
        
        
        {name:'sta_dfechaultimotst',type:'string'},
        {name:'sta_dfechaultimo2dotst',type:'string'},
        
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_nColorLetra',type:'string'},
        {name:'cod_ncolor',type:'string'},
        {name:'act_nestado',type:'int',defaultValue:0},
        {name:'est_nestado',type:'int',defaultValue:0},
        
        {
    		name : 'gps_isofechahora',
			type : 'date',
            dateFormat:'c'
		},
        {name:'gps_idRec',type:'int',defaultValue:0},
        {name:'gps_iid',type:'int',defaultValue:0},
        {name:'gps_rLatitud'/*, convert: convertLatLng*/},
        {name:'gps_rLongitud'/*, convert: convertLatLng*/},
        {name:'gps_iRumbo'},
        {name:'gps_Rumbo'},
        {name:'gps_iSentido'},
        {name:'gps_iNivelSenial',type:'int'},
        {name:'gps_iSatelites',type:'int'},
        
        {
        	name : 'gps_isorawfechahora',
			type : 'date'
		},
        {
            name : 'gps_trawfechahora',
			type : 'date',
            mapping: 'gps_tRawfechahora'
            ,dateFormat: 'n/j/Y g:i:s A'
		},
        
        {name:'gps_iBattery'},
        {name:'gps_iFuel'},
        {name:'gps_iEngineStatus'},
        {name:'gps_iOdometro'},
        
        {name:'rxl_cLog'},
        {name:'gps_iVelocidad',type:'int',defaultValue:0},
        {name:'rec_cdescripcion'},
        {name:'rec_cdll'},
        {name:'evt_pendiente'}
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
        
    proxy : {
		type : 'vehiclesearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/search/Vehicle',
		appendId : false
	}
});