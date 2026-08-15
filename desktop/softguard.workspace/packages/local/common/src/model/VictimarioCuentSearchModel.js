//MIGRADO2024
Ext.define('Common.model.VictimarioCuentSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name: 'Id',type: 'int'},
        {name: 'vic_idKey', type:'int', defaultValue:0},
        {name: 'cue_iid', type:'int'},
        {name: 'cue_cnombre', type:'string'},
        {name: 'cue_clinea', type:'string'},
        {name: 'cue_ncuenta', type:'string'},
        {name: 'cue_ctelefono', type:'string'}
    ],
    proxy : {
        
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/VictimarioCuentaSearch',
		appendId : false
	}
});