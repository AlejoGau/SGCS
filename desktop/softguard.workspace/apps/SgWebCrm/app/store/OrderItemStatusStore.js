Ext.define('SgWebCRM.store.OrderItemStatusStore', {
    extend: 'Ext.data.Store',
    model: 'SgWebCRM.model.NameValueModel',
    storeId: 'TareaTipoStore',
    data: [
        {Name:getLocale("Oportunidad"),Value:'1'},
		{Name:getLocale("Presupuesto"),Value:'2'},
		{Name:getLocale("Rechazado"),Value:'3'},
        {Name:getLocale("Vendido"),Value:'4'},
        {Name:getLocale("Comprobante creado"),Value:'9'}
	]
});