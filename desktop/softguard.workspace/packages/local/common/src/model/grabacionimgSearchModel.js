//MIGRADO2024
Ext.define('Common.model.grabacionimgSearchModel', {
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
    	defaultValue: 3106
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_grabacion_img'
        },
        {name:'gri_iid',type: 'int'},
		{name:'gri_iidcuenta',type:'int',defaultValue:0},
        {name:'gri_iidrecepcion',type:'int',defaultValue:0},
        {name:'gri_dfechahora',type:'string'},
        {name:'gri_ccarpeta',type:'string'},
        {name:'gri_carchivo',type:'string'},
        {name:'gri_cterminal',type:'string'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cue_cnombre',type:'string'},
        {name:'usu_cnombre',type:'string'},
        {name:'gri_ioperador',type:'int',defaultValue:0}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/p_grabacion_img',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        }
	}
});