//MIGRADO2024
Ext.define('Common.model.TablaMedicosModel', {
    extend: 'Ext.data.Model',
    idProperty: 'med_ccodigo',
    fields: [
    	{name:'med_ccalle',type:'string'},
    	{name:'med_ccodigo',type:'string'},
    	{name:'med_ccodigopostal',type:'string'},
    	{name:'med_cfax',type:'string'},
    	{name:'med_clocalidad',type:'string'},
    	{name:'med_cnombre',type:'string'},
    	{name:'med_cprovincia',type:'string'},
    	{name:'med_ctelefono',type:'string'},
    	{name:'med_ntipo',type:'string'}
	]
});