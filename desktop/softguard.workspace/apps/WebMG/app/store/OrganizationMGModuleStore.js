Ext.define('WebMG.store.OrganizationMGModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'WebMG.model.ModuleModel',
    id: 'OrganizationMGModuleStore',
    root : {
        text : 'Online',
        expanded : true,
    	children : [
       {
            text : 'Contrato',
            iconCls : 'icon-page-white-text',
            leaf : true,
            closable: true,
            view : 'contratogridview'
            
        },{
            text : 'Comprobantes',
            iconCls : 'icon-money',
            leaf : true,
            closable: true,
            view : 'comprobantegridview'
        },{
            text : 'Cuenta corriente',
            iconCls : 'icon-folder-user',
            leaf : true,
            closable: true,
            view : 'cuentacorrientepanelview'
        },{
            text : 'Cotizaciones',
            iconCls : 'icon-money-dollar',
            view : 'ordergridview',
            leaf : true,
            closable: true
        },{
            text : 'Cuentas',
            iconCls : 'icon-Cuenta',
            leaf : true,
            closable: true,
            view : 'organizationcuentagridview',
            viewConfig: '{hidebuttons: [\'#cuentaCreate\']}'
        },{
            text : 'Contactos relacionados',
    		iconCls : 'icon-Person',
			leaf : true,
            closable: true,
			view : 'persongridview'//,
            //viewConfig: '{hideControls: [\'#addPerson\']}'
		}/*,{
            text : 'Novedades',
            iconCls : 'icon-Cuenta',
            leaf : true,
            closable: true,
            view : 'novedadesfcgridview',
            viewConfig: '{enabledAccount: true}'
        },{
            text : 'MoneyGuard',
            iconCls : 'icon-moneyguard-16',
            leaf : true,
            closable: true,
            hidden: true,
            view : 'moneyguardview'
    	}*/
        
        
        
        
        
    ]}// cierro children
		// cierra store
});