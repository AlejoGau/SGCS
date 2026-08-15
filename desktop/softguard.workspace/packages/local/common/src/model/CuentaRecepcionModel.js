//MIGRADO2024
Ext.define( 'Common.model.CuentaRecepcionModel', {
    extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: [ {
		name: 'Id',
		type: 'int'
	}, {
			name: 'cod_nprioridad',
			type: 'int'
		}, {
			name: 'cod_ncolor',
			type: 'int'
		}, {
			name: 'cod_ncolorletra',
			type: 'int'
		}, {
			name: 'cod_ntipo',
			type: 'int'
		}, {
			name: 'tiene_notificaciones',
			type: 'bool'
		}, {
			name: 'rec_cCategorizacion',
			type: 'string'
		}, {
			name: 'cod_cdescripcion',
			type: 'string'
		}, {
			name: 'rec_cContenido',
			type: 'string'
		}, {
			name: '_rec_cContenido',
			type: 'string',
			convert: function( val, rec ) {
				return rec.get( 'rec_cContenido' )
			}
		}, {
			name: 'rxi_cTipo',
			type: 'string'
		}, {
			/**********Daniel Orlando Medina********************/
			/*************11/12/2020********************/
			/**https://basecamp.com/2249105/projects/12939010/todos/430832026***/
			name: 'cue_ccalle',
			type: 'string'
			/**************************************************/
		}, {
			name: 'gps_cDireccion',
			type: 'string'
		}, {
			name: 'rec_cObservaciones',
			type: 'string'
		}, {
			name: '_rec_cObservaciones',
			type: 'string',
			convert: function( val, rec ) {
				return rec.get( 'rec_cObservaciones' )
			}
		}, {
			name: 'rec_cTerminal',
			type: 'string'
		}, {
			name: 'rec_calarma',
			type: 'string'
		}, {
			name: '_descripcion',
			type: 'string',
			convert: function( val, rec ) {
				return rec.get( 'rec_calarma' ) + '-' + rec.get( 'cod_cdescripcion' );
			}
		}, {
			name: '_FechaHora',
			type: 'string',
			convert: function( val, rec ) {
				return Ext.Date.format( rec.get( 'rec_isoFechaHora' ), 'Y-m-d H:i:s' );
			}
		}, {
			name: '_estado',
			type: 'string',
			convert: function( val, rec ) {
				return rec.estado;
			}
		}, {
			name: '_categoria',
			type: 'string',
			convert: function( val, rec ) {
				return rec.res_cdescripcion;
			}
		}, {
			name: '_resolucion',
			type: 'string',
			convert: function( val, rec ) {
				return rec.cat_cDescripcion;
			}
		}, {
			name: 'zon_cdescripcion',
			type: 'string'
		}, {
			name: 'rec_czona',
			type: 'string'
		}, {
			name: 'rec_cdll',
			type: 'string'
		}, {
			name: 'Usuario_cnombre',
			type: 'string'
		}, {
			name: 'rec_iMinutosEspera',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_iNYR',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_idReceptor',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_idResolucion',
			type: 'string'
		}, {
			name: 'rec_iid',
			type: 'string'
		}, {
			name: 'rec_iidcuenta',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_ioperador',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_iPrioridad',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_iprioridad',
			type: 'int',
			convert: function( v, record ) {
				return record.get( 'rec_iPrioridad' )
			}
		}, {
			name: 'ope_cnombre',
			type: 'string'
		}, {
			name: 'rec_iusuario',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_nOrigen',
			type: 'int',
			defaultValue: 0
		}, {
			name: '_rec_nOrigen',
			type: 'string',
			convert: function( v, record ) {
				switch( record.get( 'rec_nOrigen' ) ) {
					case 1:
						origen = getLocale( "Timer" );
						break;
					case 2:
						origen = getLocale( "Receptor" );
						break;
					case 3:
						origen = getLocale( "Manual" );
						break;
					case 4:
						origen = getLocale( "Mailguard" );
						break;
					case 5:
						origen = getLocale( "Sistema" );
						break;
					case 6:
						origen = getLocale( "SMS" );
						break;
					case 7:
						origen = getLocale( "Scheduler" );
						break;
					case 8:
						origen = getLocale( "Job" );
						break;
					default:
						break;
				}
				return origen;
			}
		}, {
			name: 'rec_nestado',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rec_isoFechaProceso',
			type: 'date', dateFormat: 'c'
		}, {
			name: '_rec_isoFechaProceso',
			type: 'date', dateFormat: 'c',
			convert: function( v, record ) {
				return record.get( 'rec_isoFechaProceso' );
			}
		}, {
			name: 'rec_isoFechaRecepcion',
			type: 'date', 
			dateFormat: 'c'
		}, {
			name: 'rec_isoFechaHora',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'rec_tfechahora',
			type: 'date',
			dateFormat: 'n/j/Y g:i:s A' ////rec_tfechahora:"1/24/2018 11:18:52 AM"
		}, {
			name: 'cue_clinea',
			type: 'string'
		}, {
			name: 'cue_cnombre',
			type: 'string'
		}, {
			name: 'cue_ncuenta',
			type: 'string'
		}, {
			name: 'cue_iid',
			type: 'int',
			mapping: 'rec_iidcuenta'
		}, {
			name: 'cue_clocalidad',
			type: 'string'
		}, {
			name: 'dealer-cuenta',
			type: 'string',
			convert: function( v, record ) {
				return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' );
			}
		},
		{
			name: 'rec_iPuerto',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'rxt_nSPIP',
			type: 'string'
		}, {
			name: 'rxt_nSPSMS',
			type: 'string'
		}, {
			name: 'rxt_iSecuencia',
			type: 'int',
			defaultValue: 0
		}, {
			name: 'cue_cclave',
			type: 'string'
		}, {
			name: 'cue_cpermiso',
			type: 'string'
		}, {
			name: 'cue_cprovincia',
			type: 'string'
		}, {
			name: 'cue_cubicacion',
			type: 'string'
		}
		, {
			name: 'gps_rLatitud',
			type: 'string'
		}, {
			name: 'gps_rLongitud',
			type: 'string'
		}, {
			name: 'gps_cIMEI',
			type: 'string',
			mapping: 'gps_cimei'
		}, {
			name: 'gps_cMethod',
			type: 'string'
		},{
			name: 'gps_tRawfechahora',
			type: 'string',
		},
		{ name: 'cue_nparticion', type: 'int', defaultValue: 0 },
		{
			name: '_zona', type: 'string', convert: function( v, record ) {
				if( record.get( 'zon_cdescripcion' ) == '' ) {
					return record.get( 'rec_czona' );
				} else {
					return '(' + record.get( 'rec_czona' ) + ') ' + record.get( 'zon_cdescripcion' );
				}
			}
		}, {
			name: 'madre_clinea',
			type: 'string'
		}, {
			name: 'madre_cnombre',
			type: 'string'
		}, {
			name: 'madre_ncuenta',
			type: 'string'
		}, {
			name: 'tip_nTipo',
			type: 'int'
		}, {
			name: 'rxt_nVCIP',
			type: 'int'
		}, {
			name: 'rxt_nVCSMS',
			type: 'int'
		}, {
			name: 'res_cdescripcion',
			type: 'string'
		}, {
			name: 'cat_cDescripcion',
			type: 'string'
		},
		{
			name: '_origen',
			type: 'string'
		},
		{
			name: '_Origen',
			type: 'string',
			convert: function( v, r ) {
				return r.get( '_origen' )
			}
		},
		{
			name: '_puerto',
			type: 'string'
		},
		{
			name: '_Puerto',
			type: 'string',
			convert: function( v, r ) {
				return r.get( '_puerto' )
			}
		},
		{
			name: '_usu_cnombre',
			type: 'string'
		},
		{
			name: 'Usuario_cnombre',
			type: 'string'
		},
		{
			name: '_zon_cdescripcion',
			type: 'string'
		},
		{
			name: 'cod_ntipo',
			type: 'int'
		},
        { name: 'ttz_noffset', type: 'number', defaultValue: 0 },
        { name: '_tfechahoraOffset', type: 'date', dateFormat: 'n/j/Y g:i:s A' }
        , { name: 'rxl_clinecard', type: 'string' }
		, { name: 'tablaDatos', type: 'string' }
	],
	validations: [
		/*
		 * { type: 'presence', name: 'Name', message: 'Nombre es requerido.' }, {
		 * type: 'presence', name: 'LastName', message: 'Nombre es requerido.' }, {
		 * type: 'presence', name: 'Email', message: 'Email es requerido.' }
		 */
	],
	proxy: {
		type: 'cuentarecepcionproxy',
        reader: {
			type: 'json',
			rootProperty: 'rows',
			totalProperty: 'total'
        },
		url: '/Rest/Search/ReporteHistorico?Cuentas={0}&CodigosAlarmaExcluir=&FechaDesde={1}&FechaHasta={2}&Alertas={3}&Tipos={4}&Mostrar={5}&OrdenarFecha={6}&CodigosAlarma={7}&rec_cdll={8}&Origenes={9}&Estados={10}&Operador={11}&table={12}&TipoCuenta={13}&gps_cIMEI={14}&cue_clinea={15}&usuario={16}&zona={17}&rec_iid_from={18}&onlyRec_iid={19}&cue_ncuenta={20}&short={21}&Autoridades={22}&Prioridad={23}&start={24}&limit={25}&page={26}&sort={27}',
		replaceIdRegex: /\{0\}/,
        replaceFechaDesdeRegex: /\{1\}/,
		replaceFechaHastaRegex: /\{2\}/,
		replaceAlertasRegex: /\{3\}/,
		replaceTiposRegex: /\{4\}/,
		replaceMostrarRegex: /\{5\}/,
		replaceOrdenRegex: /\{6\}/,
        replaceEventosRegex: /\{7\}/,
        replaceReccdllRegex: /\{8\}/,
        replaceOrigenesRegex: /\{9\}/,
        replaceEstadosRegex: /\{10\}/,
        replaceOperadorRegex: /\{11\}/,
        replaceTableRegex: /\{12\}/,
        replaceTipoCuentaRegex: /\{13\}/,
        replaceGpsCImeiRegex: /\{14\}/,
        replaceDealerRegex: /\{15\}/,
        replaceUsuarioRegex: /\{16\}/,
        replaceZonaRegex: /\{17\}/,
        replacerec_iid_fromRegex: /\{18\}/,
        replaceonlyRec_iidRegex: /\{19\}/,
        replacecue_ncuentaRegex: /\{20\}/,
        replaceShortRegex: /\{21\}/,
        replaceAutoridadesRegex: /\{22\}/,
		replacePrioridadRegex: /\{23\}/,
		replaceStartRegex: /\{24\}/,
		replaceLimitRegex: /\{25\}/,
		replacePageRegex: /\{26\}/,
		replaceSortRegex: /\{27\}/,

		appendId: true,
	}// cierro el proxy
});