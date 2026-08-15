//MIGRADO2024
Ext.define('Common.model.SoftguardCodigoAlarmaModel', {
    extend: 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{
    			name : 'Id',
				type : 'int',
                mapping:'cod_idKey'
			},
        {name:'Codigo',mapping:'cod_ccodigo'},
        'cod_ccodigo', 
        {name: 'Descripcion',
        	convert: function(v, r){
        		return r.get('cod_cdescripcion')+ ' - ' + r.get('cod_ccodigo');
        	}
    	},
        'cod_cdescripcion',
        {name:'cod_nalerta',type:'int',defaultValue:0},
        {name:'cod_nprioridad',type:'int',defaultValue:0},
        {name:'cod_ntipo',type:'int',defaultValue:0},
        {name:'cod_ncolor',type:'int',defaultValue:0},
        {name:'cod_nsistema',type:'int',defaultValue:0},
        {name:'cod_nColorLetra',type:'int',defaultValue:0},
        {name:'cod_nResuelve',type:'int',defaultValue:0},
        {name:'cod_nSms',type:'int',defaultValue:0},
        {name:'cod_nMail',type:'int',defaultValue:0},
        {name:'cod_nVideo',type:'int',defaultValue:0},
        {name:'cod_nManual',type:'int',defaultValue:0},
        {name:'cod_nMovil',type:'int',defaultValue:0},
        'cod_cSonido', 'cod_cGrupo'
    ],
    proxy: {
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        url: '/Rest/Search/codigosalarmas'  	 
    }
});