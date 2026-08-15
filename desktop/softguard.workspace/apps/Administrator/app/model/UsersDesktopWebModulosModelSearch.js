Ext.define('Administrator.model.UsersDesktopWebModulosModelSearch', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{name: 'Id', mapping: 'dwm_idKey'},
        {name: 'Name', type:'string'},
        {name:'dwm_idKey',type:'int'},
        {name:'dwm_idWeb',type:'int'},
        {name:'dwm_idModules',type:'int'},
        {name:'dwm_idTabla',type:'string'},
        {name:'dwm_dealer',type:'string'},
        {name:'dwm_cuenta_desde',type:'string'},
        {name:'dwm_cuenta_hasta',type:'string'},
        {name:'dwm_data',type:'string'},
        {name:'lin_crazonsocial',type:'string'},
        {name:'_codigoNombre',type:'string', convert:function(v, record){
            return record.get('dwm_dealer')+' '+record.get('lin_crazonsocial');
        }}

    ],
    proxy : {
        url : '/Rest/Search/UsersDesktopWebModulosSearch',
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        appendId : false
    }
});