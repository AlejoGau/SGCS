//MIGRADO2024
Ext.define('Common.model.EventoSonidoSearchModel', {
    extend : 'Ext.data.Model',
    // idProperty : 'Id',
    fields : [{
    			name : 'Id',
				type : 'int',
                mapping: 'rec_iid'
			},{
				name : 'cod_nprioridad',
				type : 'int'
			},{
    			name : 'rec_iid',
				type : 'int'
			},{
    			name : 'ta.cod_nprioridad',
                mapping: 'cod_nprioridad',
				type : 'int'
			}, {
				name : 'cod_ncolor',
				type : 'int'
			}, {
    			name : 'cod_cSonido',
				type : 'string'
			}
            ,{
				name : 'cod_ncolorletra',
				type : 'int'
			}, {
				name : 'tiene_notificaciones',
				type : 'bool'
			}, {
				name : 'rec_cCategorizacion',
				type : 'string'
			}, {
				name : 'cod_cdescripcion',
				type : 'string'
			}, {
				name : 'rec_cContenido',
				type : 'string'
			}, {
        		name : '_rec_cContenido',
				type : 'string',
                convert: function (val,rec) {
                    return rec.get('rec_cContenido')
                }
			}, {
				name : 'rec_cObservaciones',
				type : 'string'
			}, {
				name : 'rec_cTerminal',
				type : 'string'
			}, {
    			name : 'rec_czona',
				type : 'string'
			}, {
				name : 'rec_calarma',
				type : 'string'
			}, {
				name : 'zon_cdescripcion',
				type : 'string'
			}, {
				name : 'usu_cnombre',
				type : 'string'
			}, {
    			name : 'usu_icodigo',
				type : 'string'
			}, {
    			name : '_usu_cnombre',
				type : 'string'
			}, {
				name : 'rec_iMinutosEspera',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_iNYR',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_idReceptor',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_idResolucion',
				type : 'string'
			}, {
				name : 'rec_iid',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_iidcuenta',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_ioperador',
				type : 'int',
				defaultValue : 0
			}, {
    			name : 'rec_iPrioridad',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_iusuario',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_nOrigen',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'rec_nestado',
				type : 'int',
				defaultValue : 0
			}, {
    			name : '_rec_nestado',
				type : 'int',
				defaultValue : 0,
                convert: function(x, record){
                    var v = record.get('rec_nestado');
                    if (v == 9 || v == 1 || v == 4) {
                        return 1;
                    }if (v == 3 || v == 5 || v == 6|| v == 7) {
                        return 3;
                    } else {
                        return v
                    }
                }
			}, {
				name : 'rec_isoFechaProceso',
				type : 'date',
                dateFormat : 'c'
			}, {
            	name : '_rec_isoFechaProceso',
    			type : 'date',
                convert: function(v,record){
                    return record.get('rec_isoFechaProceso');
                }
    		}, {
				name : 'rec_isoFechaRecepcion',
				type : 'date',
				dateFormat : 'c'
			}, {
				name : 'rec_isoFechaHora',
				type : 'date',
				dateFormat : 'c'
			}, {
				name : 'cue_clinea',
				type : 'string'
			}, {
    			name : 'cue_clocalidad',
				type : 'string'
			}, {
				name : 'cue_cnombre',
				type : 'string'
			}, {
				name : 'cue_ncuenta',
				type : 'string'
			}, {
    			name : 'cue_ccalle',
				type : 'string'
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
    		}, {
    			name : 'cue_cubicacion',
				type : 'string'
			}, {
        		name : 'cue_iid',
				type : 'int',
                mapping: 'rec_iidcuenta'
			}, {
            	name : 'cue_ctelefono',
				type : 'string'
			}, 
            {
        		name : 'rec_iPuerto',
				type : 'int',
				defaultValue : 0
			},{
            	name : 'cue_cclave',
				type : 'string'
			},{
                name : 'cue_clatlng',
				type : 'string'
			},{
                name : 'cue_cpermiso',
				type : 'string'
			},{
                name : 'cue_cprovincia',
    			type : 'string'
			},{
                name : 'pro_cdescripcion',
        		type : 'string'
			}
            , {
            	name : 'rxt_nSPIP',
				type : 'string'
			}, {
        		name : 'rxt_nSPSMS',
				type : 'string'
			}, {
                name : 'rxt_nVCIP',
				type : 'string'
			}, {
        		name : 'rxt_nVCSMS',
				type : 'string'
			}, {
            	name : 'rxt_iSecuencia',
				type : 'int',
    			defaultValue : 0
			}, {
                name : 'operadorAtendiendoCuenta',
				type : 'int'
			},
            
            
            {name:'cue_nparticion',type:'int',defaultValue:0},
            {
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
			}, {
                name : 'zon_cdescripcion',
				type : 'string'
			}, {
                name : 'zon_ccodigo',
    			type : 'string'
			}, {
                name : 'madre_clinea',
				type : 'string'
			}, {
            	name : 'madre_cnombre',
				type : 'string'
			}, {
            	name : 'madre_ncuenta',
				type : 'string'
			}, {
                name : 'ope_cnombre',
				type : 'string'
			}, {
                name : 'sta_ncontadorfa',
    			type : 'string'
			}, {
                name : 'fal_nmargen',
    			type : 'string'
			},
            {
                name : 'gps_rLatitud',
        		type : 'string'
            },
            {
                name : 'gps_rLongitud',
            	type : 'string'
            },{
                name : 'gps_cIMEI',
                type : 'string'
    		},
            {
                name : 'tip_nTipo',
                type : 'int'
            },
            {
                name : '_origen',
                type : 'string'
            },
            {
                name : '_puerto',
                type : 'string'
            },
            //este campo es para multimonitor
            {name:'_iconos',type:'string',defaultValue : ''},
            
            {name:'rxl_clinecard',type:'string'}
            
            
    ],
            
	proxy : {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/EventoSonido',
	}// cierro el proxy
});