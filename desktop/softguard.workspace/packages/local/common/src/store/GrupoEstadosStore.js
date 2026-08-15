//MIGRADO2024
Ext.define('Common.store.GrupoEstadosStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIconModel',
    storeId: 'GrupoEstadosStore',
    data: [
        {Value:'inactivo', Name:getLocale('Inactivo'), Icon: '/resources/global/images/icons/delete.png'},
        {Value:'prospecto', Name:getLocale('Prospecto'), Icon: '/resources/softguard/images/icons/icn_dealer_cuentas_no_habilitadas.png'},
        {Value:'enventa', Name:getLocale('En venta'), Icon: '/resources/softguard/images/icons/icn_dealer_cuentas_amarillo.png'},
        {Value:'cliente', Name:getLocale('Cliente'), Icon: '/resources/softguard/images/icons/icn_dealer_cuentas_habilitadas.png'}
        
	]
});