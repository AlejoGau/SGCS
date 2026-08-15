//MIGRADO2024
Ext.define('Common.model.EncuestaEstadisticaEstadoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'enr_idkey', type:'int'},
        {name:'enr_encidkey', type:'int'},
        {name:'enr_encname',type:'string'},
        {name:'enr_epricuenta', type:'int'},
        {name:'enr_eprspidkey', type:'int'},
        {name:'enr_eprcuser',type:'string'},
        {name:'enr_estado', type:'int'},
        {name:'estado',type:'string'},
        
        {name:'Id', type:'int'},
        {name:'Telefono',type:'string'},
        {name:'Imei',type:'string'},
        {name:'Modelo',type:'string'},
        {name:'Marca',type:'string'},
        {name:'Version',type:'string'},
        {name:'Tipo',type:'string'},
        {name:'CuentaId',type:'int',defaultValue:0},    
        {name:'Nombre',type:'string'},
        {name:'Config',type:'string'},
        {name:'fechaAlta',type:'date'},
        {name:'pushToken',type:'string'},
        {name:'EnFalloDeTesteo',type:'string'},        
        {name:'EnFalloDeTesteoDesde',type:'date'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string',convert: function(v, record){
            if (v){
                v = v.substr(0,4);
            }
            return v;
        }},
        {name:'_descripcion',type:'string',convert: function(v, record){
            
            return record.get('cue_clinea')+" ("+record.get('cue_cnombre')+")";
        }},
        {name:'_fullname',type:'string',convert: function(v, record){
            return record.get('cue_clinea')+"-"+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
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
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS', convert: function(v,r){
            var date = new Date(v);
            if (date.getFullYear() == 1900){
                return null;
            } else{
                return v;
            }
        }},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'cue_nPrioridad',type:'int'},
        {name:'gps_tfechahora',type:'date', dateFormat:'c'},
        {name:'cue_nmostrar',type:'int',defaultValue:0},
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'cue_nsonidoul',type:'int',defaultValue:0},
        {name:'cue_nllaveul',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_cCustom',type:'string'},
        {name:'cue_iZonaHoraria',type:'int',defaultValue:0},
        
        
    ],
    	
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/p_encuesta_respondidasSearch',
		appendId : false
	}
});