//MIGRADO2024
Ext.define('Common.model.CuentaReporteModel', {
    extend : 'Ext.data.Model',
	idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, 
			{name:'rep_ntipo',type:'int',defaultValue:0},
            {name:'rep_iidcuenta',type:'int',defaultValue:0},
            {name:'rep_tproximoenvio',type:'date', dateFormat:'MS'},
            {name:'rep_nfrecuencia',type:'int',defaultValue:0},
            {name:'rep_cmail',type:'string'},
            {name:'rep_meventos',type:'string'},
            {name:'rep_cmailparaeventos',type:'string'},
            {name:'rep_csmsparaeventos',type:'string'},
            {name:'rep_iModemSMS',type:'int', defaultValue: null},
            {name:'rep_cplantillasms',type:'string'},
            {name:'rep_iLimiteSMS',type:'int',defaultValue:1},
            {name:'rep_nLimiteCada',type:'int',defaultValue:0},
            {name:'rep_nCadaUnidadTiempo',type:'int',defaultValue:0},
            {name:'rep_cMailRuteoSMS',type:'string'},
            {name:'rep_cSMSParaInforme',type:'string'},
            
            {name:'rep_idGrupo',type:'int'}
    ],
     proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/reporte/',
		appendId : true
	}
   /* proxy: {
        type: 'rest',
        url: '/Rest/Cuenta/{0}/Reporte',
        replaceIdRegex: /\{0\}/,
        appendId: true,
        buildUl : function(request) {
    		var me = this;
            var operation = request.operation;
			var records = operation.records || [];
            var record = records[0];
            var format = me.format;
            var id = record ? record.getId() : operation.objectId;
            var url = me.getUrl(request);
			if (request.operation.action == 'destroy') {
				id = record.internalId;
				url = '/Rest/Reporte/' + id;
			} else if (operation.action == 'create'){
                url = '/Rest/Reporte/';
            } else if (operation.action == 'update'){
                id = record.internalId;
                url = '/Rest/Reporte/'+ id;
            } else {
				url = url.replace(me.replaceIdRegex, id);
				if (format) {
					if (!url.match(/\.$/)) {
						url += '.';
					}
					url += format;
				}
				request.url = url;
			}
			// console.log('url: ', url);
			return url;
			// return me.callParent(arguments);
		}
        
        
	}*/// cierro el proxy
});