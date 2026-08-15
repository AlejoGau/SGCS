Ext.define('Cuenta.model.SoftguardSmsModel', {
    extend : 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
      //  mapping:'sms_iid',
        persist: false
    },
        {
            name: 'Name',
            type: 'string'
        },
    	    {name:'sms_iidcuenta',type:'int',defaultValue:0},
            {name:'sms_iid',type:'int',defaultValue:0,persist: false},
            {name:'sms_meventos',type:'string'},
            {name:'sms_csmsparaeventos',type:'string'},
            {name:'sms_imodemsms',type:'int',defaultValue:0},
            {name:'sms_cplantillasms',type:'string'},
            {name:'sms_cmailparaeventos',type:'string'},
            {name:'sms_cplantillamail',type:'string'},
            {name:'sms_inotificaralertas',type:'int',defaultValue:0},
            {name:'sms_cplantillapush',type:'string'},
            {name:'sms_cidspushsmartpanic',type:'string'},
            {name:'sms_cDescripcion',type:'string'},
            {name:'sms_iGrupoAlarmas',type:'int', defaultValue:0}
            
        ],
        proxy : {
    	type : 'rest',
		url : '/Rest/Cuenta/{0}/Sms/',
		replaceIdRegex : /\{0\}/,
		appendId : true,
		buildUrl : function(request) {
			// console.log('buildurlmodel', request.operation);
			var me = this;
            var operation = request.operation;
			var records = operation.records || [];
            var record = records[0];
            var format = me.format;
            var id = record ? record.getId() : operation.ObjectId;
            var url = me.getUrl(request);

			if (request.operation.action == 'destroy') {
				id = request.operation.records[0].internalId;
				url = '/Rest/Sms/' + id;
			} else if (request.operation.action == 'create'){
                url = '/Rest/Sms/';
            } else {
                
                if (id === undefined){
                    id = request.proxy.ObjectId;
                }
                
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
	}// cierro el proxy
});