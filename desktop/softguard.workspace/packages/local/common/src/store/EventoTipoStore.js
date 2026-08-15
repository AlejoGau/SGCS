//MIGRADO2024
Ext.define('Common.store.EventoTipoStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
    ],
    storeId: 'EventoTipoStore',
    data : [
        {Name: getLocale('General'), Value: 0},
		{Name: getLocale('Desactivación ( OPN )'), Value: 1},
		{Name: getLocale('Activación ( CLO )'), Value: 2},
		{Name: getLocale('Estado'), Value: 3},
		{Name: getLocale('Restauración'), Value: 4}
	]
});