Ext.define('AdministratorSearch.model.FormatosGridSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int',
        mapping: 'for_idKey'
        },
        {
        name: 'Name',
        type: 'string'
        },
      {name:'RowNumber',type:'int'},
      {name:'for_ccodigo',type:'string'},
      {name:'for_cdescripcion',type:'string'},
      {name:'for_cformato',type:'string'},
      {name:'for_cnombre',type:'string'},
      {name:'for_calarma',type:'string'},
      {name:'for_idKey',type:'int'},  
      {name:'cod_ccodigo',type:'string'},
      {name:'cod_cdescripcion',type:'string'},
      {name:'cod_nalerta',type:'string'},
      {name:'cod_nprioridad',type:'string'},
      {name:'cod_ntipo',type:'string'},
      {name:'cod_nsistema',type:'string'},
      {name:'cod_ncolor',type:'string'},
      {name:'cod_cSonido',type:'string'},
      {name:'cod_nColorLetra',type:'string'},
      {name:'cod_nResuelve',type:'string'},
      {name:'cod_cGrupo',type:'string'},
      {name:'cod_nSms',type:'string'},
      {name:'cod_nMail',type:'string'},
      {name:'cod_nVideo',type:'string'},
      {name:'cod_nManual',type:'string'},
      {name:'cod_nMovil',type:'string'},
      {name:'cod_nAutoridad',type:'string'},
      {name:'cod_nLeeSonido',type:'string'},
      {name:'cod_nMultiMonitor',type:'string'},
		  {name:'rec_idKey',type:'int',defaultValue:0},
      {name:'_used', type:'string'}
        
    ],
        
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SeachFormatos',
		appendId : true
	}
});									