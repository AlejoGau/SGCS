//MIGRADO2024
Ext.define('Common.model.MedicoInfoModel', {
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
    	{name:'mnf_iidcuenta',type:'int',defaultValue:0},
        {name:'mnf_iid',type:'int',defaultValue:0},
        {name:'mnf_cprotegido',type:'string'},
        {name:'mnf_cdoctor',type:'string'},
        {name:'mnf_cobrasocial',type:'string'},
        {name:'mnf_nsexo',type:'int'},
        {name:'mnf_ndiscapacitado',type:'int',defaultValue:0},
        {name:'mnf_nambulancia',type:'int',defaultValue:0},
        {name:'mnf_nvivesolo',type:'int',defaultValue:0},
        {name:'mnf_dfechanacimiento',type:'date', dateFormat:'MS'},
        {name:'mnf_nedad',type:'int',defaultValue:0},
        {name:'mnf_tobservaciones',type:'string'},
        {name:'mnf_casociado',type:'string'}
        ],
    proxy: {
        type: 'rest',//'medicoinfoproxy',
        url: '/Rest/MedicalInfo/',//'/Rest/Cuenta/{0}/MedicalInfo',
        //replaceIdRegex: /\{0\}/,
        appendId: true,
        writer: {writeAllFields: true}
	}// cierro el proxy
});