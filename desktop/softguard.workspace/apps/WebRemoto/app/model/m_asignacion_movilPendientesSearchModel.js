Ext.define('WebRemoto.model.m_asignacion_movilPendientesSearchModel', {
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
        defaultValue: 3161
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_asignacion_movil'
        },
		{name:'amv_objecttypeid',type:'int'},
        {name:'amv_objectid',type:'int'},
    {name:'amv_rec_iid',type:'int'},
    {name:'amv_estado',type:'int'},
    {name:'amv_prioridad',type:'int'},
    {name:'_amv_estado',type:'string', convert:function (values, model) {
        var estado = '';
      
        switch(model.get('amv_estado')) {
            case 0:
                estado = getLocale('Disponible')
            break;
            case 1:
                estado = getLocale('Asignado')
            break;
            case 2:
                estado = getLocale('Cancelado')
            break;
            case 3:
                estado = getLocale('Completado')
            break;
            case 11:
                estado = getLocale('En camino')
            break;
            case 12:
                estado = getLocale('Arribado')
            break;
            default:
                estado = getLocale('No definido')
            break;
        }
        
        return estado;
    }},
    
    {name:'tipoDispositivo',type:'string'},
    {name:'nombreDispositivo',type:'string'},
    
    
    {name:'cod_cDescripcion',type:'string'},
    {name:'cue_cnombre',type:'string'},
    {name:'cod_nColorLetra',type:'string'},
    {name:'cod_nColor',type:'string'},
    {name:'rec_cAlarma',type:'string'},
    {name:'rec_calarma',type:'string', convert: function (v,r) {
        return r.get('rec_cAlarma')
    }},


    {name:'rec_cContenido',type:'string'},
    
    
    {name:'cue_cLinea',type:'string'},
    {name:'cue_nCuenta',type:'string'},
    {name:'cue_cNombre',type:'string'},
    {name:'_cuenta',type:'string', convert: function (v,r) {
        return r.get('cue_cLinea')+'-'+r.get('cue_nCuenta')+' '+r.get('cue_cNombre')
    }},
    {name:'cue_cCalle',type:'string'},
    
    
    {name:'cue_clineaMovil',type:'string'},
    {name:'cue_cncuentaMovil',type:'string'},
    {name:'cue_cnombreMovil',type:'string'},
    
    {name:'_cuentaMovil',type:'string', convert: function (v,r) {
        return r.get('cue_clineaMovil')+'-'+r.get('cue_cncuentaMovil')+' '+r.get('cue_cnombreMovil')
    }},


        {name:'rec_iid',type:'int'},
        {name:'rec_iidcuenta',type:'int'},
        {name:'rec_czona',type:'string'},
        {name:'rec_iusuario',type:'int'},
        {name:'rec_nestado',type:'string'},
        {name:'rec_norigen',type:'string'},
        {name:'rec_ccontenido',type:'string'},
        {name:'rec_tfechahora',type:'string'},
        {name:'rec_tfecharecepcion',type:'string'},
        {name:'rec_tfechaproceso',type:'string'},
        {name:'rec_ioperador',type:'int'},
        {name:'rec_cobservaciones',type:'string'},
        {name:'rec_cterminal',type:'string'},
        {name:'rec_idresolucion',type:'string'},
        {name:'rec_idreceptor',type:'int'},
        {name:'rec_ccategorizacion',type:'string'},
        {name:'rec_inyr',type:'int'},
        {name:'rec_ite',type:'int'},
        {name:'rec_idmap',type:'int'},
        {name:'rec_idfwd',type:'int'},
        {name:'rec_iminutosespera',type:'int'},
        {name:'rec_ipuerto',type:'int'},
        {name:'rec_idloc',type:'int'},
        {name:'rec_iprioridad',type:'int', mapping: 'rec_iprioridad1'},
        {name:'rec_isofechahora',type:'date', dateFormat : 'c'},
        {name:'rec_isofechaproceso',type:'date', dateFormat : 'c'},
        {name:'rec_isofecharecepcion',type:'date', dateFormat : 'c'},
        {name:'_origen',type:'string'},        
        {name:'_puerto',type:'string'},
        {name:'tsp_cdescripcion',type:'string'},
        {name:'tsp_cpathicon',type:'string'},
        {name:'rxl_clog',type:'string'},
        {name:'rxl_cevento',type:'string'},
        {name:'clinkvideo',type:'string'},
        {name:'cvl_clinkdss',type:'string'},
        {name:'cue_clinea',type:'string', convert: function (v,r) {
            return r.get('cue_cLinea')
        }},
        {name:'cue_ncuenta',type:'string', convert: function (v,r) {
            return r.get('cue_nCuenta')
        }},
        {name:'cue_cnombre',type:'string', convert: function (v,r) {
            return r.get('cue_cNombre')
        }},


        {name:'cue_cfoto',type:'string'},
        {name:'cue_ccalle',type:'string'},

        {name:'cue_cLocalidad',type:'string'},
        {name:'cue_clocalidad',type:'string', convert:function (v,r) {
            return r.get('cue_cLocalidad')
        }},

        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_nparticion',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        
        {name:'cue_cobservacion',type:'string'},        
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_dfechaalta',type:'string'},
        {name:'cue_dservicio',type:'string'},
        {name:'cue_nEfectiva',type:'int'},
        {name:'cue_cIdExtendido',type:'string'},
        {name:'cue_iZonaHoraria',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_dservicio',type:'date'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
                
        {name:'cue_nllaveul',type:'int'},
        {name:'cue_nsonidoul',type:'int'},
        {name:'cue_nmostrar',type:'int'},
                
        {name:'madre_clinea',type:'string'},
        {name:'madre_ncuenta',type:'string'},
        {name:'madre_cnombre',type:'string'},
        {name:'cremotehostip',type:'string'},
        
        {name:'zon_cdescripcion',type:'string'},
        {name:'zon_cimagen',type:'string'},
        {name:'zon_calarmaagenerar',type:'string'},
        {name:'zon_ccodigo',type:'string'},
        {name:'zon_ccodigorestauracion',type:'string'},
        {name:'zon_cdealer',type:'string'},
        {name:'zon_ccuenta',type:'string'},
        {name:'zon_clistaemergencia',type:'string'},
        {name:'zon_codigoalarma',type:'string'},
        {name:'zon_mobservacion',type:'string'},
        {name:'zon_nautoprocesa',type:'string'},
        {name:'zon_nminutosrestauracion',type:'string'},
        {name:'zon_nmostrar',type:'string'},
        
        {name:'usu_cnombre',type:'string'},
        {name:'_morosidad',type:'string'},
        {name:'_notatemporal',type:'string'},
        {name:'_situacioncuenta',type:'string'},
        {name:'fenpruebaporzona',type:'string'},
        {name:'_workflowstatus',type:'string'},
        {name:'_idorganizacion',type:'int'},
        
        {name:'cod_cdescripcion',type:'string', convert: function (v,r) {
            return r.get('cod_cDescripcion')
        }},
        {name:'cod_ncolor',type:'string', convert: function (v,r) {
            return r.get('cod_nColor')
        }},
        {name:'cod_ncolorletra',type:'string', convert: function (v,r) {
            return r.get('cod_nColorLetra')
        }},


        {name:'cod_ntipo',type:'string'},
        {name:'cod_nleesonido',type:'string'},
        {name:'cod_csonido',type:'string'},
        {name:'cod_cinstrucciones_DSS',type:'string'},
        {name:'cod_nprioridad', type : 'int'},
        
        {name:'ope_cnombre',type:'string'},
        {name:'ope_clogin',type:'string'},
        {name:'rec_cdescripcion',type:'string'},
        {name:'rec_cdll',type:'string'},
        {name:'rec_ntcpip',type:'string'},
        {name:'rxi_cimg',type:'string'},
        {name:'rxi_ccarpeta',type:'string'},
        {name:'rxi_nestado',type:'string'},
        {name:'rxi_ctipo',type:'string'},
        {name:'rxi_cconfig',type:'string'},
        {name:'res_ccodigo',type:'string'},
        {name:'res_cdescripcion',type:'string'},
        {name:'res_nfalsaalarma',type:'string'},
        {name:'res_nestado',type:'string'},
        {name:'cat_ccodigo',type:'string'},
        {name:'cat_cdescripcion',type:'string'},
        {name:'gps_rlatitud',type:'string'},
        {name:'gps_rlongitud',type:'string'},
        {name:'sta_ncontadorfa',type:'string'},
        {name:'sta_nestado',type:'int'},
        {name:'fal_nmargen',type:'string'},
        {name:'tip_ntipo',type:'string'},
        {name:'cue_cLatLng',type:'string'},

        {name:'cue_clatlng',type:'string', convert: function(v,r) {
            return r.get('cue_cLatLng')
        }},



        {name:'sp_rlatitud',type:'string'},
        {name:'sp_rlongitud',type:'string'},
        {name : 'rxt_nSPIP', type : 'string'},
        {name : 'rxt_nSPSMS', type : 'string'},
        {name : 'rxt_nVCIP', type : 'string'},
        {name : 'rxt_nVCSMS', type : 'string'},
        {name : 'rxt_iSecuencia', type : 'int', defaultValue : 0},
        {name : 'operadorAtendiendoCuenta', type : 'int'},
        
        
        {name : 'stc_iid', type : 'int'},
        {name : 'cli_nsituacion', type : 'int'},
        {name : 'cli_icodigo_id', type : 'int'},
        
        
        {name : 'not_dtemporaldesde', type : 'date'},
        {name : 'not_dtemporalhasta', type : 'date'},
        {name : 'not_iidcuenta', type : 'int'},
        {name : 'not_mnotaprincipal', type : 'string'},
        {name : 'not_mnotatemporal', type : 'string'},
        
        {name : 'est_nestado', type : 'int'},
        {name : 'situacion_cuenta', type : 'string'},
        
        {name : 'rxl_clinecard', type : 'string'},
        {name : 'organizacionName', type : 'string'},
        

        {name:'_fullname',type:'string',convert: function(v, record){
            return record.get('cue_clinea')+"-"+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
        }},
        {
            name : '_evento',
        	type : 'string',
            convert: function(v,record){
                return record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
            }
		}
 
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_asignacion_movilPendientes',
		appendId : true
	}
});
