Ext.define('Tablas.model.TablaInstaladoresModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'ins_ccodigo',type:'string'},
        {name:'ins_cnombre',type:'string'},
        {name:'ins_cempresa',type:'string'},
        {name:'ins_ccalle',type:'string'},
        {name:'ins_inumero',type:'int',defaultValue:0},
        {name:'ins_npiso',type:'int',defaultValue:0},
        {name:'ins_cdepartamento',type:'string'},
        {name:'ins_ctelefono',type:'string'},
        {name:'ins_cmail',type:'string'}
	]
});