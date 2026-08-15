//MIGRADO2024
Ext.define('Common.model.VistasModel', {
    extend : 'Ext.data.Model',
    fields: [
		{name:'nombre',type:'string'},
        {name:'predefinido',type:'int',
            convert: function(v,record){
                var prefefinido = '';
                if(v == 1) {
                    prefefinido = 'Predefinidio';
                }              
                return prefefinido;
            }}
       
        ]
 
});