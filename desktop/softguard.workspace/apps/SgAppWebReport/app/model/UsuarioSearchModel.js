Ext.define('SgAppWebReport.model.UsuarioSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
		{name:'usu_cnombre',type:'string'},
        {name:'usu_mobservacion',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'usu_iid',type:'string'},
        {name:'usu_idKey',type:'int'},
        {name:'_descripcion', type:'string', convert: function (v,r) {
            return r.get('usu_cnombre')+' ('+r.get('cue_clinea')+'-'+Ext.util.Format.trim(r.get('cue_ncuenta'))+')'
        }}
        
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/UsuarioSearch',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : true
	}
});