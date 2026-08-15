//MIGRADO2024
Ext.define('Common.store.InstaladorTipoStore', {
    extend: 'Ext.data.Store',
     model: 'Common.model.NameValueIntModel',
	data: [
		{Name:getLocale("Instalador"),Value:0},
		{Name:getLocale("Tecnico"),Value:1},
		{Name:getLocale("Tecnico/Instalador"),Value:2},
		{Name:getLocale("Deshabilitado"),Value:3},
	]
});