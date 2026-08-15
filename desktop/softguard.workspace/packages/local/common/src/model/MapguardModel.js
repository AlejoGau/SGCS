//MIGRADO2024
Ext.define('Common.model.MapguardModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tmp_idKey',
    fields: [
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 659
        },
        {name:'Id',type:'string',convert: function(v, record){
           
            return record.get('tmp_idKey')
        }},
        {
            name: 'Name',
            type: 'string',
            mapping: 'cue_cnombre'
        },
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string',convert: function(v, record){
            if (v){
                v = v.substr(0,4)
            }
            return v
        }},
        {name:'_cuenta',type:'string',convert: function(v, record){
            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
        }},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_provincia',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int',defaultValue:0},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'cue_nmostrar',type:'int',defaultValue:0},
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'cue_nsonidoul',type:'int',defaultValue:0},
        {name:'cue_nllaveul',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cimei',type:'string', convert: function (v,r) {
            return r.get('cue_cIMEI')
        }},
        {name:'tmp_nestado',type:'int',defaultValue:0},
        {name:'tmp_iid',type:'int',defaultValue:0},
        {name:'tmp_idKey',type:'int',defaultValue:0},
        {name:'tmp_icuenta',type:'int',defaultValue:0},
        {name:'tmp_iAsignado',type:'int',defaultValue:0},
        
         
        {name:'tmp_cnombre',type:'string'},
        {name:'_cestado', type: 'string', convert: function(value, record){
            switch(record.get('tmp_nestado'))
            {
            case 1:
              return getLocale('Disponible');
              break;
            case 2:
              return getLocale('Fuera de servicio');
            case 3:
              return getLocale('Asignado');
              break;
            default:
              return '';
            }
        }},
        {name:'cflota',type:'string'},
        {name:'cService',type:'string', defaultValue:'Police'},
        {name:'cLatLng',type:'string'},
        {name:'cue_cLatLng',type:'string', mapping: 'cLatLng'},
        {name:'nDifFMinutes',type:'int',defaultValue:0},
        {name:'asi_cueiid', type: 'int'},
        {name: 'asi_cLatLng',type:'string'},
        {name: 'asi_clinea',type:'string'},
        {name: 'asi_cnombre',type:'string'},
        {name: 'asi_ncuenta',type:'string'},
        {name: 'lat',type:'string'},
        {name: 'long',type:'string'},
        {name:'gps_rLatitud', convert: function(value, record){
            if(value == '') {
                return record.get('gps_rlatitud')
            } else {
                return value
            }
            
        }},
        {name:'gps_rLongitud', convert: function(value, record){
            if(value == '') {
                return record.get('gps_rlongitud')
            } else {
                return value
            }
            
        }},
        
        {name:'gps_isorawfechahora'},
        {name:'gps_rlatitud'},
        {name:'gps_rlongitud'},
        {name:'gps_tfechahora',type:'string'},
        {name:'gps_rAccuracy'},
        
        {name:'amv_estado'},
        {name:'amv_idkey'},
        {name:'amv_objectid'},
        {name:'amv_objecttypeid'},
        {name:'amv_prioridad'},
        {name:'amv_rec_iid'},
        
        {name:'state', type: 'string'}
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/search/MP_Vehicles',
		appendId : false
	}
});
																