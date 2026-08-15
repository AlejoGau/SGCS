//MIGRADO2024
Ext.define('Common.store.GeneraSiNoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'GeneraSiNoStore',
	data: [
/**
 * 0-No Genera
1-Genera
2-Genera considerando eventos anteriores
3-Utiliza configuracion del parametro OPNDESPUESDEALERTA
 * 
 */
		{Name: getLocale('No Genera'),    Value: 0},
		{Name: getLocale('Genera'),    Value: 1},
		{Name: getLocale('Genera considerando eventos anteriores'),    Value: 2},
		{Name: getLocale('Utiliza configuracion del parametro OPNDESPUESDEALERTA'),    Value: 3}				
	]
});