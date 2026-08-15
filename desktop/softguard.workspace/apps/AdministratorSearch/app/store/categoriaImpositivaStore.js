Ext.define('AdministratorSearch.store.categoriaImpositivaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
	storeId: 'categoriaImpositivaStore',  
	data: [
		{Name:getLocale("Seleccione"),Value:0},
		{Name:getLocale("Responsable Inscripto"),Value:1},
		{Name:getLocale("Responsable No Inscripto"),Value:2},
		{Name:getLocale("No Responsable"),Value:3},
        {Name:getLocale("Exento"),Value:4},
		{Name:getLocale("Consumidor Final"),Value:5},
		{Name:getLocale("Responsable Monotributo"),Value:6},
        {Name:getLocale("No categorizado"),Value:7}
		//{Name:getLocale("IVA Liberado"),Value:10},
		//{Name:getLocale("Agente percepcion"),Value:11}
	]
});