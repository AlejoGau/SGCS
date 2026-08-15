Ext.define('AdministratorSearch.model.GatewaySearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int',
        mapping: 'tgm_idKey'
        },
        {
        name: 'Name',
        type: 'string'
        },
      {name:'IdCode',type:'string', convert:function(v,r) {
         
          
          var pad = "000";
          var n =  r.get('Id');
          var result = (pad+n).slice(-pad.length);
          
          return result;
       
      }},
      {name:'tgm_cdescripcion',type:'string'},
      {name:'tgm_ntipo',type:'int',defaultValue:0},
      {name:'tgm_csmppsystemid',type:'string'},
      {name:'tgm_csmpppassword',type:'string'},
      {name:'tgm_csmpphostname',type:'string'},  
      {name:'tgm_nsmppport',type:'int',defaultValue:0},
      {name:'tgm_nsmpsourceadd',type:'int',defaultValue:0},
      {name:'tgm_chttpurl',type:'string'},
      {name:'tgm_capimail',type:'string'},
      {name:'tgm_cuser',type:'string'},
      {name:'tgm_cpassword',type:'string'},
      {name:'tgm_cdll',type:'string'},
      {name:'tgm_cconfig',type:'string'},
      {name:'tgm_cmetadata',type:'string'}
      ,{name:'tgm_iescliente',type:'int',defaultValue:0}
    ],
        
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_gatewaysmsg',
		appendId : true
	}
});									