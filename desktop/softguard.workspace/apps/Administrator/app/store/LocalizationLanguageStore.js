Ext.define('Administrator.store.LocalizationLanguageStore', {
    extend : 'Ext.data.Store',
    storeId: 'LocalizationLanguageStore',
    pageSize: 200,
    fields:[
        'Language',
        
        {
    		name : '_Language',
			type : 'string',
            convert: function(v,record){
                return getLocale(record.get('Language'));
            }
		}
    ],
	autoLoad: true,
    proxy: {
		type : 'rest',
		url : '/Rest/Search/LocalizationLanguageList',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});