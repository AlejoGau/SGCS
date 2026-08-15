Ext.define('SgAppSerTec.store.SerTecModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'SgAppSerTec.model.ModuleModel',
    id: 'SerTecModuleStore',
    root : {
        text : 'Servicio Tecnico',
        expanded : true,
        children : [{
            text : getLocale('Multicuenta Serv Tec'),
    		iconCls : 'icon-user',
            view: 'multicuentaserviciotecnicogridview',
			leaf : true,			
            closable: true,
            closeAction: 'destroy'
		}]
	}// cierro children
		// cierra store
})

