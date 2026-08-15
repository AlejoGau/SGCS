//MIGRADO2024
Ext.define('Common.store.TablaColumnasStore', {
    		extend : 'Ext.data.Store',
			model : 'Common.model.NameValueModel',
			autoLoad : true,
			storeId : 'TablaColumnasStore',
			fields : ['ColumnCount'],
			data : [{
						ColumnCount : 1
					}, {
						ColumnCount : 2
					}, {
						ColumnCount : 3
					}]
		})