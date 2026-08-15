//MIGRADO2024
Ext.define('Common.model.SoftguardSmsModel', {
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
            {name: 'sms_cDealer', type: 'string' },
            {name:'sms_cplantillapush',type:'string'},
            {name:'sms_cidspushsmartpanic',type:'string'},
            {name:'sms_cDescripcion',type:'string'},
            {name:'sms_iGrupoAlarmas',type:'int', defaultValue:0},
            {name:'sms_czona',type:'string'},
            {name:'sms_cSonido',type:'string'}
        ],
        proxy : {
    	type : 'softguardsmsproxy',
		url : '/Rest/Cuenta/{0}/Sms/',
		replaceIdRegex : /\{0\}/,
		appendId : true,
	}// cierro el proxy
});