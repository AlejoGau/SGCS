Ext.define('WebMG.store.OrganizationMGPROVModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'WebMG.model.ModuleModel',
    id: 'OrganizationMGPROVModuleStore',
    root : {
        text : 'Online',
        expanded : true,
    	children : [
       {
            text : 'Comprobantes',
            iconCls : 'icon-money',
            leaf : true,
            closable: true,
            view : 'comprobantegridview',
            viewConfig: '{cbt_ntipo: 5}'
        },{
            text : 'Cuenta corriente',
            iconCls : 'icon-folder-user',
            leaf : true,
            closable: true,
            view : 'cuentacorrientepanelview'
        },{
            text : 'Contactos relacionados',
    		iconCls : 'icon-Person',
			leaf : true,
            closable: true,
			view : 'persongridview'//,
            //viewConfig: '{hideControls: [\'#addPerson\']}'
		}
    ]}// cierro children
});// cierra store