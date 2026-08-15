Ext.define('Common.store.OrganizationModuleStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Common.model.ModuleModel',
    id: 'OrganizationModuleStore',
    root: {
        text: 'Online',
        expanded: true,
        children: [
            {
                text: 'Datos principales',
                iconCls: 'icon-Person',
                leaf: true,
                closable: true,
                view: 'organizationformview'
            }, {
                text: 'Contactos relacionados',
                iconCls: 'icon-Person',
                leaf: true,
                closable: true,
                view: 'persongridview',
                viewConfig: '{"showGroupsButton":false}'
            }, {
                text: 'Acciones',
                iconCls: 'icon-Action',
                view: 'actiongridview',
                leaf: true,
                closable: true
            }, {
                text: 'Cotizaciones',
                iconCls: 'icon-money-dollar',
                view: 'ordergridview',
                leaf: true,
                closable: true
            }, {
                text: 'Agenda',
                iconCls: 'icon-date',
                view: 'eventgridview',
                leaf: true,
                closable: true
            }, {
                text: 'Cuentas',
                iconCls: 'icon-cuenta',
                leaf: true,
                closable: true,
                view: 'organizationcuentagridview'
            }, {
                text: 'Documentos',
                iconCls: 'icon-book-link',
                view: 'documentosgridview',
                leaf: true,
                profile: '2',
                closable: true,
                closeAction: 'destroy'
            }/*,{
            text : 'MoneyGuard',
            iconCls : 'icon-moneyguard-16',
            leaf : true,
            closable: true,
            view : 'moneyguardview'
    	}*/,{
            text : 'Contrato',
            iconCls : 'icon-money-dollar',
            leaf : true,
            closable: true,
            view : 'contratogridview'
        }/*,{
            text : 'Usuarios Desktop',
            iconCls : 'icon-User-red',
            leaf : true,
            closable: true,
            view : 'administratorsearchgridview'
        }*//*,{
            text : 'Relaciones',
            iconCls : 'icon-Relation',
            leaf : true,
            closable: true,
            view : 'relationgridview'
		}*/

        ]
    }// cierro children
    // cierra store
});
