Ext.define('Cuenta.model.NotificacionesModel', {
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
        defaultValue: 3090
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_lineas'
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
        {name:'sms_iGrupoAlarmas',type:'int'}
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Sms/',
		appendId : true
	}
});