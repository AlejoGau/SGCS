//MIGRADO2024
Ext.define('Common.store.KeyModulesStore', {
    extend : 'Ext.data.Store',
    storeId: 'KeyModulesStore',
    model : 'Common.model.KeyModulesModel',
    
    isModuleAvailable: function(name){
        var available = false;
        
        // por qeu each y no findrecord??
        this.each(function(record){
            var now = new Date();
            var moduleDate =  new Date(record.get('DueDate'));
        
            //if (!available && (record.get('IsPerpetual') || Ext.Date.add(moduleDate,Ext.Date.DAY, 3)>now) && record.isDependency(name)){
            if (!available && (record.get('IsPerpetual') || Ext.Date.add(moduleDate,Ext.Date.DAY, 1)>now) && record.isDependency(name)){
                available = true;
            }
        });
        return available;
    },
    
    getModuleAvailable: function (name) {
        var available = false;
        this.each(function(record){            
            var now = new Date();
            var moduleDate =  new Date(record.get('DueDate'));
            //if (!available && (record.get('IsPerpetual') || Ext.Date.add(moduleDate,Ext.Date.DAY, 3)>now) && record.isDependency(name)){
            if (!available && (record.get('IsPerpetual') || Ext.Date.add(moduleDate,Ext.Date.DAY, 1)>now) && record.isDependency(name)){
                available = record;
            }
        });
        return available;
    }
});