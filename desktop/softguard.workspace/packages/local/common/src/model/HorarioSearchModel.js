//MIGRADO2024
Ext.define('Common.model.HorarioSearchModel', {
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
			name:'hor_iidcuenta', 
			type:'int'
		},
		{	
			name: 'hor_ndiaapertura',
			type: 'int',
            defaultValue: 1
		}, 
		'hor_choraapertura', 
		{
			name: 'hor_ndiacierre', 
			type: 'int',
            defaultValue: 1
		},
		'hor_choracierre'
       ],
   
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/Horario',        
        appendId : false
    }
});