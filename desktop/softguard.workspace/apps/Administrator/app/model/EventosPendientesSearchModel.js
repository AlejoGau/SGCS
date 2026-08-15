Ext.define('Administrator.model.EventosPendientesSearchModel', {
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
        defaultValue: 3075
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'EventosPendientes'
        },
		{name:'rec_iid',type:'int'},
        {name:'rec_iidcuenta',type:'int'},
        
        {name:'rec_calarma',type:'string'},
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
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_nparticion',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cobservacion',type:'string'},        
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cinstalador',type:'string'},
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
        {name:'_ZonaParticion',type:'string'},
        
        {name:'Usuario_cnombre',type:'string'},
        {name:'_morosidad',type:'string'},
        {name:'_notatemporal',type:'string'},
        {name:'_situacioncuenta',type:'string'},
        {name:'_eventoenpruebaporzona',type:'string'},
        {name:'_workflowstatus',type:'string'},
        {name:'_idorganizacion',type:'int'},
        
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_ncolor',type:'string'},
        {name:'cod_ncolorletra',type:'string'},
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
        {name:'gps_cIMEI',type:'string'},
        {name:'sta_ncontadorfa',type:'string'},
        {name:'sta_nestado',type:'int'},
        {name:'fal_nmargen',type:'string'},
        {name:'tip_ntipo',type:'string'},
        {name:'cue_clatlng',type:'string'},
        {name:'sp_rlatitud',type:'string'},
        {name:'sp_rlongitud',type:'string'},
        {name : 'rxt_nSPIP', type : 'string'},
        {name : 'rxt_nSPSMS', type : 'string'},
        {name : 'rxt_nVCIP', type : 'string'},
        {name : 'rxt_nVCSMS', type : 'string'},
        {name : 'rxt_iSecuencia', type : 'int', defaultValue : 0},
        {name : 'rxt_cimei', type : 'string'},
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
        
        {name : 'ttz_cTitle', type : 'string'},
        {name : 'ttz_nOffSet', type : 'string'},
        {name : 'nvs_nNivel', type : 'int'},
        
        
        {
        	name : '_rec_cContenido',
			type : 'string',
            convert: function (val,rec) {
                return rec.get('rec_ccontenido')
            }
		}, {
                name : '_rec_isoFechaProceso',
    			type : 'date',
                convert: function(v,record){
                    return record.get('rec_isofechaproceso');
                }
    		}, {
                name : '_cuenta',
        		type : 'string',
                convert: function(v,record){
                    return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                }
    		}, {
                name : '_evento',
        		type : 'string',
                convert: function(v,record){
                    return record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                }
    		},{
                name: '_zona', type: 'string', convert: function(v, record){
                    if (record.get('zon_cdescripcion') == ''){
                        return record.get('rec_czona');
                    } else{
                        return record.get('zon_cdescripcion');
                    }
                }
            }, {
                name : '_zon_cdescripcion',
				type : 'string'
			}
            ,{name : '_usu_cnombre',type : 'string'}
            ,{name : 'usu_cnombre',type : 'string'}
            ,{name : 'usu_cimagen',type : 'string'}

            /// para compatibilizar los que son con mayuscula
            ,{ name: 'rec_nOrigen', type: 'string', mapping:'rec_norigen'}
            ,{ name: 'rec_iPuerto', type: 'string', mapping:'rec_ipuerto'}
            ,{ name: 'rec_iPrioridad', type: 'int', mapping:'rec_iprioridad'}
            ,{ name: 'cue_cLocalidad', type: 'int', mapping:'cue_clocalidad'}
            
            ,{ name: 'rec_cContenido', type: 'string', mapping:'rec_ccontenido'}
            ,{ name: 'cue_iid', type: 'int', mapping:'rec_iidcuenta'}
            ,{ name: 'rec_isoFechaHora', type: 'int', convert: function(v, record){                   
                    return record.get('rec_isofechahora');                    
                }
            },{ name: 'rec_idResolucion', type: 'string', convert: function(v, record){                   
                    return record.get('rec_idresolucion');                    
                }
            },{ name: 'rec_cCategorizacion', type: 'string', convert: function(v, record){                   
                    return record.get('rec_ccategorizacion');                    
                }
            },{ name: 'cod_cSonido', type: 'string', convert: function(v, record){                   
                    return record.get('cod_csonido');                    
                }
            },{ name: 'cue_cLatLng', type: 'string', convert: function(v, record){                   
                    return record.get('cue_clatlng');                    
                }
            }
            ,{ name: 'lin_crazonsocial', type: 'string'}
            ,{ name: 'lin_cimagen', type: 'string'}
            ,{ name: 'pro_nProceso', type: 'int'}
            ,{ name: 'amv_estado', type: 'int'}
            ,{ name: 'amv_idkey', type: 'int'}            
            ,{ name: 'amv_objecttypeid', type: 'int'}
            
            ,{ name: 'sta_dfechautimaalarma', type: 'date', dateFormat: 'c'}
            ,{ name: 'sta_cod_cdescripcion', type: 'string'}
            ,{ name: 'sta_cod_ncolor', type: 'int'}
            ,{ name: 'sta_cod_ncolorletra', type: 'int'}
            ,{ name: 'sta_cod_ntipo', type: 'int'}
            ,{ name: 'sta_cod_nleesonido', type: 'int'}
            ,{ name: 'sta_cod_csonido', type: 'string'}
            ,{ name: 'sta_cod_ccodigo', type: 'string'}
            ,{ name: 'tel_ctelefono', type: 'string'}
            
            ,{ name: 'isFiltroPorOrganizacion', type: 'string'}
            ,{name:'_tfechahoraOffset', type:'date', dateFormat : 'n/j/Y g:i:s A'}   
        ],
 
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/EventosPendientes',
		appendId : true
	},
    
    
    /**** METODOS *****/
    
    getVideoLinkParser: function () {       
        return {
            tvi_nLaunch: '', //---- FALTAAAAAAA
            rxi_cCarpeta: this.get("rxi_ccarpeta"),
            rxi_cImg: this.get("rxi_cimg"),
            rxi_nestado: this.get("rxi_nestado"),
            rxi_ctipo: this.get("rxi_ctipo"),
            rxi_cconfig: this.get("rxi_cconfig"),
            
        }
    },
    
    getZonaImagen: function () {        
        return {
            zon_cimagen: this.get("zon_cimagen")
            
        }
    },
    
    /**
     * Carga la nota temporal de la cuenta del evento
     * @param callback (function) function de retorno
     * @param force (bool) si es true fuerza a cargar saltando lo almacenado previamente y lo vuelve a almacenar
     * @return record (object) el record completo de la nota temporal
     */
    loadNotaTemporal: function (callback, force) {
        
        /**** TODO: En el SP de eventos pendientes ahora si solicitas los datos full ya viene *****/
        var record = this;
        
        
        if(record.get('not_dtemporaldesde')) {
            callback(record);
            return true;
        }
        
        if(record._notaTemporalData && force != true) {
           callback(record._notaTemporalData);
           return true;
           
        }
        
        var notaStore =Ext.create('Ext.data.Store',{
            model: 'Administrator'+'.model.NotaSearchModel',
            remoteFilter: true,
            filters: [
                    {
                        property:'not_iidcuenta',
                        value: record.get('rec_iidcuenta')
                    }
                ]
        }).load({callback:function (records) {
            if(records) {
                record._notaTemporalData = records[0];
            } else {
                record._notaTemporalData = null;
            }
            callback(record._notaTemporalData);
            return true;
            
        }});
        
    }
});