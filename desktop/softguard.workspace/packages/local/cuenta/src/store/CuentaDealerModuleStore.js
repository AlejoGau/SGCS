Ext.define('Cuenta.store.CuentaDealerModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    //storeId: 'CuentaDealerModuleStore',
    
    proxy: {
        type: 'rest',
        appendId: false,
        url: '/Rest/Security/Modules/'+5+'/Security'
    },
    
    remoteFilter: false,
    /*
    listeners:{
        prefetch: function (store,records,successful,operation, options){
            console.log(arguments);
        },
        load: function(store, root, records, success){
            var remove= new Array();
            root.eachChild(function(node) {
                if (node.get('profile')=='0'){
                    remove.push(node)
                }
            });
            Ext.Array.each(remove,function(node){
                node.remove();
            })
        }
    },
    */
	root : {
		text : 'Datos',
        expanded: false,
        leaf: false
	}
});