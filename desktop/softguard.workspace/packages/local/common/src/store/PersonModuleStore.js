Ext.define('Common.store.PersonModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'PersonModuleStore',
    root : {
        text : 'Online',
        expanded : true,
        children : [{
            text : 'Datos principales',
            iconCls : 'icon-Action',
            leaf : true,
            closable: true,
            view : 'personformview'
        },{
            text : 'Acciones',
            iconCls : 'icon-Action',
            leaf : true,
            closable: true,
            view : 'actiongridview'
        },{
            text : 'Agenda',
            iconCls : 'icon-date',
            view : 'eventgridview',
            leaf : true,
            closable: true
        }/*,
        {
            text : 'Relaciones',
            iconCls : 'icon-Relation',
            leaf : true,
            closable: true,
            view : 'relationgridview'
        }*/]
        
    }// cierro children
        // cierra store
});
